import { useState } from 'react';
import { Activity, Flight, Hotel } from '@allorai/shared-types';
import { ActivityCard, Button, Dialogue } from '@allorai/shared-ui';
import FlightChip from '../chips/FlightsChip';
import HotelChip from '../chips/HotelChip';
import { ViewDetails } from '../modals/ViewDetails';
import { calculateNights } from '../../utils/formatData';

export type ItineraryFormData = {
  name?: string;
  departureDate?: string;
  returnDate?: string;
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
};

type ItineraryFormProps = ItineraryFormData & {
  activityOptions: Activity[];
  onNameChange: (name: string) => void;
  onSaveTrip: () => void;
  onNewTrip: () => void;
};

const calcFlightTotal = (departureFlight?: Flight, returnFlight?: Flight): number => {
  return Number(departureFlight?.price ?? 0) + Number(returnFlight?.price ?? 0);
};

// const calcHotelTotal = (hotel?: Hotel, departureDate?: string, returnDate?: string): number => {
//   if (!hotel || !departureDate || !returnDate) return hotel?.price ?? 0;
//   const nights = Math.max(
//     1,
//     Math.round(
//       (new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 60 * 60 * 24),
//     ),
//   );
//   return hotel.price * nights;
// };

const calcActivitiesTotal = (activities: Activity[]): number => {
  return activities
    .filter((a) => a.pinned)
    .reduce((sum, a) => sum + (Number(a.estimatedCost) || 0), 0);
};

const ItineraryForm = ({
  name,
  departureDate,
  returnDate,
  departureFlight,
  returnFlight,
  hotel,
  activityOptions,
  onNameChange,
  onSaveTrip,
  onNewTrip,
}: ItineraryFormProps) => {
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const pinnedActivities = activityOptions.filter((a) => a.pinned);

  const flightTotal = calcFlightTotal(departureFlight, returnFlight);
  const nights = calculateNights(departureDate, returnDate);
  const hotelCost = hotel && nights && hotel?.price && nights !== null ? hotel.price * nights : 0;
  // const hotelTotal = calcHotelTotal(hotel, departureDate, returnDate);
  const activitiesTotal = calcActivitiesTotal(activityOptions);

  return (
    <div className="flex w-full flex-col gap-7 pt-6">
      <section className="flex justify-between">
        <input
          type="text"
          value={name ?? ''}
          onChange={(event) => onNameChange(event.target.value)}
          placeholder="Enter Trip Name"
          className="md:w-3/4 rounded-[12px] border border-black bg-[rgba(251,251,254,0.75)] px-4 py-3 text-[18px] leading-[24px] text-black placeholder:text-black/50 focus:outline-none"
        />
                <Button variant="primary" size="large" onClick={onSaveTrip} className="h-10 w-48">
          Save Trip
        </Button>
      </section>

      {/* Page Title */}
      <h1 className="font-['Montserrat',sans-serif] text-[48px] font-semibold leading-[48px] tracking-[-1.5px] text-black">
        Review Trip
      </h1>

      {/* Flights Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="font-['Montserrat',sans-serif] text-[30px] font-semibold leading-[30px] tracking-[-1px] text-black">
            Flights
          </h2>
          <span className="font-['Montserrat',sans-serif] text-[24px] font-semibold leading-[28.8px] tracking-[-1px] text-black">
            Est. Total Cost: ${flightTotal.toLocaleString()}
          </span>
        </div>

        <div className="space-y-5 md:w-3/4">
          {departureFlight ? (
            <FlightChip flight={departureFlight} direction="outbound" />
          ) : (
            <div className="flex items-center justify-center rounded-[20px] border border-black bg-[rgba(251,251,254,0.75)] p-6 text-sm text-black/40">
              No departing flight selected
            </div>
          )}
          {returnFlight ? (
            <FlightChip flight={returnFlight} direction="return" />
          ) : (
            <div className="flex items-center justify-center rounded-[20px] border border-black bg-[rgba(251,251,254,0.75)] p-6 text-sm text-black/40">
              No returning flight selected
            </div>
          )}
        </div>
      </section>

      {/* Hotels Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="font-['Montserrat',sans-serif] text-[30px] font-semibold leading-[30px] tracking-[-1px] text-black">
            Hotels
          </h2>
          <span className="font-['Montserrat',sans-serif] text-[24px] font-semibold leading-[28.8px] tracking-[-1px] text-black">
            Est. Total Cost: ${hotelCost.toLocaleString()}
          </span>
        </div>

        <div className="space-y-5 md:w-3/4">
          {hotel ? (
            <HotelChip hotel={hotel} departureDate={departureDate} returnDate={returnDate} />
          ) : (
            <div className="flex items-center justify-center rounded-[20px] border border-black bg-[rgba(251,251,254,0.75)] p-6 text-sm text-black/40">
              No hotel selected
            </div>
          )}
        </div>
      </section>

      {/* Experiences Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <h2 className="font-['Montserrat',sans-serif] text-[30px] font-semibold leading-[30px] tracking-[-1px] text-black">
            Experiences
          </h2>
          <span className="font-['Montserrat',sans-serif] text-[24px] font-semibold leading-[28.8px] tracking-[-1px] text-black">
            Est. Total Cost: ${activitiesTotal.toLocaleString()}
          </span>
        </div>

        {/* Activities sub-section */}
        <div className="space-y-5 md:w-3/4">
          <h3 className="font-['Montserrat',sans-serif] text-[24px] font-semibold leading-[28.8px] tracking-[-1px] text-black">
            Activities
          </h3>

          {pinnedActivities.length > 0 ? (
            <div className="flex flex-col gap-3">
              {pinnedActivities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  name={activity.name}
                  description={activity.description}
                  estimatedCost={activity.estimatedCost}
                  distance={activity.distance}
                  location={activity.location}
                  imageUrl={activity.imageUrl}
                  pinned={activity.pinned}
                  onViewDetails={() => setSelectedActivity(activity)}
                  className="w-full"
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center rounded-[8px] border border-black bg-[#fbfbfe] p-6 text-sm text-black/40">
              No activities pinned
            </div>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="primary" size="large" onClick={onSaveTrip} className="h-10 w-48">
          Save Trip
        </Button>
        <Button variant="outline" size="large" onClick={onNewTrip} className="h-10 w-48 ">
          New Trip
        </Button>
      </div>

      {selectedActivity && (
        <Dialogue
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.name}
          className="max-w-3xl"
        >
          <ViewDetails activity={selectedActivity} />
        </Dialogue>
      )}
    </div>
  );
};

ItineraryForm.displayName = 'ItineraryForm';

export default ItineraryForm;
