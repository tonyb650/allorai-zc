import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../../config/env';
import logger from '../../utils/logger';

export class BaseAgentService {
  protected client: AxiosInstance;

  constructor(baseURL: string = config.AGENTS_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 60_000,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': config.INTERNAL_API_KEY,
      },
    });

    // Add interceptors for logging, error handling
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      logger.debug(
        {
          url: config.url,
          baseURL: config.baseURL,
          method: config.method,
          headers: config.headers,
        },
        'Outgoing request to agent',
      );
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.error(
          {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            responseData: error.response?.data,
            responseHeaders: error.response?.headers,
          },
          'Agent API Error - Full details',
        );
        throw error;
      },
    );
  }

  // TODO protected async post<T extends BaseAgentResponse>(
  protected async post<T>(
    endpoint: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }
}
