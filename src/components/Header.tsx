
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bitcoin, TrendingUp } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">CryptoPulse</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-primary">News</a>
          <a href="#" className="text-gray-600 hover:text-primary">Markets</a>
          <a href="#" className="text-gray-600 hover:text-primary">Bitcoin</a>
          <a href="#" className="text-gray-600 hover:text-primary">NFTs</a>
        </nav>
        <Button variant="outline" className="hidden md:flex">
          Subscribe
        </Button>
      </div>
    </header>
  );
};

export default Header;
