
import React from 'react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { TrendingUp, EuroIcon, DollarSign } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

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
          <Toggle 
            pressed={currency === 'eur'} 
            onPressedChange={() => toggleCurrency()}
            aria-label="Toggle currency"
            className="data-[state=on]:bg-primary"
          >
            {currency === 'usd' ? (
              <DollarSign className="h-4 w-4" />
            ) : (
              <EuroIcon className="h-4 w-4" />
            )}
          </Toggle>
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
