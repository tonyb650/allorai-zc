import { Activity } from '@allorai/shared-types';
import { ImageWithFallback } from '@allorai/shared-ui';

type ViewDetailsProps = {
  activity: Activity;
};

export const ViewDetails = ({ activity }: ViewDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-6 font-semibold text-xl text-black">
        <span>{activity.location}</span>
        {/* <span>Est. Cost: {activity.estimatedCost}</span> */}
      </div>

      {/* Description */}
      <p className="text-base font-normal leading-6 text-black">
        {activity.description || 'No description found'}
      </p>

      {/* Photos */}
      <div className="flex gap-6">
        <div className="h-[147px] w-[218px] overflow-hidden rounded-xl">
          <ImageWithFallback
            src={activity.imageUrl}
            alt={activity.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Contact info */}
      <div className="flex flex-wrap gap-11 text-black">
        {/* <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Address</h4>
          <p className="text-base font-medium leading-6">
            12345 Goofy Ln
            <br />
            Los Angeles, CA 12456
          </p>
        </div> */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Website</h4>
          {activity.website && (
            <a
              href={activity.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 underline hover:no-underline"
            >
              {activity.website}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
