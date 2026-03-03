import { type ChatRequest, type Message, type TripData } from '@allorai/shared-types';

export type ChatRequestType =
  | 'departingFlights'
  | 'returningFlights'
  | 'hotels'
  | 'activities'
  | 'summary'
  | 'naturalAttractions'
  | 'selfieSpots'
  | 'travelTips'
  | 'eateries';

const getContentForType = (type: ChatRequestType, tripData: TripData): string => {
  const destination = tripData.destination ?? 'the destination';
  const origin = tripData.origin ?? 'the origin';
  const city = tripData.city ?? 'the destination city';
  switch (type) {
    case 'departingFlights':
      return `Given the trip data provided, please find flight options from ${origin} to ${destination}.`;
    case 'returningFlights':
      return `Given the trip data provided, please find flight options from ${origin} to ${destination}.`;
    case 'hotels':
      return `Given the trip data provided, please find hotels in ${city}.`;
    case 'activities':
      return `Given the trip data provided, please find activities in ${city}.`;
    case 'summary':
      return `Given the trip data provided, give me a text summary of the trip to ${city}.`;
    case 'naturalAttractions':
      return `Given the trip data provided, please find natural attractions in ${city}.`;
    case 'selfieSpots':
      return `Given the trip data provided, please find popular selfie spots in ${city}, in order of preference.`;
    case 'travelTips':
      return `Given the trip data provided, please provide travel tips for ${city}.`;
    case 'eateries':
      return `Given the trip data provided, please find eateries and restaurants in ${city}.`;
  }
};

export const createChatRequest = (
  type: ChatRequestType,
  tripData: TripData,
  chatMessages: Message[],
): ChatRequest => {
  const humanMessage: Message = {
    type: 'human',
    content: getContentForType(type, tripData),
  };

  return {
    messages: [...chatMessages, humanMessage],
    data: null,
    trip: tripData,
  };
};
