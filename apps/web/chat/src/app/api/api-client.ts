import axios from 'axios';

const API_BASE_URL = process.env.NX_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

if (process.env.NX_PUBLIC_TEST_SLOW_API === 'true') {
  apiClient.interceptors.request.use((req) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(req);
      }, 1500);
    });
  });
}

export default apiClient;
