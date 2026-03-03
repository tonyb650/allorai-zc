import { StartingPrefs } from '@allorai/shared-types';
import { z } from 'zod';

export const fallbackStartingPrefs: StartingPrefs = {
  origin: 'SFO',
  destination: 'FLL',
  city: 'Fort Lauderdale, FL',
  departureDate: 'March 12, 2026',
  returnDate: 'March 20, 2026',
  budgetIncludes: ['flights', 'lodging', 'dining'],
  transportation: ['car rental'],
  preferences: 'beachfront activities, local seafood, and relaxed sightseeing',
};

const startingPrefsSchema = z.object({
  origin: z.string().trim().min(1),
  destination: z.string().trim().min(1),
  city: z.string().trim().min(1),
  departureDate: z.string().trim().min(1),
  returnDate: z.string().trim().min(1),
  budgetIncludes: z.array(z.string().trim().min(1)).min(1),
  transportation: z.array(z.string().trim().min(1)).min(1),
  preferences: z.string().trim().min(1).optional(),
});

export default function parseStartingPrefs(searchParams: URLSearchParams): StartingPrefs | null {
  const rawData = {
    origin: searchParams.get('fromAirport') ?? '',
    destination: searchParams.get('toAirport') ?? '',
    city: searchParams.get('toCity') ?? '',
    departureDate: searchParams.get('departureDate') ?? '',
    returnDate: searchParams.get('returnDate') ?? '',
    budgetIncludes:
      searchParams
        .get('budgetIncludes')
        ?.split(',')
        .map((item) => item.trim())
        .filter(Boolean) ?? [],
    transportation:
      searchParams
        .get('transportation')
        ?.split(',')
        .map((item) => item.trim())
        .filter(Boolean) ?? [],
    preferences: searchParams.get('preferences')?.trim() || undefined,
  };

  const parsed = startingPrefsSchema.safeParse(rawData);

  if (!parsed.success) {
    console.error('Invalid starting prefs search params', parsed.error.flatten());
    return null;
  }

  return parsed.data;
}
