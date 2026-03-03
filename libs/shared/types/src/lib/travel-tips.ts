import { TipsResponseData } from './response-data';

export interface TravelTips {
  id: string;
  transportTips: string;
  whenToVisitTips: string;
  safetyTips: string;
}

const SAMPLE_TIPS: TravelTips[] = [
  {
    id: 'tip-1',
    transportTips:
      'From FLL, rideshare to Las Olas or Fort Lauderdale Beach typically takes 15–25 minutes. The Water Taxi is a fun way to move between beach, Riverwalk, and dining stops without parking hassles.',
    whenToVisitTips:
      'March 12–20 usually has warm days and lower rain risk; plan beach blocks in the morning and museum or shopping stops in late afternoon heat.',
    safetyTips:
      'Use marked crosswalks on A1A, keep valuables secure at the beach, and stay hydrated with sunscreen during midday sun.',
  },
  {
    id: 'tip-2',
    transportTips:
      'If you rent a car, reserve parking with your hotel in advance; weekend beach parking fills quickly. Brightline from Fort Lauderdale station is a good option for a day trip to Miami.',
    whenToVisitTips:
      'Book Everglades tours and popular waterfront dinners 2–4 days ahead during spring break season to avoid limited availability.',
    safetyTips:
      'Swim near lifeguard towers and check beach flag conditions daily; evening thunderstorms can develop quickly even on otherwise clear days.',
  },
];

export const SAMPLE_TIPS_RESPONSE: TipsResponseData = {
  type: 'tips',
  options: SAMPLE_TIPS,
};
