import { Request, Response } from 'express';
import { z } from 'zod';
import { chatAgent } from '../services/agents/chat-agent.service';
import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import logger from '../utils/logger';

const MessageSchema = z.object({
  type: z.enum(['human', 'ai']),
  content: z.string(),
});

const TripDataSchema = z
  .object({
    origin: z.string().optional(),
    destination: z.string().optional(),
    departureDate: z.string().optional(),
    returnDate: z.string().optional(),
    preferences: z.string().optional(),
    budgetIncludes: z.array(z.string()).optional(),
    transportation: z.array(z.string()).optional(),
    flightPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    lodgingPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    diningPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    activityPreference: z.enum(['budget', 'balanced', 'premium', 'none']).optional(),
    currentStepIndex: z.number().optional(),
    budget: z.number().optional(),
    interests: z.array(z.string()).optional(),
    constraints: z.array(z.string()).optional(),
    departureFlight: z.any().optional(),
    returnFlight: z.any().optional(),
    hotel: z.any().optional(),
  })
  .passthrough();

const ChatMessageRequestSchema = z.object({
  messages: z.array(MessageSchema).min(1),
  trip: TripDataSchema,
  data: z.any().nullable().optional(),
});

const chatMessageHandler = async (req: Request, res: Response): Promise<void> => {
  const parseResult = ChatMessageRequestSchema.safeParse(req.body);

  if (!parseResult.success) {
    logger.warn('Invalid chat message request body:');
    logger.debug(parseResult.error.issues);
    res.status(400).json({
      error: 'Invalid request body',
      details: parseResult.error.issues,
    });
    return;
  }

  const { messages, trip } = parseResult.data;

  const chatRequest: ChatRequest = {
    messages,
    trip: trip as ChatRequest['trip'],
  };

  logger.debug('+++++++++ REQUEST IN CHAT CONTROLLER +++++++++');
  logger.debug(chatRequest);

  const response: ChatResponse = await chatAgent.sendChat(chatRequest);

  logger.debug('^^^^^^^^ RESPONSE IN CHAT CONTROLLER ^^^^^^^^');
  logger.debug(response);

  res.status(200).json(response);
};

export { chatMessageHandler };
