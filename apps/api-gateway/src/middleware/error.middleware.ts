import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';
import logger from '../utils/logger';

export interface ApiError extends Error {
  code?: string;
  statusCode?: number;
  details?: string;
}

const TIMEOUT_CODES = new Set(['ECONNABORTED', 'ETIMEDOUT']);
const CONNECTION_CODES = new Set([
  'ECONNREFUSED',
  'ECONNRESET',
  'ENOTFOUND',
  'EAI_AGAIN',
]);

export const errorHandler = (
  err: ApiError | AxiosError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AxiosError) {
    const code = err.code || '';

    // Upstream returned a response — proxy its status through.
    if (err.response) {
      const data = err.response.data;
      const message = typeof data === 'string' ? data : err.message;
      logger.error(err, `Agents API responded ${err.response.status} (${code}): ${message}`);
      res.status(err.response.status).json({
        error: 'Upstream Error',
        message: message || 'Upstream service returned an error',
        details: data,
      });
      return;
    }

    // No response received — distinguish timeout vs connection failure so the
    // caller sees a useful status instead of an opaque 500.
    if (TIMEOUT_CODES.has(code)) {
      logger.error(err, `Agents API timeout (${code}): ${err.message}`);
      res.status(504).json({
        error: 'Gateway Timeout',
        message: 'The agents service did not respond in time. Please try again.',
        code,
      });
      return;
    }

    if (CONNECTION_CODES.has(code)) {
      logger.error(err, `Agents API unreachable (${code}): ${err.message}`);
      res.status(502).json({
        error: 'Bad Gateway',
        message: 'The agents service is unreachable. Please try again shortly.',
        code,
      });
      return;
    }

    logger.error(err, `Agents API error (${code}): ${err.message}`);
    res.status(500).json({
      error: 'Service Error',
      message: err.message || 'An error occurred while communicating with the agents service',
      code,
    });
    return;
  }
  
  // Handle Non-axios errors
  const name = err.code && err.code.includes('PGRST') ? 'Database Error' : 'Internal Server Error';
  const { code, message, details, statusCode } = err;

  logger.error(err, `${name} (${code}):  ${message}`);
  res.status(statusCode || 500).json({
    error: name,
    message,
    details,
  });
  return;
};
