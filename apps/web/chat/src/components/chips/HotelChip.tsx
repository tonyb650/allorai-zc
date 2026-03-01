import { Hotel } from '@allorai/shared-types';
import { calculateNights } from '../../utils/formatData';

type HotelChipProps = {
  hotel: Hotel;
  departureDate?: string;
  returnDate?: string;
};

const renderStars = (count: number): string => {
  const clamped = Math.max(0, Math.min(5, Math.round(count)));
  return '★'.repeat(clamped) + '☆'.repeat(5 - clamped);
};

const HotelChip = ({ hotel, departureDate, returnDate }: HotelChipProps) => {
  const nights = calculateNights(departureDate, returnDate);
  const totalCost = hotel?.price && nights && nights !== null ? hotel.price * nights : undefined;

  return (
    <div className="bg-[rgba(251,251,254,0.75)] border border-black flex gap-[30px] items-stretch p-6 rounded-2xl justify-between">
      {/* Hotel Image */}
      {hotel.imageUrl && (
        <div className="self-stretch w-[80px] shrink-0 overflow-hidden rounded-lg">
          <img src={hotel.imageUrl} alt={hotel.name} className="h-full w-full object-cover" />
        </div>
      )}

      {/* Hotel Price */}
      {hotel.price != null && (
        <div className="flex flex-col items-start min-w-[105px]">
          <span className="font-semibold text-black text-base leading-6">
            ${totalCost != null ? totalCost.toLocaleString() : '—'}
          </span>
          <span className="font-normal text-black text-base leading-6">${hotel.price} /night</span>
        </div>
      )}

      {/* Hotel Name, Location, and Website */}
      <div className="flex flex-col items-start max-w-[350px] overflow-hidden">
        <span className="font-semibold text-black text-base leading-6">{hotel.name}</span>
        <span className="font-normal text-black text-base leading-6">{hotel.location}</span>
        {hotel.website && (
          <a
            href={hotel.website}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:text-blue-700 underline hover:no-underline text-base leading-6 break-all"
          >
            Hotel Website
          </a>
        )}
      </div>

      {/* Star Ratings */}
      {(hotel.num_of_stars ?? hotel.rating) != null && (
        <div className="flex flex-col items-start">
          <span className="font-semibold text-black text-base leading-6">
            {hotel.num_of_stars !== null && hotel.num_of_stars !== undefined
              ? renderStars(hotel.num_of_stars)
              : renderStars(hotel.rating ?? 0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default HotelChip;
