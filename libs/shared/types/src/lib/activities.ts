import { ActivitiesResponseData } from './response-data';

export const ActivityFilterTypes = ['Nature', 'Food', 'Activities', 'Selfie Spots'] as const;
export type ActivityFilterType = (typeof ActivityFilterTypes)[number];

export type Activity = {
  id: string;
  name: string;
  location: string;
  description: string;
  website: string;
  category: ActivityFilterType;
  estimatedCost?: string;
  distance?: string;
  imageUrl?: string;
  imageUrls?: string[];
  pinned?: boolean;
};

export const SAMPLE_ACTIVITIES: Activity[] = [
  // Activities (4)
  {
    id: 'activities-1',
    name: 'Water Taxi All-Day Pass',
    description:
      'Cruise Fort Lauderdale’s Intracoastal Waterway with unlimited hop-on/hop-off stops from downtown to the beach and waterfront neighborhoods.',
    estimatedCost: '38',
    distance: '1mi',
    category: 'Activities',
    location: 'Downtown Fort Lauderdale',
    website: 'https://www.allorai.app',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/concert3.jpg',
    ],
  },
  {
    id: 'activities-2',
    name: 'Bonnet House Museum & Gardens',
    description:
      'Tour a preserved 1920s estate featuring tropical gardens, artist studios, and historic architecture steps from the beach corridor.',
    estimatedCost: '25',
    distance: '3mi',
    category: 'Activities',
    location: 'Fort Lauderdale Beach',
    website: 'https://www.allorai.app',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/museum3.jpg',
    ],
  },
  {
    id: 'activities-3',
    name: 'Jungle Queen Riverboat Cruise',
    description:
      'Take a narrated sightseeing cruise past mansions and mega-yachts, then stop for an island-style dinner show on a private tropical isle.',
    estimatedCost: '62',
    distance: '2.5mi',
    category: 'Activities',
    location: 'Fort Lauderdale Beach',
    website: 'https://www.allorai.app',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/amusement_park3.jpg',
    ],
  },
  {
    id: 'activities-4',
    name: 'NSU Art Museum Fort Lauderdale',
    description:
      'Browse contemporary exhibitions and Latin American collections at a modern museum in the city center, ideal for a cooler afternoon.',
    estimatedCost: '16',
    distance: '0.4mi',
    category: 'Activities',
    location: 'Downtown Fort Lauderdale',
    website: 'https://www.allorai.app',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/activities/bowling3.jpg',
    ],
  },
];

export const SAMPLE_ACTIVITIES_RESPONSE: ActivitiesResponseData = {
  type: 'activities',
  summary: 'Sample Fort Lauderdale activities for a Mar 12–20, 2026 trip.',
  options: SAMPLE_ACTIVITIES,
};
