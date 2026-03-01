import { Flight } from '@allorai/shared-types';
import { formatDate } from '../../utils/formatData';
import FlightChip from '../chips/FlightsChip';
import clsx from 'clsx';
import { ChatStepSequence } from '../../app/chatSteps/helpers/createChatSteps';

export type FlightsDepartingFormData = {
  departureFlight?: Flight;
  departureDate?: string;
  destinationCoords?: { latitude: number; longitude: number };
  hotelCoords?: { latitude: number; longitude: number };
};

type FlightsDepartingFormProps = FlightsDepartingFormData & {
  departingFlightOptions: Flight[];
  updateFields: (fields: Partial<FlightsDepartingFormData>) => void;
  currentStepIndex: number;
  isChatLoading: boolean;
};

const FlightsDepartingForm = ({
  departureFlight,
  departureDate,
  currentStepIndex,
  departingFlightOptions,
  updateFields,
  isChatLoading,
}: FlightsDepartingFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Departing;
  const flightDepartingId = departureFlight?.id;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">Departing Flights - {formatDate(departureDate)}</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {departingFlightOptions.map((flight, idx) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="departingFlight"
                disabled={!isActive || isChatLoading}
                value={flight.id}
                checked={flightDepartingId === flight.id}
                onChange={() => {
                  const latitude =
                    flight.destinationCity?.latitude ?? flight.destinationAirport.latitude_deg;
                  const longitude =
                    flight.destinationCity?.longitude ?? flight.destinationAirport.longitude_deg;

                  updateFields({
                    departureFlight: flight,
                    destinationCoords: {
                      latitude,
                      longitude,
                    },
                  });
                }}
                className="sr-only peer"
              />
              <div
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-primary rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && flightDepartingId !== flight.id && 'hidden',
                )}
              >
                <FlightChip flight={flight} direction="outbound" />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

FlightsDepartingForm.displayName = 'FlightsDepartingForm';

export default FlightsDepartingForm;
