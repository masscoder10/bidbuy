import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { mockBidPackages } from '../data/mockData';
import { Check, AlertTriangle, CreditCard, Shield, Clock } from 'lucide-react';

export const BuyBidsPage: React.FC = () => {
  const { state: authState, updateBidBalance } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(mockBidPackages[1]); // Default to the popular package
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async () => {
    if (!authState.isAuthenticated) {
      setError('Please log in to purchase bids');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user's bid balance
      const newBalance = (authState.user?.bidBalance || 0) + selectedPackage.bidCount;
      updateBidBalance(newBalance);
      
      setSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Buy Bid Packages</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Purchase bids to participate in our exciting auctions. Each bid costs only $0.60 and gives you a chance to win premium products at a fraction of the retail price.
            </p>
          </div>

          {!authState.isAuthenticated ? (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8 text-center">
              <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Please Log In</h2>
              <p className="text-gray-600 mb-6">
                You need to be logged in to purchase bid packages.
              </p>
              <div className="flex justify-center gap-4">
                <Link 
                  to="/login" 
                  className="btn btn-primary"
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-outline"
                >
                  Register
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Bid Packages */}
              <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-6">Select a Bid Package</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mockBidPackages.map((pkg) => (
                    <div 
                      key={pkg.id}
                      className={`
                        relative bg-white rounded-xl p-6 
                        ${pkg.isPopular ? 'border-2 border-accent' : 'border border-gray-200'} 
                        ${selectedPackage.id === pkg.id ? 'ring-2 ring-primary' : ''}
                        transition-shadow hover:shadow-md cursor-pointer
                      `}
                      onClick={() => setSelectedPackage(pkg)}
                    >
                      {pkg.isPopular && (
                        <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-accent text-black text-xs font-semibold px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      )}
                      
                      <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                      <div className="mb-4">
                        <p className="text-3xl font-bold text-primary">{pkg.bidCount}</p>
                        <p className="text-sm text-gray-500">bids</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-2xl font-bold">${pkg.price}</p>
                        <p className="text-sm text-gray-500">Only ${(pkg.price / pkg.bidCount).toFixed(2)} per bid</p>
                      </div>
                      
                      {pkg.savings > 0 && (
                        <p className="text-sm text-success mb-4">
                          Save {pkg.savings}% compared to Starter Pack
                        </p>
                      )}
                      
                      <div className="flex items-center justify-center">
                        <div 
                          className={`
                            w-6 h-6 rounded-full border flex items-center justify-center
                            ${selectedPackage.id === pkg.id ? 'bg-primary border-primary' : 'border-gray-300'}
                          `}
                        >
                          {selectedPackage.id === pkg.id && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Purchase Summary */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="p-6 md:p-8 col-span-2">
                    <h2 className="text-2xl font-semibold mb-6">Purchase Summary</h2>
                    
                    <div className="flex justify-between mb-4">
                      <p className="text-gray-600">{selectedPackage.bidCount} Bids</p>
                      <p className="font-medium">${selectedPackage.price}</p>
                    </div>
                    
                    {selectedPackage.savings > 0 && (
                      <div className="flex justify-between mb-4 text-success">
                        <p>Savings</p>
                        <p>${((selectedPackage.price / (100 - selectedPackage.savings)) * selectedPackage.savings).toFixed(2)}</p>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="text-xl font-bold">${selectedPackage.price}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Payment Method</h3>
                      
                      {/* Simplified payment form for demo */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center space-x-2 mb-4">
                          <CreditCard className="h-5 w-5 text-gray-500" />
                          <p className="font-medium">Credit/Debit Card</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                            <input
                              type="text"
                              className="input w-full"
                              placeholder="1234 5678 9012 3456"
                              disabled={processing || success}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">Expiry</label>
                              <input
                                type="text"
                                className="input w-full"
                                placeholder="MM/YY"
                                disabled={processing || success}
                              />
                            </div>
                            <div>
                              <label className="block text-sm text-gray-600 mb-1">CVC</label>
                              <input
                                type="text"
                                className="input w-full"
                                placeholder="123"
                                disabled={processing || success}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm text-gray-600 mb-1">Name on Card</label>
                          <input
                            type="text"
                            className="input w-full"
                            placeholder="John Doe"
                            disabled={processing || success}
                          />
                        </div>
                      </div>
                      
                      <button
                        className={`
                          btn w-full py-3
                          ${success 
                            ? 'bg-success text-white' 
                            : 'bg-primary text-white hover:bg-primary-dark'}
                          ${processing ? 'opacity-70 cursor-not-allowed' : ''}
                        `}
                        onClick={handlePurchase}
                        disabled={processing || success}
                      >
                        {processing 
                          ? <span className="flex items-center justify-center">
                              <span className="animate-spin h-5 w-5 border-b-2 border-white rounded-full mr-2"></span>
                              Processing...
                            </span>
                          : success
                            ? <span className="flex items-center justify-center">
                                <Check className="h-5 w-5 mr-2" />
                                Bids Added Successfully!
                              </span>
                            : `Pay $${selectedPackage.price}`
                        }
                      </button>
                      
                      {error && (
                        <div className="text-error text-sm mt-2">
                          {error}
                        </div>
                      )}
                      
                      <p className="text-xs text-gray-500 text-center">
                        By completing this purchase, you agree to our <Link to="/terms" className="text-primary">Terms of Service</Link>
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 md:p-8 border-t md:border-t-0 md:border-l border-gray-200">
                    <h3 className="font-semibold mb-4">Order Summary</h3>
                    
                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <p className="text-gray-600">{selectedPackage.name}</p>
                        <p className="font-medium">${selectedPackage.price}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600">Bids</p>
                        <p className="font-medium">{selectedPackage.bidCount}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mb-6">
                      <div className="flex justify-between">
                        <p className="font-semibold">Total</p>
                        <p className="font-bold">${selectedPackage.price}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Shield className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Secure payment processed over 256-bit SSL encryption
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Clock className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Bids will be added instantly to your account
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">How do bids work?</h3>
                <p className="text-gray-600">
                  Each bid costs $0.60 and allows you to place one bid in an auction. When you bid, the auction price increases by $0.01 and the timer gets extended by 10 seconds.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Do bids expire?</h3>
                <p className="text-gray-600">
                  No, your purchased bids never expire and remain in your account until you use them.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">
                  We accept major credit and debit cards, PayPal, and Apple Pay.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Do I get a refund if I don't win an auction?</h3>
                <p className="text-gray-600">
                  Bids are non-refundable once used. However, if you don't win, you may have the option to buy the item at retail price minus the value of bids you placed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};