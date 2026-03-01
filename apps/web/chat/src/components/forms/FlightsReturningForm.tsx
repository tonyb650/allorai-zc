import { Flight } from '@allorai/shared-types';
import { formatDate } from '../../utils/formatData';
import FlightChip from '../chips/FlightsChip';
import clsx from 'clsx';
import { ChatStepSequence } from '../../app/chatSteps/helpers/createChatSteps';

export type FlightsReturningFormData = {
  returnFlight?: Flight;
  returnDate?: string;
  destinationCoords?: { latitude: number; longitude: number };
};

type FlightsReturningFormProps = FlightsReturningFormData & {
  returningFlightOptions: Flight[];
  updateFields: (fields: Partial<FlightsReturningFormData>) => void;
  currentStepIndex: number;
  isChatLoading: boolean;
};

const FlightsReturningForm = ({
  returnFlight,
  returnDate,
  currentStepIndex,
  returningFlightOptions,
  updateFields,
  isChatLoading,
}: FlightsReturningFormProps) => {
  const isActive = currentStepIndex === ChatStepSequence.Returning;
  const flightReturningId = returnFlight?.id;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6">Returning Flights - {formatDate(returnDate)}</h2>
      <div className="w-full space-y-3 text-sm">
        <div className="flex flex-col gap-3">
          {returningFlightOptions.map((flight) => (
            <label key={flight.id} className="cursor-pointer group">
              <input
                type="radio"
                name="returningFlight"
                value={flight.id}
                checked={flightReturningId === flight.id}
                disabled={!isActive || isChatLoading}
                onChange={() => {
                  // Fallsback to airport coords if there is no city coordinates
                  const latitude =
                    flight.destinationCity?.latitude ?? flight.destinationAirport.latitude_deg;
                  const longitude =
                    flight.destinationCity?.longitude ?? flight.destinationAirport.longitude_deg;

                  updateFields({
                    returnFlight: flight,
                    destinationCoords: { latitude, longitude },
                  });
                }}
                className="sr-only peer"
              />
              <div
                className={clsx(
                  'peer-checked:ring-2 peer-checked:ring-primary rounded-[20px] transition-all duration-200 ',
                  isActive && 'group-hover:scale-[1.02] group-hover:shadow-lg',
                  !isActive && flightReturningId !== flight.id && 'hidden',
                )}
              >
                <FlightChip flight={flight} direction="return" />
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
FlightsReturningForm.displayName = 'FlightsReturnForm';

export default FlightsReturningForm;
