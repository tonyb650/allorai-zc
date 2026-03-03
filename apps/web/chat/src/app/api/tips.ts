import {
  SAMPLE_TIPS_RESPONSE,
  type ChatRequest,
  type ChatResponse,
  type ResponseData,
} from '@allorai/shared-types';
import { apiClient } from './api-client';

export async function sendTipsRequestMessage(data: ChatRequest): Promise<ChatResponse> {
  try {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA === 'all') {
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "To save time in app development, I'm returning hard-coded sample tips for a trip from SFO to FLL (Fort Lauderdale) on March 12–20, 2026.",
          },
        ],
        data: sampleResponseDataForTips(),
        trip: data.trip,
        debug: [],
      };
    }
    const response = await apiClient.post<ChatResponse>('/tips', data);
    return response.data;
  } catch (error) {
    if (process.env.NX_PUBLIC_USE_SAMPLE_DATA === 'on-error') {
      console.error(
        'Tips API module made an unsuccessful call to api-gateway. Returning SAMPLE data instead:',
      );
      console.error(error);
      return {
        messages: [
          ...data.messages,
          {
            type: 'ai',
            content:
              "I wasn't able to get real data in time, so I'm returning sample tips for SFO → FLL (Fort Lauderdale), March 12–20, 2026 instead.",
          },
        ],
        data: sampleResponseDataForTips(),
        trip: data.trip,
        debug: [],
      };
    }
    throw error; // If not returning sample data, then re-throw
  }
}

const sampleResponseDataForTips = (): ResponseData => {
  return SAMPLE_TIPS_RESPONSE;
};
