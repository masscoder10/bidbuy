import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Coins } from 'lucide-react';

interface BidCounterProps {
  size?: 'sm' | 'md' | 'lg';
  showAddButton?: boolean;
}

export const BidCounter: React.FC<BidCounterProps> = ({ 
  size = 'md',
  showAddButton = true
}) => {
  const { state: authState } = useAuth();
  const bidBalance = authState.user?.bidBalance || 0;
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs py-1 px-2';
      case 'lg': return 'text-base py-2 px-4';
      default: return 'text-sm py-1.5 px-3';
    }
  };

  return (
    <div className={`flex items-center ${getSizeClasses()}`}>
      <div className="flex items-center bg-gray-100 rounded-l-lg px-3 py-1.5">
        <Coins className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} text-accent mr-1`} />
        <span className={`font-medium ${bidBalance === 0 ? 'text-error' : 'text-gray-800'}`}>
          {bidBalance} Bids
        </span>
      </div>
      
      {showAddButton && (
        <button className="bg-primary text-white rounded-r-lg px-3 py-1.5 hover:bg-primary-dark transition-colors">
          + Add
        </button>
      )}
    </div>
  );
};