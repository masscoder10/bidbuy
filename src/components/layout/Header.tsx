import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { BidCounter } from '../ui/BidCounter';
import { Menu, X, ShoppingBag, LayoutDashboard, LogOut, LogIn, ChevronDown, Package } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-gray-900">BidBuy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/auctions" className="text-gray-600 hover:text-primary transition-colors">
              Auctions
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
              How It Works
            </Link>
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                Categories <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 top-full w-48 bg-white shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/category/electronics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Electronics
                </Link>
                <Link to="/category/home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Home & Kitchen
                </Link>
                <Link to="/category/fashion" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Fashion
                </Link>
                <Link to="/category/gaming" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                  Gaming
                </Link>
              </div>
            </div>
          </nav>

          {/* User Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {authState.isAuthenticated ? (
              <>
                <BidCounter size="sm" />
                <div className="relative group">
                  <button className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <img 
                      src={authState.user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="ml-2">{authState.user?.username}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute right-0 top-full w-48 bg-white shadow-lg rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/dashboard" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link to="/buy-bids" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                      <Package className="h-4 w-4 mr-2" />
                      Buy Bids
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <LogIn className="h-5 w-5 mr-1" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-3 space-y-3 shadow-lg">
          <Link 
            to="/" 
            className="block text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/auctions" 
            className="block text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Auctions
          </Link>
          <Link 
            to="/how-it-works" 
            className="block text-gray-600 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <div className="pt-2">
            <div className="text-sm font-medium text-gray-500 mb-2">Categories</div>
            <Link 
              to="/category/electronics" 
              className="block pl-2 py-1 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Electronics
            </Link>
            <Link 
              to="/category/home" 
              className="block pl-2 py-1 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home & Kitchen
            </Link>
            <Link 
              to="/category/fashion" 
              className="block pl-2 py-1 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fashion
            </Link>
            <Link 
              to="/category/gaming" 
              className="block pl-2 py-1 text-gray-600 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gaming
            </Link>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            {authState.isAuthenticated ? (
              <>
                <div className="flex items-center mb-3">
                  <img 
                    src={authState.user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="ml-2 font-medium">{authState.user?.username}</span>
                </div>
                <div className="mb-3">
                  <BidCounter />
                </div>
                <Link 
                  to="/dashboard" 
                  className="flex items-center py-2 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
                <Link 
                  to="/buy-bids" 
                  className="flex items-center py-2 text-gray-600 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Package className="h-5 w-5 mr-2" />
                  Buy Bids
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left py-2 text-gray-600 hover:text-primary transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center justify-center bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};