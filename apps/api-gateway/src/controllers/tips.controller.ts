import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import { Request, Response } from 'express';
import { z } from 'zod';
import { tipsAgent } from '../services/agents/tips-agent.service';
import { saveChatMessage } from '../services/db/chat.service';
import logger from '../utils/logger';

// Zod schema for request body validation
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
  sessionId: z.string(),
  messages: z.array(MessageSchema).min(1),
  trip: TripDataSchema,
  data: z.any().nullable().optional(),
});

// ************* POST /tips - Send a message and get response with tips ************
const tipsHandler = async (req: Request, res: Response): Promise<void> => {
  const { supabase } = req;

  // 1. Parse and validate req.body with Zod
  const parseResult = ChatMessageRequestSchema.safeParse(req.body); // Same request body as Chat

  if (!parseResult.success) {
    logger.warn('Invalid request body for tips:');
    logger.debug(parseResult.error.issues);
    res.status(400).json({
      error: 'Invalid request body',
      details: parseResult.error.issues,
    });
    return;
  }

  const { sessionId, messages, trip } = parseResult.data;
  const humanChatMessage = messages[messages.length - 1].content;

  // 2. Save user message to database
  if (supabase) {
    const { data: humanChatData } = await saveChatMessage({
      supabase,
      sessionId,
      role: 'user',
      content: { text: humanChatMessage },
    });
    logger.debug('Human chat request saved to database:');
    logger.debug(humanChatData);
  }
  // 3. Make request to agentAPI
  const tipsRequest: ChatRequest = {
    messages,
    trip: trip as ChatRequest['trip'],
  };

  logger.debug('+++++++++ REQUEST IN TIPS CONTROLLER +++++++++');
  logger.debug(tipsRequest);

  const response: ChatResponse = await tipsAgent.sendTipsRequest(tipsRequest);

  logger.debug('^^^^^^^^ RESPONSE IN TIPS CONTROLLER ^^^^^^^^');
  logger.debug(response);

  // 4. Save AI response message to database
  if (supabase) {
    const { data: aiChatData } = await saveChatMessage({
      supabase,
      sessionId,
      role: 'assistant',
      content: { text: "I'm providing you with travel tips" },
    });
    logger.debug('AI chat response (tips) saved to database:');
    logger.debug(aiChatData);
  }

  // 5. Return the assistant response
  res.status(200).json(response);
};



export { tipsHandler };
