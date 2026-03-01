import FlightChip from '../chips/FlightsChip';
import HotelChip from '../chips/HotelChip';
import { formatDate, calculateNights } from '../../utils/formatData';
import { Flight, Hotel } from '@allorai/shared-types';

// interface Props {
//   data: Pick<TripData, 'departureDate' | 'returnDate' | 'departureFlight' | 'returnFlight' | 'hotel'>;
// }

interface SummaryInstructionsProps {
  departureDate?: string;
  returnDate?: string;
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
}

const SummaryInstructions = ({
  departureDate: departureDateData,
  returnDate: returnDateData,
  departureFlight,
  returnFlight,
  hotel,
}: SummaryInstructionsProps) => {
  const departureDate = departureDateData ? formatDate(departureDateData) : 'March 15, 2026';
  const returnDate = returnDateData ? formatDate(returnDateData) : 'March 22, 2026';

  // Calculate total cost
  const departureCost = departureFlight?.price ?? 0;
  const returnCost = returnFlight?.price ?? 0;
  const nights = calculateNights(departureDate, returnDate);
  const hotelCost = hotel && nights && hotel?.price && nights !== null ? hotel.price * nights : 0;
  const totalCost = Number(departureCost) + Number(returnCost) + hotelCost;

  return (
    <div className="bg-primary flex flex-col gap-5 rounded-[20px] w-full">
      {/* Flights - Departing */}
      {departureFlight && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-xl leading-[28.8px]">
            Departing ({departureDate})
          </h3>
          <FlightChip flight={departureFlight} direction='outbound' />
        </div>
      )}

      {/* Flights - Return */}
      {returnFlight && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-xl leading-[28.8px]">
            Return ({returnDate})
          </h3>
          <FlightChip flight={returnFlight} direction='return' />
        </div>
      )}

      {/* Lodging */}
      {hotel && (
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-xl  leading-[28.8px]">Lodging</h3>
          <HotelChip hotel={hotel} departureDate={departureDate} returnDate={returnDate} />
        </div>
      )}

      {/* Total Cost Summary */}
      {(departureFlight || returnFlight || hotel) && (
        <div className="flex flex-col gap-1 pt-2 border-t-2 border-black/20">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-xl  leading-[28.8px]">
              Total Cost
            </h3>
            <span className="font-semibold text-2xl ">${totalCost.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryInstructions;
