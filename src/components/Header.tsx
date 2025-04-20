
import React from 'react';
import { Button } from '@/components/ui/button';
import { DollarSign, EuroIcon, TrendingUp } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Toggle } from '@/components/ui/toggle';

const Header = () => {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">CryptoPulse</span>
        </div>
        <nav className="flex items-center space-x-6">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Toggle
              pressed={currency === 'usd'}
              onPressedChange={() => currency === 'eur' && toggleCurrency()}
              aria-label="Toggle to USD"
              className="flex items-center space-x-1 px-3 py-2 rounded-md data-[state=on]:bg-white data-[state=on]:shadow-sm"
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">USD</span>
            </Toggle>
            <Toggle
              pressed={currency === 'eur'}
              onPressedChange={() => currency === 'usd' && toggleCurrency()}
              aria-label="Toggle to EUR"
              className="flex items-center space-x-1 px-3 py-2 rounded-md data-[state=on]:bg-white data-[state=on]:shadow-sm"
            >
              <EuroIcon className="h-4 w-4" />
              <span className="text-sm font-medium">EUR</span>
            </Toggle>
          </div>
          <a href="#" className="hidden md:block text-gray-600 hover:text-primary">News</a>
          <a href="#" className="hidden md:block text-gray-600 hover:text-primary">Markets</a>
          <a href="#" className="hidden md:block text-gray-600 hover:text-primary">Bitcoin</a>
          <a href="#" className="hidden md:block text-gray-600 hover:text-primary">NFTs</a>
          <Button variant="outline" className="hidden md:flex">
            Subscribe
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
