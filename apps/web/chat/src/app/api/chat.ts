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

// TODO Fix the type here
export interface CreateSessionResponse {
  sessionId: string;
  createdAt: string;
}

// API sets cookie for chat_session_id
export async function createChatSession(): Promise<CreateSessionResponse> {
  const response = await apiClient.post<CreateSessionResponse>('/chat/session', {});
  return response.data;
}

export async function sendChatMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA === 'all') {
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "I'm returning some hard-coded sample data for the request to save time in development.",
          },
        ],
        data: responseDataForStep(data),
        trip: data.trip,
        debug: [],
      };
    }
    const response = await apiClient.post<ChatResponse>('/chat/message', data);
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
              "I wasn't able to get real data. It might have taken too long. I'm returning some sample data for the request instead.",
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

// API deletes cookie and chat_session_id from the browser, not Supabase.
export async function deleteChatSession(): Promise<number> {
  const response = await apiClient.delete<number>('/chat/session', {});
  return response.status;
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
