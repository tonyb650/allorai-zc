import { Flight } from './flights';
import { Hotel } from './hotels';

export type BudgetPref = 'budget' | 'balanced' | 'premium' | 'none';

// StartingPrefs comes from the form on the landing page (query string)
export interface StartingPrefs {
  name?: string;
  origin?: string;
  destination?: string;
  city?: string;
  departureDate?: string;
  returnDate?: string;
  preferences?: string;
  budgetIncludes: string[];
  transportation: string[];
}

// TripPrefs are additional preferences gathered through the chat process
export interface TripPrefs extends StartingPrefs {
  flightPreference?: BudgetPref;
  lodgingPreference?: BudgetPref;
  diningPreference?: BudgetPref;
  activityPreference?: BudgetPref;
  budget?: number;
  interests: string[];
  constraints: string[];
}

export interface TripData extends TripPrefs {
  departureFlight?: Flight;
  returnFlight?: Flight;
  hotel?: Hotel;
  destinationCoords?: { latitude: number; longitude: number };
  hotelCoords?: { latitude: number; longitude: number };
}

export function createEmptyTrip(): TripData {
  return {
    name: undefined,
    origin: undefined,
    destination: undefined,
    city: undefined,
    departureFlight: undefined,
    returnFlight: undefined,
    departureDate: undefined,
    returnDate: undefined,
    budget: undefined,
    hotel: undefined,
    interests: [],
    constraints: [],
    preferences: '',
    budgetIncludes: [],
    transportation: [],
  };
}
