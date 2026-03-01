import { TripData, Activity } from '@allorai/shared-types';
import { supabase } from './supabase';

export async function saveTrip(
  userId: string,
  tripData: TripData,
  pinnedActivities: Activity[]
): Promise<string> {
  const { data: trip, error: tripError } = await supabase
    .from('trips')
    .insert({
      user_id: userId,
      origin: tripData.origin ?? null,
      destination: tripData.destination ?? null,
      city: tripData.city ?? null,
      departure_date: tripData.departureDate ?? null,
      return_date: tripData.returnDate ?? null,
      budget: tripData.budget ?? null,
      preferences: tripData.preferences ?? null,
      budget_includes: tripData.budgetIncludes,
      transportation: tripData.transportation,
      interests: tripData.interests,
      constraints: tripData.constraints,
      flight_preference: tripData.flightPreference ?? null,
      lodging_preference: tripData.lodgingPreference ?? null,
      dining_preference: tripData.diningPreference ?? null,
      activity_preference: tripData.activityPreference ?? null,
      departure_flight: tripData.departureFlight ?? null,
      return_flight: tripData.returnFlight ?? null,
      hotel: tripData.hotel ?? null,
      destination_coords: tripData.destinationCoords ?? null,
      hotel_coords: tripData.hotelCoords ?? null,
    })
    .select('id')
    .single();

  if (tripError || !trip) {
    throw new Error(tripError?.message ?? 'Failed to save trip');
  }

  if (pinnedActivities.length > 0) {
    const activityRows = pinnedActivities.map((activity, index) => ({
      trip_id: trip.id,
      activity,
      pinned: activity.pinned ?? true,
      sort_order: index,
    }));

    const { error: activitiesError } = await supabase
      .from('trip_activities')
      .insert(activityRows);

    if (activitiesError) {
      console.error('Failed to save trip activities:', activitiesError.message);
    }
  }

  return trip.id;
}
