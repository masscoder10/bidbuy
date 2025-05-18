import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuctions } from '../context/AuctionContext';
import { useAuth } from '../context/AuthContext';
import { BidButton } from '../components/ui/BidButton';
import { AuctionCard } from '../components/ui/AuctionCard';
import { formatCurrency } from '../utils/formatters';
import { Clock, User, Tag, AlertCircle, TrendingUp, Truck, Shield, Award } from 'lucide-react';

export const AuctionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAuctionById, auctions, isLoading } = useAuctions();
  const { state: authState } = useAuth();
  const [auction, setAuction] = useState(getAuctionById(id || ''));
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [isEnding, setIsEnding] = useState(false);
  
  // Get similar auctions
  const similarAuctions = auctions
    .filter(a => 
      a.id !== id && 
      a.status === 'active' && 
      a.product.category === auction?.product.category
    )
    .slice(0, 4);

  useEffect(() => {
    // Update auction when auctions change
    if (id) {
      const currentAuction = getAuctionById(id);
      setAuction(currentAuction);
    }
  }, [id, auctions, getAuctionById]);

  useEffect(() => {
    if (!auction || !auction.endTime) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const end = new Date(auction.endTime!);
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
    
    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(interval);
  }, [auction]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="h-16 w-16 text-error mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Auction Not Found</h1>
        <p className="text-gray-600 mb-8">The auction you're looking for doesn't exist or has been removed.</p>
        <Link to="/auctions" className="btn btn-primary">
          Browse Auctions
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Auction details */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Section */}
            <div className="p-6 flex items-center justify-center bg-gray-50">
              <img 
                src={auction.product.imageUrl} 
                alt={auction.product.name} 
                className="object-contain max-h-96 w-full"
              />
            </div>
            
            {/* Details Section */}
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{auction.product.name}</h1>
                <p className="text-gray-600 mb-4">{auction.product.brand}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="badge badge-primary">
                    <Tag className="w-3.5 h-3.5 mr-1" />
                    {auction.product.category}
                  </span>
                  <span className="badge bg-gray-100 text-gray-700">
                    <User className="w-3.5 h-3.5 mr-1" />
                    {auction.bidHistory.length} bids
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(auction.currentPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Retail Price</p>
                  <p className="text-xl text-gray-700 line-through">
                    {formatCurrency(auction.product.retailPrice)}
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Auction ends in:</p>
                  <p className={`font-semibold ${isEnding ? 'text-error timer-pulse' : 'text-gray-800'}`}>
                    <Clock className="inline-block w-4 h-4 mr-1" />
                    {auction.status === 'upcoming' 
                      ? 'Not started yet' 
                      : auction.status === 'completed' 
                        ? 'Auction ended' 
                        : timeLeft}
                  </p>
                </div>
                
                {auction.status === 'active' && (
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div 
                      className={`h-2 rounded-full ${isEnding ? 'bg-error' : 'bg-primary'}`} 
                      style={{ width: isEnding ? '15%' : '35%' }}
                    ></div>
                  </div>
                )}
                
                {auction.status === 'completed' && auction.winner && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-6">
                    <div className="flex items-center text-success">
                      <Award className="h-5 w-5 mr-2" />
                      <p className="font-medium">Won by: {auction.winner}</p>
                    </div>
                  </div>
                )}
              </div>
              
              {authState.isAuthenticated && auction.status === 'active' ? (
                <div className="mb-6">
                  <BidButton auction={auction} size="lg" fullWidth />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Each bid costs 1 bid credit and adds $0.01 to the price
                  </p>
                </div>
              ) : auction.status === 'upcoming' ? (
                <div className="bg-gray-100 rounded-lg p-4 text-center mb-6">
                  <p className="font-medium">This auction hasn't started yet</p>
                  <p className="text-sm text-gray-500 mt-1">Check back soon!</p>
                </div>
              ) : auction.status === 'completed' ? (
                <div className="mb-6">
                  <button 
                    className="w-full py-3 px-4 bg-gray-200 text-gray-600 rounded-lg font-medium cursor-not-allowed"
                    disabled
                  >
                    Auction Ended
                  </button>
                </div>
              ) : (
                <div className="mb-6">
                  <Link 
                    to="/login" 
                    className="block w-full py-3 px-4 bg-primary text-white text-center rounded-lg font-medium hover:bg-primary-dark transition-colors"
                  >
                    Login to Bid
                  </Link>
                </div>
              )}
              
              <div className="space-y-3">
                <div className="flex items-start text-sm">
                  <TrendingUp className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-600">
                    Price increases by $0.01 with each bid
                  </p>
                </div>
                <div className="flex items-start text-sm">
                  <Clock className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-600">
                    Each bid extends auction time by 10 seconds
                  </p>
                </div>
                <div className="flex items-start text-sm">
                  <Truck className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-600">
                    Free shipping on all won items
                  </p>
                </div>
                <div className="flex items-start text-sm">
                  <Shield className="w-4 h-4 text-gray-500 mr-2 mt-0.5" />
                  <p className="text-gray-600">
                    100% authentic products with full warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Description */}
          <div className="border-t border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Product Description</h2>
            <p className="text-gray-700 mb-6">
              {auction.product.description}
            </p>
          </div>
          
          {/* Bid History */}
          <div className="border-t border-gray-100 p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Bid History</h2>
            
            {auction.bidHistory.length === 0 ? (
              <p className="text-gray-500">No bids yet. Be the first to bid!</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left bg-gray-50">
                    <tr>
                      <th className="p-3 text-sm font-medium text-gray-500">Bidder</th>
                      <th className="p-3 text-sm font-medium text-gray-500">Amount</th>
                      <th className="p-3 text-sm font-medium text-gray-500">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auction.bidHistory.slice().reverse().map((bid) => (
                      <tr key={bid.id} className="border-t border-gray-100">
                        <td className="p-3 text-sm">
                          {bid.username === authState.user?.username ? (
                            <span className="font-medium text-primary">You</span>
                          ) : (
                            bid.username
                          )}
                        </td>
                        <td className="p-3 text-sm">
                          {formatCurrency(bid.amount)}
                        </td>
                        <td className="p-3 text-sm text-gray-500">
                          {new Date(bid.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        
        {/* Similar Items */}
        {similarAuctions.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
            <div className="auction-grid">
              {similarAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};