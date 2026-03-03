import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { fetchUserTrips, TripSummary } from './lib/tripService';
import { TripCard } from './components/TripCard';
import {
  EmptyTripsState,
  ErrorTripsState,
  LoadingTripsState,
  NotLoggedInState,
} from './components/TripStates';

function MyTripsPage() {
  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    async function loadTrips() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

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
    return <LoadingTripsState />;
  }

  if (error) {
    return <ErrorTripsState message={error} />;
  }

  if (!isLoggedIn) {
    return <NotLoggedInState />;
  }

  if (trips.length === 0) {
    return <EmptyTripsState />;
  }

  return (
    <div className="max-w-7xl mx-auto p-8 mb-12">
      <h1 className="text-2xl font-bold mb-6">My Trips</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </ul>
    </div>
  );
}

export default MyTripsPage;
