import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { ActivityResponseDataSchema } from '../schemas/activitiesResponseSchema';
import { SelfieSpotResponseDataSchema } from '../schemas/selfieSpotResponseSchema';
import { NaturalAttractionResponseDataSchema } from '../schemas/naturalAttractionResponseSchema';
import { EateryResponseDataSchema } from '../schemas/eateryResponseSchema';
import { createChatRequest } from '../helpers/chatRequest';
import { sendTipsRequestMessage } from '../../api/tips';
import { TravelTipResponseDataSchema } from '../schemas/travelTipResponseSchema';
import { Activity } from '@allorai/shared-types';

const MAX_PER_CATEGORY = 4;

const appendDeduped = (prev: Activity[], incoming: Activity[]): Activity[] => {
  // const names = new Set(prev.map((a) => a.name.toLowerCase().trim()));
  // const unique = incoming.filter((a) => !names.has(a.name.toLowerCase().trim()));
  const ids = new Set(prev.map((a) => a.id));
  const unique = incoming.filter((a) => !ids.has(a.id));
  return [...prev, ...unique.slice(0, MAX_PER_CATEGORY)];
};

export const activityBudgetStepHandler: StepHandler = async ({
  tripData,
  setActivityOptions,
  setTravelTips,
  chatMessages,
  setChatMessages,
}) => {
  try {
    if (!tripData.diningPreference || !tripData.activityPreference) {
      return {
        success: false,
        error: 'Please select both dining and activity preferences',
      };
    }

    // Clear old activities before fetching new ones
    setActivityOptions([]);

    const activitiesRequest = createChatRequest('activities', tripData, chatMessages);
    const naturalAttractionsRequest = createChatRequest(
      'naturalAttractions',
      tripData,
      chatMessages,
    );
    const eateriesRequest = createChatRequest('eateries', tripData, chatMessages);
    const selfieSpotRequest = createChatRequest('selfieSpots', tripData, chatMessages);
    const travelTipsRequest = createChatRequest('travelTips', tripData, chatMessages);

    // Make requests sequentially
    // const activitiesResponse = await sendChatMessage(activitiesRequest);
    // const selfieSpotResponse = await sendChatMessage(selfieSpotRequest);
    // const naturalAttractionsResponse = await sendChatMessage(naturalAttractionsRequest);
    // const eateriesResponse = await sendChatMessage(eateriesRequest);
    // const travelTipsResponse = await sendChatMessage(travelTipsRequest);

    // Fire all requests in parallel; append to activityOptions as each resolves
    const [activitiesResponse] = await Promise.allSettled([
      sendChatMessage(activitiesRequest).then((response) => {
        const parsed = ActivityResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid activity response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => appendDeduped(prev, options));
        }
        return response;
      }),
      sendChatMessage(naturalAttractionsRequest).then((response) => {
        const parsed = NaturalAttractionResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid natural attraction response data:', parsed.error.issues);
          console.log(parsed);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => appendDeduped(prev, options));
        }
      }),
      sendChatMessage(eateriesRequest).then((response) => {
        const parsed = EateryResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid eatery response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => appendDeduped(prev, options));
        }
      }),
      sendChatMessage(selfieSpotRequest).then((response) => {
        const parsed = SelfieSpotResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid selfie spot response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setActivityOptions((prev) => appendDeduped(prev, options));
        }
      }),
      sendTipsRequestMessage(travelTipsRequest).then((response) => {
        const parsed = TravelTipResponseDataSchema.safeParse(response.data);
        if (!parsed.success) {
          console.error('Invalid travel tips response data:', parsed.error.issues);
        } else if (parsed.data.options) {
          const options = parsed.data.options;
          setTravelTips((prev) => [...prev, ...options]);
        }
      }),
    ]);

    if (activitiesResponse.status === 'fulfilled' && activitiesResponse.value) {
      const response = activitiesResponse.value;
      setChatMessages([
        ...activitiesRequest.messages,
        response.messages[response.messages.length - 1],
      ]);
    }

    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process activities budget preferences',
    };
  }
};
