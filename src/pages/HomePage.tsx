import React from 'react';
import { Link } from 'react-router-dom';
import { AuctionCard } from '../components/ui/AuctionCard';
import { useAuctions } from '../context/AuctionContext';
import { ArrowRight, Sparkles, Clock, DollarSign, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { featuredAuctions, auctions, isLoading } = useAuctions();
  
  // Get a few upcoming auctions
  const upcomingAuctions = auctions.filter(a => a.status === 'upcoming').slice(0, 4);
  
  // Get a few random items for "trending" section
  const trendingAuctions = auctions
    .filter(a => a.status === 'active' && a.bidHistory.length > 10)
    .slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bid, Win, Save on Premium Products
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Join thousands of smart shoppers who save up to 90% on retail prices with our exciting auction platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/auctions" 
                className="btn bg-accent text-gray-900 hover:bg-accent/90 px-6 py-3 font-semibold text-lg"
              >
                Browse Auctions
              </Link>
              <Link 
                to="/how-it-works" 
                className="btn bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 px-6 py-3 font-semibold text-lg"
              >
                How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How BidBuy Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Buy Bid Packs</h3>
              <p className="text-gray-600">
                Purchase bid packages starting from just $60. Each bid costs only $0.60 and gives you a chance to win big.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Bid in Auctions</h3>
              <p className="text-gray-600">
                Use your bids to participate in exciting auctions. Each bid increases the price by just $0.01 and resets the timer.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Win & Save</h3>
              <p className="text-gray-600">
                The last bidder when the timer hits zero wins! Pay only the final auction price plus shipping to receive your item.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link 
              to="/how-it-works" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              Learn more about how our auctions work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Featured Auctions</h2>
              <p className="text-gray-600 mt-2">Premium products with amazing savings</p>
            </div>
            <Link 
              to="/auctions" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              View all auctions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : featuredAuctions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No featured auctions available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="auction-grid">
              {featuredAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Trending Now Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-accent mr-2" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <Link 
              to="/auctions" 
              className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
            >
              View all auctions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : trendingAuctions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No trending auctions available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="auction-grid">
              {trendingAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Coming Soon</h2>
              <p className="text-gray-600 mt-2">Get ready for these upcoming auctions</p>
            </div>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : upcomingAuctions.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No upcoming auctions available right now. Check back soon!</p>
            </div>
          ) : (
            <div className="auction-grid">
              {upcomingAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-accent text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Bidding?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save big on premium products. Sign up now and get 10 free bids!
          </p>
          <Link 
            to="/register" 
            className="btn bg-primary text-white hover:bg-primary-dark px-8 py-3 font-semibold text-lg"
          >
            Sign Up & Get 10 Free Bids
          </Link>
        </div>
      </section>
    </div>
  );
};