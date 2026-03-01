import { useNavigate } from 'react-router-dom';
import { useTripStore } from '../../store/useTripStore';
import ActivitiesForm from '../../components/forms/ActivitiesForm';

const ActivitiesPage = () => {
  const navigate = useNavigate();
  const { activityOptions, travelTips, tripData, togglePin } = useTripStore();

  return (
    <div className="max-w-7xl mx-auto">
      <ActivitiesForm
        {...tripData}
        activityOptions={activityOptions}
        travelTips={travelTips}
        togglePin={togglePin}
        onReviewAndSave={() => navigate('/chat/itinerary')}
        onModifyDetails={() => navigate('/landing')}
      />
    </div>
  );
};

export default ActivitiesPage;
