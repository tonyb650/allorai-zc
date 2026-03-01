import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripData, Activity } from '@allorai/shared-types';
import { useTripStore } from '../../store/useTripStore';
import ItineraryForm from '../../components/forms/ItineraryForm';
import { supabase } from '../lib/supabase';
import { saveTrip } from '../lib/tripService';

const PENDING_SAVE_KEY = 'pendingSaveTrip';

const ItineraryPage = () => {
  const navigate = useNavigate();
  const { activityOptions, tripData, updateTripData, setActivityOptions } = useTripStore();

  // Complete a pending trip save that was deferred through OAuth redirect
  useEffect(() => {
    const pendingRaw = localStorage.getItem(PENDING_SAVE_KEY);
    if (!pendingRaw) return;

    const completePendingSave = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const pending: { tripData: TripData; activities: Activity[] } = JSON.parse(pendingRaw);
      localStorage.removeItem(PENDING_SAVE_KEY);

      updateTripData(pending.tripData);
      setActivityOptions(pending.activities);

      try {
        await saveTrip(
          session.user.id,
          pending.tripData,
          pending.activities.filter((a) => a.pinned)
        );
      } catch (err) {
        console.error('Failed to complete pending trip save:', err);
        return
      }
    };

    completePendingSave();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveTrip = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const pinnedActivities = activityOptions.filter((a) => a.pinned);

    if (!session) {
      localStorage.setItem('loginRedirectPath', '/itineraries');
      localStorage.setItem(
        PENDING_SAVE_KEY,
        JSON.stringify({ tripData, activities: pinnedActivities })
      );

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        localStorage.removeItem(PENDING_SAVE_KEY);
        localStorage.removeItem('loginRedirectPath');
        alert('You must be logged in to save trip');
      }
      return;
    }

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
        onSaveTrip={handleSaveTrip}
        onNewTrip={() => navigate('/landing')}
      />
    </div>
  );
};

export default ItineraryPage;
