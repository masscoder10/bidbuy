import React, { useState, useEffect } from 'react';
import { Auction } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

interface AuctionCardProps {
  auction: Auction;
  compact?: boolean;
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ auction, compact = false }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isEnding, setIsEnding] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!auction.endTime) return;
      
      const now = new Date();
      const end = new Date(auction.endTime);
      const diff = end.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      // Set isEnding flag if less than 30 seconds remain
      setIsEnding(diff <= 30000);
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`);
      } else {
        setTimeLeft(`${seconds}s`);
      }
    };

    // Calculate immediately and then set interval
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [auction.endTime]);

  const handleClick = () => {
    navigate(`/auction/${auction.id}`);
  };

  if (compact) {
    return (
      <div 
        className="card p-3 cursor-pointer hover:shadow-md transition-all duration-300" 
        onClick={handleClick}
      >
        <div className="flex items-center space-x-3">
          <img 
            src={auction.product.imageUrl} 
            alt={auction.product.name} 
            className="w-16 h-16 object-cover rounded-md"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium truncate">{auction.product.name}</h3>
            <div className="flex items-center justify-between mt-1">
              <p className="text-primary font-semibold text-sm">{formatCurrency(auction.currentPrice)}</p>
              <div className={`flex items-center text-xs ${isEnding ? 'text-error timer-pulse' : 'text-gray-500'}`}>
                <Clock className="w-3 h-3 mr-1" />
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="card overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer animate-fadeIn"
      onClick={handleClick}
    >
      <div className="relative">
        <img 
          src={auction.product.imageUrl} 
          alt={auction.product.name} 
          className="w-full h-48 object-cover"
        />
        {auction.status === 'upcoming' && (
          <div className="absolute top-2 right-2 badge bg-secondary text-white">
            Coming Soon
          </div>
        )}
        {auction.status === 'completed' && (
          <div className="absolute top-2 right-2 badge bg-gray-700 text-white">
            Sold
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg truncate">{auction.product.name}</h3>
        <p className="text-gray-500 text-sm mt-1 truncate">{auction.product.brand}</p>
        
        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="text-primary-dark font-semibold text-lg">{formatCurrency(auction.currentPrice)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Retail Price</p>
            <p className="text-gray-700">{formatCurrency(auction.product.retailPrice)}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-1" />
            {auction.bidHistory.length} bids
          </div>
          
          <div className={`flex items-center text-sm ${isEnding ? 'text-error timer-pulse font-medium' : 'text-gray-500'}`}>
            <Clock className="w-4 h-4 mr-1" />
            {auction.status === 'upcoming' 
              ? 'Starts soon' 
              : auction.status === 'completed' 
                ? 'Ended' 
                : timeLeft}
          </div>
        </div>
      </div>
    </div>
  );
};