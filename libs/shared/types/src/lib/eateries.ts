import { Activity } from './activities';
import { EateryResponseData } from './response-data';

export interface Eatery extends Activity {
  // Any additional fields if necessary
  cuisine?: string;
}

export const SAMPLE_RESTAURANTS: Eatery[] = [
  {
    id: 'food-1',
    name: 'Cove & Current Seafood House',
    description:
      'A lively waterfront seafood spot known for local mahi tacos, stone crab claws in season, and sunset patio dining on the Intracoastal.',
    estimatedCost: '42',
    distance: '1.2mi',
    location: 'Las Olas, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/bbq3.jpg',
    ],
  },
  {
    id: 'food-2',
    name: 'Harbor Flame Grill',
    description:
      'A casual modern grill with hand-pressed burgers, blackened fish sandwiches, and crisp yucca fries, popular with locals after beach days.',
    estimatedCost: '22',
    distance: '2.1mi',
    location: 'Central Beach, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/burger3.jpg',
    ],
  },
  {
    id: 'food-3',
    name: 'Riverwalk Noodle Bar',
    description:
      'An energetic noodle shop serving tonkotsu ramen, spicy shrimp bao, and late-night small plates near the Riverwalk Arts district.',
    estimatedCost: '24',
    distance: '0.8mi',
    location: 'Downtown Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/ramen3.jpg',
    ],
  },
  {
    id: 'food-4',
    name: 'Sunrise Gelato & Cafe',
    description:
      'A bright cafe serving Cuban coffee, guava pastries, and house-made gelato, perfect for quick breakfasts before heading to the beach.',
    estimatedCost: '14',
    distance: '0.6mi',
    location: 'Himmarshee Village, Fort Lauderdale',
    website: 'https://www.allorai.app',
    category: 'Food',
    pinned: false,
    imageUrl:
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki1.jpg',
    imageUrls: [
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki1.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki2.jpg',
      'https://qgqmmzslzlhhledqpmzw.supabase.co/storage/v1/object/public/activity-images/food/taiyaki3.jpg',
    ],
  },
];

export const SAMPLE_RESTAURANTS_RESPONSE: EateryResponseData = {
  type: 'restaurant',
  summary: 'Sample Fort Lauderdale food options for a Mar 12–20, 2026 stay.',
  options: SAMPLE_RESTAURANTS,
};
