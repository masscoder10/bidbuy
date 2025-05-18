import { Auction, BidPackage, Product, User } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'johndoe',
  email: 'john.doe@example.com',
  bidBalance: 250,
  avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  createdAt: new Date('2023-01-15'),
};

export const mockBidPackages: BidPackage[] = [
  { 
    id: '1', 
    name: 'Starter Pack', 
    bidCount: 100, 
    price: 60,
    savings: 0,
  },
  { 
    id: '2', 
    name: 'Popular Pack', 
    bidCount: 300, 
    price: 150,
    savings: 10,
    isPopular: true,
  },
  { 
    id: '3', 
    name: 'Pro Pack', 
    bidCount: 500, 
    price: 200,
    savings: 20,
  },
  { 
    id: '4', 
    name: 'Ultimate Pack', 
    bidCount: 1000, 
    price: 350,
    savings: 30,
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apple iPhone 13 Pro',
    description: 'The latest iPhone with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion.',
    retailPrice: 999,
    imageUrl: 'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Apple',
    category: 'Electronics',
    featured: true,
  },
  {
    id: '2',
    name: 'Sony PlayStation 5',
    description: 'Next-gen gaming console with ultra-high speed SSD, ray tracing, 4K gaming, and haptic feedback.',
    retailPrice: 499,
    imageUrl: 'https://images.pexels.com/photos/12718988/pexels-photo-12718988.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Sony',
    category: 'Gaming',
    featured: true,
  },
  {
    id: '3',
    name: 'Samsung 55" QLED 4K TV',
    description: 'Quantum processor with 4K upscaling, HDR, and smart features.',
    retailPrice: 699,
    imageUrl: 'https://images.pexels.com/photos/5490289/pexels-photo-5490289.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Samsung',
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Dyson V11 Vacuum',
    description: 'Cordless vacuum with intelligent suction and up to 60 minutes of run time.',
    retailPrice: 599,
    imageUrl: 'https://images.pexels.com/photos/4108677/pexels-photo-4108677.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Dyson',
    category: 'Home',
  },
  {
    id: '5',
    name: 'Apple Watch Series 7',
    description: 'Always-on Retina display, ECG app, blood oxygen sensor, and fitness tracking.',
    retailPrice: 399,
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Apple',
    category: 'Wearables',
  },
  {
    id: '6',
    name: 'Bose QuietComfort 45',
    description: 'Wireless noise cancelling headphones with high-fidelity audio and comfortable design.',
    retailPrice: 329,
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Bose',
    category: 'Audio',
  },
  {
    id: '7',
    name: 'Nintendo Switch OLED',
    description: 'Enhanced gaming system with vibrant 7-inch OLED screen and enhanced audio.',
    retailPrice: 349,
    imageUrl: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'Nintendo',
    category: 'Gaming',
  },
  {
    id: '8',
    name: 'KitchenAid Stand Mixer',
    description: 'Professional 5-quart stand mixer with 10 speeds and tilt-head design.',
    retailPrice: 399,
    imageUrl: 'https://images.pexels.com/photos/1627818/pexels-photo-1627818.jpeg?auto=compress&cs=tinysrgb&w=600',
    brand: 'KitchenAid',
    category: 'Kitchen',
  },
];

// Generate random bids for each auction
const generateRandomBids = (auctionId: string, count: number, startTime: Date, currentPrice: number) => {
  const bids = [];
  const usernames = ['alexsmith', 'sarahj', 'mikebrown', 'emmawilson', 'davidlee', 'oliviagarcia'];
  
  let timestamp = new Date(startTime);
  let price = 0.01;
  
  for (let i = 0; i < count; i++) {
    // Add a random number of minutes (1-5) to the previous bid time
    timestamp = new Date(timestamp.getTime() + (Math.floor(Math.random() * 5) + 1) * 60000);
    price += 0.01;
    
    bids.push({
      id: `bid-${auctionId}-${i}`,
      auctionId,
      userId: `user-${i % 6}`,
      username: usernames[i % 6],
      timestamp: new Date(timestamp),
      amount: price,
    });
  }
  
  return bids;
};

// Create active auctions with random end times and bid histories
const now = new Date();
export const mockAuctions: Auction[] = mockProducts.map((product, index) => {
  // Start time between 1-48 hours ago
  const hoursAgo = Math.floor(Math.random() * 48) + 1;
  const startTime = new Date(now.getTime() - hoursAgo * 60 * 60 * 1000);
  
  // For active auctions, end time is in the future; for completed, it's in the past
  let endTime = null;
  let status: Auction['status'] = 'active';
  
  if (index % 5 === 0) {
    // Upcoming auction
    const startInHours = Math.floor(Math.random() * 24) + 1;
    const newStartTime = new Date(now.getTime() + startInHours * 60 * 60 * 1000);
    status = 'upcoming';
    return {
      id: `auction-${index + 1}`,
      product,
      startPrice: 0.01,
      currentPrice: 0.01,
      bidIncrement: 0.01,
      startTime: newStartTime,
      endTime: null,
      status,
      bidHistory: [],
    };
  } else if (index % 4 === 0) {
    // Completed auction
    const endedHoursAgo = Math.floor(Math.random() * hoursAgo);
    endTime = new Date(now.getTime() - endedHoursAgo * 60 * 60 * 1000);
    status = 'completed';
  } else {
    // Active auction with future end time
    const hoursToEnd = Math.floor(Math.random() * 12) + 1;
    endTime = new Date(now.getTime() + hoursToEnd * 60 * 60 * 1000);
  }
  
  // Generate between 5-50 bids for each auction
  const bidCount = Math.floor(Math.random() * 46) + 5;
  const currentPrice = bidCount * 0.01; // $0.01 increment per bid
  const bidHistory = generateRandomBids(`auction-${index + 1}`, bidCount, startTime, currentPrice);

  // Winner for completed auctions
  const winner = status === 'completed' ? bidHistory[bidHistory.length - 1]?.username : undefined;
  
  return {
    id: `auction-${index + 1}`,
    product,
    startPrice: 0.01,
    currentPrice,
    bidIncrement: 0.01,
    startTime,
    endTime,
    status,
    bidHistory,
    winner,
  };
});