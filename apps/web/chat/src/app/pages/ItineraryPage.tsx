import { useNavigate } from 'react-router-dom';
import { useTripStore } from '../../store/useTripStore';
import ItineraryForm from '../../components/forms/ItineraryForm';
import { supabase } from '../lib/supabase';
import { saveTrip } from '../lib/tripService';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const { activityOptions, tripData, updateTripData } = useTripStore();

  const handleSaveTrip = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      console.error('No session available — anonymous sign-in should have happened on app load.');
      alert('Could not save trip: no session. Please reload the page and try again.');
      return;
    }

    const pinnedActivities = activityOptions.filter((a) => a.pinned);

    try {
      await saveTrip(session.user.id, tripData, pinnedActivities);
      navigate('/itineraries');
    } catch (err) {
      console.error('Failed to save trip:', err);
      alert('Failed to save trip. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <ItineraryForm
        {...tripData}
        activityOptions={activityOptions}
        onNameChange={(name) => updateTripData({ name })}
        onSaveTrip={handleSaveTrip}
        onNewTrip={() => navigate('/landing')}
      />
    </div>
  );
};

export default ItineraryPage;
