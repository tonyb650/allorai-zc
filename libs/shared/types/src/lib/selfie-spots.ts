import { Activity } from './activities';
import { SelfieResponseData } from './response-data';

export interface SelfieSpot extends Activity {
  // Any additional fields if necessary
  rating?: string;
}

export const SAMPLE_SELIFE_SPOTS: SelfieSpot[] = [
  {
    id: 'selfie-1',
    name: 'Las Olas Riverfront Murals',
    description:
      'Capture colorful street art and neon-lit alley textures near Las Olas after sunset, one of the most photogenic downtown backdrops.',
    estimatedCost: '0',
    distance: '0.7mi',
    location: 'Las Olas Boulevard, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/dog_statue3.jpg',
    ],
  },
  {
    id: 'selfie-2',
    name: 'Fort Lauderdale Beach Wave Wall',
    description:
      'Pose at the iconic beachfront wave wall and palm-lined promenade with Atlantic blue water and lifeguard towers in the background.',
    estimatedCost: '0',
    distance: '2.9mi',
    location: 'A1A, Fort Lauderdale Beach',
    website: 'https://www.allorai.app',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/lights3.jpg',
    ],
  },
  {
    id: 'selfie-3',
    name: 'Bonnet House Orchid Garden',
    description:
      'Frame tropical blooms, winding pathways, and historic estate architecture in a shaded garden setting that looks great in soft afternoon light.',
    estimatedCost: '0',
    distance: '3.2mi',
    location: 'Bonnet House Grounds, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/mural3.jpg',
    ],
  },
  {
    id: 'selfie-4',
    name: 'Pier 66 Marina Overlook',
    description:
      'Shoot panoramic skyline, superyacht, and waterway views from the marina overlook where golden hour reflections are especially dramatic.',
    estimatedCost: '0',
    distance: '2.4mi',
    location: '17th Street Causeway, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Selfie Spots',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/selfie-spots/observatory3.jpg',
    ],
  },
];

export const SAMPLE_SELFIE_SPOTS_RESPONSE: SelfieResponseData = {
  type: 'selfie',
  summary: 'Sample photo-friendly Fort Lauderdale selfie spots for Mar 12–20, 2026.',
  options: SAMPLE_SELIFE_SPOTS,
};
