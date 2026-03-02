import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { fetchUserTrips, TripSummary } from './lib/tripService';

function MyTripsPage() {
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrips() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const data = await fetchUserTrips(session.user.id);
        setTrips(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load trips');
      } finally {
        setLoading(false);
      }
    }

    loadTrips();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <p className="text-gray-500">Loading your trips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (trips.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <p className="text-gray-500">You have no saved trips yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Trips</h1>
      <ul className="space-y-4">
        {trips.map((trip) => (
          <li key={trip.id} className="border rounded-lg p-4 shadow-sm">
            <p className="text-lg font-semibold">
              {trip.city ?? trip.destination ?? 'Unknown destination'}
            </p>
            {(trip.departure_date || trip.return_date) && (
              <p className="text-sm text-gray-600">
                {trip.departure_date} – {trip.return_date}
              </p>
            )}
            {trip.budget != null && (
              <p className="text-sm text-gray-600">Budget: ${trip.budget}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyTripsPage;
