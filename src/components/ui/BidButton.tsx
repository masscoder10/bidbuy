import React, { useState } from 'react';
import { useAuctions } from '../../context/AuctionContext';
import { useAuth } from '../../context/AuthContext';
import { Auction } from '../../types';

interface BidButtonProps {
  auction: Auction;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const BidButton: React.FC<BidButtonProps> = ({ 
  auction, 
  size = 'md',
  fullWidth = false 
}) => {
  const [bidding, setBidding] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { placeBid } = useAuctions();
  const { state: authState } = useAuth();

  const handleBid = async () => {
    if (!authState.isAuthenticated) {
      setError('Please log in to place a bid');
      return;
    }

    if (authState.user?.bidBalance < 1) {
      setError('You need more bids to continue');
      return;
    }

    try {
      setBidding(true);
      setError(null);
      
      const result = await placeBid(auction.id);
      
      if (result) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError('Failed to place bid. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setBidding(false);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-sm py-1 px-3';
      case 'lg': return 'text-lg py-3 px-6';
      default: return 'py-2 px-4';
    }
  };

  const isDisabled = 
    auction.status !== 'active' || 
    bidding || 
    !authState.isAuthenticated || 
    (authState.user?.bidBalance || 0) < 1;

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      <button
        onClick={handleBid}
        disabled={isDisabled}
        className={`
          ${getSizeClasses()}
          ${fullWidth ? 'w-full' : ''}
          rounded-lg font-medium 
          ${success 
            ? 'bg-success text-white' 
            : 'bg-accent text-black hover:bg-accent/90 active:bg-accent-dark'}
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-300
          ${success ? 'animate-bid-pop' : ''}
        `}
      >
        {bidding 
          ? 'Bidding...' 
          : success 
            ? 'Bid Placed!' 
            : auction.status !== 'active'
              ? 'Not Available'
              : 'Place Bid'}
      </button>
      
      {error && (
        <p className="text-error text-xs mt-1">{error}</p>
      )}
    </div>
  );
};