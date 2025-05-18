import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; username: string }) => 
    api.post('/auth/register', userData),
};

export const auctionApi = {
  getAuctions: () => api.get('/auctions'),
  getAuctionById: (id: string) => api.get(`/auctions/${id}`),
  placeBid: (auctionId: string) => api.post(`/auctions/${auctionId}/bid`),
};

export const bidApi = {
  getBidPackages: () => api.get('/bid-packages'),
  purchaseBids: (packageId: string) => api.post(`/bid-packages/${packageId}/purchase`),
};

export default api;