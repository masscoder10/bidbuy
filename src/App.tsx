import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AuctionDetailPage } from './pages/AuctionDetailPage';
import { BuyBidsPage } from './pages/BuyBidsPage';
import { AuthProvider } from './context/AuthContext';
import { AuctionProvider } from './context/AuctionContext';

function App() {
  return (
    <AuthProvider>
      <AuctionProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="auction/:id" element={<AuctionDetailPage />} />
              <Route path="buy-bids" element={<BuyBidsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Router>
      </AuctionProvider>
    </AuthProvider>
  );
}

export default App;