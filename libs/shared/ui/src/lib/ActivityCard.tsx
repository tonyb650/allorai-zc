import clsx from 'clsx';
import { Pin } from 'lucide-react';
import { Button } from './Button';

type ActivityCardProps = {
  name: string;
  description: string;
  location: string;
  // website: string;
  estimatedCost?: string;
  distance?: string;
  imageUrl?: string;
  pinned?: boolean;
  pinDisabled?: boolean;
  onPin?: () => void;
  onViewDetails?: () => void;
  tag?: string;
  className?: string;
};

export const ActivityCard = ({
  name: title,
  description,
  location,
  estimatedCost,
  distance,
  imageUrl,
  pinned = false,
  pinDisabled = false,
  onPin,
  onViewDetails,
  tag,
  className = '',
}: ActivityCardProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-lg border border-black/50 bg-[#fbfbfe] px-5 py-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]',
        className,
      )}
    >
      <div className="flex flex-1 items-end justify-between">
        {/* Left section */}
        <div className="flex max-w-[279px] shrink-0 flex-col gap-4 me-[15px]">
          {/* Header and details */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold leading-[28.8px] tracking-[-1px] text-black">
              {title}
            </h3>
            <div className="flex gap-6 text-xs font-semibold leading-4 tracking-wide text-black">
              <span>Location: {location}</span>
            </div>
            <div className="flex gap-6 text-xs font-semibold leading-4 tracking-wide text-black">
              {estimatedCost && <span>Est. Cost: ${estimatedCost}</span>}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs font-normal leading-4 tracking-wide text-black line-clamp-3">
            {description}
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {onViewDetails && (
              <Button size="medium" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end gap-2 self-stretch">
          <button
            type="button"
            onClick={onPin}
            disabled={pinDisabled}
            className={clsx(
              'p-0 border-none bg-transparent',
              pinDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
              pinned ? 'text-[#002E9A]' : 'text-black',
            )}
          >
            <Pin size={24} fill={pinned ? 'currentColor' : 'none'} />
          </button>
          <div className="flex-1 w-[158px] min-h-[1px] max-h-[139px] overflow-hidden rounded-sm bg-[#333]">
            {imageUrl && <img src={imageUrl} alt={title} className="h-full w-full object-cover" />}
          </div>
          {tag && (
            <span className="mt-auto inline-flex items-center rounded-full bg-[#75cfcc] px-2.5 py-1.5 text-xs font-semibold text-black">
              {tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
