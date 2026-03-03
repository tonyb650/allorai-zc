import { HotelResponseData } from './response-data';

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating?: number;
  latitude?: number;
  longitude?: number;
  description: string;
  website: string;
  num_of_stars?: number;
  price?: number;
  imageUrl?: string;
}

export const SAMPLE_HOTELS: Hotel[] = [
  {
    id: 'a',
    name: 'Las Olas Harbor Hotel',
    location: 'Downtown Fort Lauderdale (Las Olas), Fort Lauderdale',
    description:
      'A polished waterfront hotel with walkable access to Las Olas Boulevard dining, rooftop pool service, and marina views.',
    website: 'https://www.lasolasharborhotel.com',
    num_of_stars: 5,
    price: 312,
  },
  {
    id: 'b',
    name: 'Ocean Sun Inn',
    location: 'Fort Lauderdale Beach, Fort Lauderdale',
    description:
      'A relaxed beachside inn two blocks from the sand with complimentary breakfast and bike rentals.',
    website: 'https://www.oceansuninn.com',
    num_of_stars: 3,
    price: 176,
  },
  {
    id: 'c',
    name: 'Canal View Suites',
    location: 'Victoria Park, Fort Lauderdale',
    description:
      'Modern all-suite property with spacious rooms, kitchenettes, and quick rides to both beach and nightlife.',
    website: 'https://www.canalviewsuites.com',
    num_of_stars: 4,
    price: 224,
  },
  {
    id: 'd',
    name: 'Cypress Key Lodge',
    location: 'Poinsettia Heights, Fort Lauderdale',
    description:
      'A value-focused boutique lodge with clean rooms, free parking, and easy access to I-95 and FLL airport.',
    website: 'https://www.cypresskeylodge.com',
    num_of_stars: 2,
    price: 124,
  },
];

export const SAMPLE_HOTELS_RESPONSE: HotelResponseData = {
  type: 'hotel',
  summary: 'Sample hotel options in Fort Lauderdale for a Mar 12–20, 2026 stay.',
  options: SAMPLE_HOTELS,
};
