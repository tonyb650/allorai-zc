import { Activity } from './activities';
import { NaturalAttractionResponseData } from './response-data';

export interface NaturalAttraction extends Activity {
  // Any additional fields if necessary
  climate?: string;
}

export const SAMPLE_NATURAL_ATTRACTIONS: NaturalAttraction[] = [
  {
    id: 'nature-1',
    name: 'Hugh Taylor Birch State Park',
    description:
      'Explore shaded coastal hammock trails, freshwater lagoon paddling, and quiet picnic areas in this urban state park between beach and Intracoastal.',
    estimatedCost: '6',
    distance: '3.4mi',
    location: 'East Sunrise Boulevard, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Nature',
    pinned: false,
    imageUrl:
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/national_park1.jpg',
    imageUrls: [
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/national_park1.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/national_park2.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/national_park3.jpg',
    ],
  },
  {
    id: 'nature-2',
    name: 'Everglades Airboat Eco Tour',
    description:
      'Glide through sawgrass marshes with naturalist guides to spot alligators, wading birds, and native plants in the western Everglades wetlands.',
    estimatedCost: '49',
    distance: '27mi',
    location: 'Western Broward County',
    website: 'https://www.allorai.app',
    category: 'Nature',
    pinned: false,
    imageUrl:
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/mountains1.jpg',
    imageUrls: [
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/mountains1.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/mountains2.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/mountains3.jpg',
    ],
  },
  {
    id: 'nature-3',
    name: 'Anne Kolb Nature Center',
    description:
      'Wander mangrove boardwalks and climb the observation tower for broad coastal views; kayak rentals are available for the tidal waterways.',
    estimatedCost: '0',
    distance: '9.8mi',
    location: 'West Lake Park, Hollywood, FL',
    website: 'https://www.allorai.app',
    category: 'Nature',
    pinned: false,
    imageUrl:
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/lake1.jpg',
    imageUrls: [
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/lake1.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/lake2.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/lake3.jpg',
    ],
  },
  {
    id: 'nature-4',
    name: 'Fort Lauderdale Beach Sunrise Walk',
    description:
      'Start early along the beachfront promenade for warm Atlantic sunrise views, palm-lined paths, and a calm stretch ideal for morning photos.',
    estimatedCost: '0',
    distance: '2.7mi',
    location: 'A1A Beachfront, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Nature',
    pinned: false,
    imageUrl:
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/beach1.jpg',
    imageUrls: [
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/beach1.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/beach2.jpg',
      'https://eshjuwnwxifcdayvivbg.supabase.co/storage/v1/object/public/activity-images/nature/beach3.jpg',
    ],
  },
];

export const SAMPLE_NATURE_RESPONSE: NaturalAttractionResponseData = {
  type: 'nature',
  summary: 'Sample Fort Lauderdale and nearby nature options for Mar 12–20, 2026.',
  options: SAMPLE_NATURAL_ATTRACTIONS,
};
