import React, { createContext, useContext, useState, useEffect } from 'react';
import { Auction, Bid } from '../types';
import { auctionApi } from '../services/api';
import { useAuth } from './AuthContext';

type AuctionContextType = {
  auctions: Auction[];
  featuredAuctions: Auction[];
  placeBid: (auctionId: string) => Promise<boolean>;
  getAuctionById: (id: string) => Auction | undefined;
  isLoading: boolean;
};

const AuctionContext = createContext<AuctionContextType>({
  auctions: [],
  featuredAuctions: [],
  placeBid: async () => false,
  getAuctionById: () => undefined,
  isLoading: true,
});

export const AuctionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [featuredAuctions, setFeaturedAuctions] = useState<Auction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { state: authState, updateBidBalance } = useAuth();

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await auctionApi.getAuctions();
        setAuctions(response.data);
        setFeaturedAuctions(
          response.data.filter(
            (auction: Auction) => auction.product.featured && auction.status === 'active'
          )
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch auctions', error);
        setIsLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  const getAuctionById = (id: string) => {
    return auctions.find((auction) => auction.id === id);
  };

  const placeBid = async (auctionId: string): Promise<boolean> => {
    if (!authState.user) {
      throw new Error('You must be logged in to place a bid');
    }

    if (authState.user.bidBalance < 1) {
      throw new Error('You do not have enough bids');
    }

    try {
      const response = await auctionApi.placeBid(auctionId);
      const updatedAuction = response.data;
      
      // Update auctions state
      const auctionIndex = auctions.findIndex((a) => a.id === auctionId);
      if (auctionIndex !== -1) {
        const updatedAuctions = [...auctions];
        updatedAuctions[auctionIndex] = updatedAuction;
        setAuctions(updatedAuctions);

        // Update featured auctions if necessary
        const featuredIndex = featuredAuctions.findIndex((a) => a.id === auctionId);
        if (featuredIndex !== -1) {
          const updatedFeatured = [...featuredAuctions];
          updatedFeatured[featuredIndex] = updatedAuction;
          setFeaturedAuctions(updatedFeatured);
        }
      }

      // Update bid balance
      updateBidBalance(authState.user.bidBalance - 1);

      return true;
    } catch (error) {
      console.error('Failed to place bid', error);
      return false;
    }
  };

  return (
    <AuctionContext.Provider
      value={{
        auctions,
        featuredAuctions,
        placeBid,
        getAuctionById,
        isLoading,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuctions = () => useContext(AuctionContext);