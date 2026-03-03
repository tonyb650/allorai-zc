import { Hotel, type ChatResponse } from '@allorai/shared-types';
import { sendChatMessage } from '../../api/chat';
import { HotelResponseDataSchema } from '../schemas/hotelResponseSchema';
import { StepHandler } from '../types';
import { createChatRequest } from '../helpers/chatRequest';

export const flightReturningStepHandler: StepHandler = async ({
  tripData,
  setHotelOptions,
  chatMessages,
  setChatMessages,
}) => {
  try {
    // 1. Validate user selections
    if (!tripData.returnFlight) {
      return {
        success: false,
        error: 'Please select a return flight',
      };
    }

    const request = createChatRequest('hotels', tripData, chatMessages);

    const response: ChatResponse = await sendChatMessage(request);

    const parsedResponseData = HotelResponseDataSchema.safeParse(response.data);

    if (!parsedResponseData.success) {
      console.error('Invalid hotel data in response:', parsedResponseData.error.issues);
      return {
        success: false,
        error: 'Received invalid hotel data from server',
      };
    }
    if (!parsedResponseData.data.options) {
      console.error("Missing 'options' from response in request for hotels");
      return {
        success: false,
        error: 'Response from api-gateway did not contain the needed data',
      };
    }

    setChatMessages([...request.messages, response.messages[response.messages.length - 1]]); // adding on ai response message

    // Inject fake pricing for hotels
    const hotelOptions: Hotel[] = parsedResponseData.data.options.map((option) => {
      return {
        ...option,
        price: option.price || Math.floor(Math.random() * (590 - 290 + 1)) + 290,
      };
    });

    setHotelOptions(hotelOptions);
    return { success: true, shouldAdvance: true };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to process returning flight selection',
    };
  }
};
