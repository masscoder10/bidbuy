import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, Shield, CreditCard, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center mb-4">
              <ShoppingBag className="h-6 w-6 text-accent mr-2" />
              <span className="text-xl font-bold text-white">BidBuy</span>
            </Link>
            <p className="mb-4 text-sm text-gray-400">
              BidBuy offers a unique and exciting way to purchase high-quality products at a fraction of the retail price.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/auctions" className="text-gray-400 hover:text-accent transition-colors">All Auctions</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-accent transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/buy-bids" className="text-gray-400 hover:text-accent transition-colors">Buy Bids</Link>
              </li>
              <li>
                <Link to="/winners" className="text-gray-400 hover:text-accent transition-colors">Recent Winners</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-accent transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-accent transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-accent transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/refund" className="text-gray-400 hover:text-accent transition-colors">Refund Policy</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">We Promise</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="h-5 w-5 text-accent mr-2 mt-0.5" />
                <span className="text-sm text-gray-400">100% secure payments</span>
              </li>
              <li className="flex items-start">
                <CreditCard className="h-5 w-5 text-accent mr-2 mt-0.5" />
                <span className="text-sm text-gray-400">Multiple payment methods</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-accent mr-2 mt-0.5" />
                <span className="text-sm text-gray-400">24/7 customer support</span>
              </li>
            </ul>
            <div className="mt-4">
              <img 
                src="https://images.pexels.com/photos/6893361/pexels-photo-6893361.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Payment Methods" 
                className="h-8"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} BidBuy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};