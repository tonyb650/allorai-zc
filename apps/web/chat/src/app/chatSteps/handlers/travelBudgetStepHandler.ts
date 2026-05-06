import { type ChatResponse } from '@allorai/shared-types';
import { FlightResponseDataSchema } from '../schemas/flightResponseSchema';
import { sendChatMessage } from '../../api/chat';
import { StepHandler } from '../types';
import { createChatRequest } from '../helpers/chatRequest';
import { uniqueOptions } from '../../../utils/utils';

export const travelBudgetStepHandler: StepHandler = async ({
  tripData,
  setFlightOptions,
  chatMessages,
  setChatMessages,
}) => {
  try {
    // 1. Validate user selections
    if (!tripData.flightPreference || !tripData.lodgingPreference) {
      return {
        success: false,
        error: 'Please select both flight and lodging preferences',
      };
    }

    // 2. Format api request correctly
    // FORMAT: Here, we format the user selection to create a message that the LLM
    // will understand and will result in a response with a list of departing flight options
    const request = createChatRequest('departingFlights', tripData, chatMessages);

    // 3. Make request to api-gateway
    const response: ChatResponse = await sendChatMessage(request);

    // 4. Parse and validate response into flight options
    const parsedResponseData = FlightResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid flight response data:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid flight data from server',
      };
    }
    if (!parsedResponseData.data.options) {
      console.error("Missing 'options' from response in request for departing flights");
      return {
        success: false,
        error: 'Response from api-gateway did not contain the needed data',
      };
    }


    setChatMessages([...request.messages, response.messages[response.messages.length - 1]]); // TODO adding on ai response message, maybe ust pass response messages.. test this
    setFlightOptions(uniqueOptions(parsedResponseData.data.options));
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process travel budget preferences',
    };
  }
};
