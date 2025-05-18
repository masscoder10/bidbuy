export interface User {
  id: string;
  username: string;
  email: string;
  bidBalance: number;
  avatar?: string;
  createdAt: Date;
}

export interface BidPackage {
  id: string;
  name: string;
  bidCount: number;
  price: number;
  savings?: number;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  retailPrice: number;
  imageUrl: string;
  brand: string;
  category: string;
  featured?: boolean;
}

export interface Auction {
  id: string;
  product: Product;
  startPrice: number;
  currentPrice: number;
  bidIncrement: number;
  startTime: Date;
  endTime: Date | null;
  status: 'upcoming' | 'active' | 'completed';
  bidHistory: Bid[];
  winner?: string;
}

export interface Bid {
  id: string;
  auctionId: string;
  userId: string;
  username: string;
  timestamp: Date;
  amount: number;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

export type BidState = {
  myBids: Bid[];
  wonAuctions: Auction[];
  isLoading: boolean;
}