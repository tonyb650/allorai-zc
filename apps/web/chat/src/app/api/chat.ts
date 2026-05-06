import { apiClient } from './api-client';
import {
  SAMPLE_ACTIVITIES_RESPONSE,
  SAMPLE_RESTAURANTS_RESPONSE,
  SAMPLE_NATURE_RESPONSE,
  SAMPLE_SELFIE_SPOTS_RESPONSE,
  SAMPLE_FLIGHTS_RESPONSE,
  SAMPLE_HOTELS_RESPONSE,
  type ChatRequest,
  type ChatResponse,
  type ResponseData,
} from '@allorai/shared-types';

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA === 'all') {
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "I'm returning hard-coded sample data for a trip from SFO to FLL (Fort Lauderdale) departing March 12, 2026 and returning March 20, 2026 to save time in development.",
          },
        ],
        data: responseDataForStep(data),
        trip: data.trip,
        debug: [],
      };
    }
    const response = await apiClient.post<ChatResponse>('/chat/message', data);

    if (
      response.data.messages[response.data.messages.length - 1].content.match(
        /something went wrong/gi,
      )
    ) {
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "I wasn't able to get real data in time, so I'm returning sample data for SFO → FLL (Fort Lauderdale), March 12–20, 2026 instead.",
          },
        ],
        data: responseDataForStep(data),
        trip: data.trip,
        debug: [],
      };
    }
    return response.data;
  } catch (error) {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA === 'on-error') {
      console.error('Unsuccessful call to api-gateway. Returning SAMPLE data instead:');
      console.error(error);
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "I wasn't able to get real data in time, so I'm returning sample data for SFO → FLL (Fort Lauderdale), March 12–20, 2026 instead.",
          },
        ],
        data: responseDataForStep(data),
        trip: data.trip,
        debug: [],
      };
    }
    throw error; // If not returning sample data, re-throw
  }
}

const responseDataForStep = ({ messages }: ChatRequest): ResponseData => {
  const humanMessage = messages[messages.length - 1];
  if (humanMessage.content.match(/outbound flights/i)) {
    return SAMPLE_FLIGHTS_RESPONSE;
  } else if (humanMessage.content.match(/return flights/i)) {
    return SAMPLE_FLIGHTS_RESPONSE;
  } else if (humanMessage.content.match(/hotel/i)) {
    return SAMPLE_HOTELS_RESPONSE;
  } else if (humanMessage.content.match(/natural attractions/i)) {
    return SAMPLE_NATURE_RESPONSE;
  } else if (humanMessage.content.match(/eateries/i)) {
    return SAMPLE_RESTAURANTS_RESPONSE;
  } else if (humanMessage.content.match(/activities/i)) {
    return SAMPLE_ACTIVITIES_RESPONSE;
  } else if (humanMessage.content.match(/selfie spot/i)) {
    return SAMPLE_SELFIE_SPOTS_RESPONSE;
  }
  return SAMPLE_FLIGHTS_RESPONSE; // Fallback if no matches
};
