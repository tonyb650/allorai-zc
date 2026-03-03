import { useRef, useMemo, useState } from 'react';
import clsx from 'clsx';
import { BudgetOverview, ActivityCard, Button } from '@allorai/shared-ui';
import { Lightbulb, Trees, UtensilsCrossed, Ticket, Camera, Sparkles } from 'lucide-react';
import { Activity, Flight, Hotel, TravelTips } from '@allorai/shared-types';
import { calculateNights } from '../../utils/formatData';
import { Dialogue } from '@allorai/shared-ui';
import { ViewDetails } from '../modals/ViewDetails';

export const ActivityFilterTypes = ['Nature', 'Food', 'Activities', 'Selfie Spots'] as const;
export type ActivityFilterType = (typeof ActivityFilterTypes)[number];

export type ActivityFormData = {
  departureDate?: string;
  returnDate?: string;
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
};

type ActivityFormProps = ActivityFormData & {
  activityOptions: Activity[];
  travelTips: TravelTips[];
  togglePin: (activityId: string) => void;
  onReviewAndSave: () => void;
  onModifyDetails: () => void;
};

const FILTER_ICONS: Record<ActivityFilterType, React.ElementType> = {
  Nature: Trees,
  Food: UtensilsCrossed,
  Activities: Ticket,
  'Selfie Spots': Camera,
};

const ActivitiesForm = ({
  activityOptions,
  travelTips,
  departureDate,
  returnDate,
  departureFlight,
  returnFlight,
  hotel,
  togglePin,
  onReviewAndSave,
  onModifyDetails,
}: ActivityFormProps) => {
  const [selectedFilter, setSelectedFilter] = useState<ActivityFilterType | null>('Nature');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);

  const CARDS_PER_PAGE = 4;
  const isPinLocked = false;

  const COST_RANGES: Record<ActivityFilterType, [number, number]> = {
    Nature: [0, 10],
    Food: [15, 60],
    Activities: [20, 85],
    'Selfie Spots': [0, 20],
  };

  const randomCostsRef = useRef<Map<string, string>>(new Map());
  const getEstimatedCost = (activity: Activity): string => {
    if (activity.estimatedCost) return activity.estimatedCost;
    if (!randomCostsRef.current.has(activity.id)) {
      const [min, max] = COST_RANGES[activity.category];
      const cost = Math.floor(Math.random() * (max - min + 1)) + min;
      randomCostsRef.current.set(activity.id, String(cost));
    }
    return randomCostsRef.current.get(activity.id)!;
  };

  const budgetItems = useMemo(() => {
    const attractionsTotal = activityOptions
      .filter((a) => a.pinned)
      .reduce((sum, a) => sum + (Number(getEstimatedCost(a)) || 0), 0);
    return [
      {
        label: 'Flights',
        amount: (Number(departureFlight?.price) ?? 0) + (Number(returnFlight?.price) ?? 0),
      },
      {
        label: 'Hotels',
        amount: (hotel?.price ?? 0) * (calculateNights(departureDate, returnDate) ?? 1),
      },
      { label: 'Experiences', amount: attractionsTotal },
    ];
  }, [activityOptions, departureDate, returnDate, departureFlight, returnFlight, hotel]);

  const filteredActivities = useMemo(() => {
    const filtered = selectedFilter
      ? activityOptions.filter((activity) => activity.category === selectedFilter)
      : activityOptions;
    // return [...filtered].sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned));
    return filtered;
  }, [activityOptions, selectedFilter]);

  const pinnedCountByFilter = useMemo(() => {
    const counts: Record<ActivityFilterType, number> = {
      Nature: 0,
      Food: 0,
      Activities: 0,
      'Selfie Spots': 0,
    };
    for (const activity of activityOptions) {
      if (activity.pinned) counts[activity.category]++;
    }
    return counts;
  }, [activityOptions]);

  const filters: ActivityFilterType[] = ['Nature', 'Food', 'Activities', 'Selfie Spots'];

  return (
    <div className="flex w-full gap-5  pt-6 justify-center">
      {/* Left Section */}
      <div className="flex w-[506px] shrink-0 flex-col gap-4">
        {/* Attractions and Filters */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-medium leading-7 text-black">
            Experiences Based on Your Preferences
          </h2>

          {/* Filter Tabs */}
          <div className="flex items-center gap-0 rounded-lg bg-[#75cfcc] p-2 w-fit">
            {filters.map((filter) => {
              const Icon = FILTER_ICONS[filter];
              const isSelected = selectedFilter === filter;
              const pinnedCount = pinnedCountByFilter[filter];

              return (
                <button
                  type="button"
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setVisibleCount(CARDS_PER_PAGE);
                  }}
                  className={clsx(
                    'flex min-h-[32px] items-center gap-2 rounded-lg px-2.5 py-[5.5px] transition-colors',
                    isSelected ? 'bg-[#fbfbfe]' : 'hover:bg-[#75cfcc]/80',
                  )}
                >
                  <Icon size={18} className="shrink-0" />
                  <span className="text-sm font-semibold tracking-[0.07px] text-black text-nowrap">
                    {filter}
                  </span>
                  <span
                    className={clsx(
                      'flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[12px] font-semibold leading-4 tracking-[0.18px] text-[#020617] transition-colors',
                      pinnedCount > 0 ? (isSelected ? 'bg-[#75cfcc]' : 'bg-white') : 'invisible',
                    )}
                  >
                    {pinnedCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Results - Activity Cards */}
        <div className="flex flex-col items-end gap-4">
          {filteredActivities.slice(0, visibleCount).map((activity, index) => (
            <ActivityCard
              key={activity.id}
              name={activity.name}
              description={activity.description}
              location={activity.location}
              estimatedCost={getEstimatedCost(activity)}
              distance={activity.distance}
              imageUrl={activity.imageUrl}
              pinned={activity.pinned}
              onPin={() => togglePin(activity.id)}
              pinDisabled={isPinLocked}
              onViewDetails={() => setSelectedActivity(activity)}
              tag={
                selectedFilter === 'Selfie Spots' && index === 0 ? 'Most Recommended' : undefined
              }
              className="w-[505px]"
            />
          ))}

          {/* Load More Button */}
          {visibleCount < filteredActivities.length && (
            <Button
              variant="primary"
              size="large"
              onClick={() => setVisibleCount((prev) => prev + CARDS_PER_PAGE)}
              className="h-10 w-full"
            >
              Load More
            </Button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-[273px] shrink-0 flex-col gap-10">
        {/* Budget Overview and Buttons */}
        <div className="flex flex-col gap-6">
          <BudgetOverview items={budgetItems} />

          {/* Action Buttons */}
          <div className="flex flex-col gap-4">
            <Button
              variant="primary"
              size="large"
              onClick={onReviewAndSave}
              className="h-10 w-full"
            >
              Review & Save
            </Button>
            <Button
              variant="outline"
              size="large"
              onClick={onModifyDetails}
              className="h-10 w-full"
            >
              New Trip
            </Button>
          </div>
        </div>

        {/* Travel Tips Card */}
        {travelTips.length > 0 && (
          <div className="flex flex-col gap-3.5 rounded-[10px] border-2 border-black bg-[#fbfbfe] p-4 shadow-md">
            {/* Header */}
            <div className="flex items-center gap-2">
              <div className="flex size-[30px] items-center justify-center rounded-[10px] bg-[#75cfcc] px-1.5 py-0.5">
                <Lightbulb size={18} className="text-black" />
              </div>
              <h3 className="text-base font-semibold leading-6 text-black">Travel Tips</h3>
              <Sparkles size={20} fill="gold" />
            </div>

            {/* Content */}
            <div className="text-xs leading-4 tracking-wide text-black">
              {(travelTips[0].transportTips ||
                travelTips[0].whenToVisitTips ||
                travelTips[0].safetyTips) && (
                <>
                  {travelTips[0].transportTips && (
                    <p className="mb-3">
                      <span className="font-semibold">Transportation:</span>{' '}
                      {travelTips[0].transportTips}
                    </p>
                  )}
                  {travelTips[0].whenToVisitTips && (
                    <p className="mb-3">
                      <span className="font-semibold">When to Visit:</span>{' '}
                      {travelTips[0].whenToVisitTips}
                    </p>
                  )}
                  {travelTips[0].safetyTips && (
                    <p>
                      <span className="font-semibold">Safety and Proximity:</span>{' '}
                      {travelTips[0].safetyTips}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
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

ActivitiesForm.displayName = 'ActivitiesForm';

export default ActivitiesForm;
