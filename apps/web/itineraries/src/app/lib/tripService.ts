import { supabase } from './supabase';

export interface TripSummary {
  id: string;
  name?: string;
  destination?: string;
  city?: string;
  departure_date?: string;
  return_date?: string;
  budget?: number;
  hotel?: { name: string; imageUrl?: string };
  departure_flight?: { legs: { originAirport?: { iata?: string } }[] };
  created_at: string;
}

export async function fetchUserTrips(userId: string): Promise<TripSummary[]> {
  const { data, error } = await supabase
    .from('trips')
    .select('id, name, destination, city, departure_date, return_date, budget, hotel, departure_flight, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}
