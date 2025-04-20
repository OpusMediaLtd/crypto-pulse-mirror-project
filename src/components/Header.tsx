import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DollarSign, EuroIcon, TrendingUp, Menu } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Toggle } from '@/components/ui/toggle';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { currency, toggleCurrency } = useCurrency();

  return (
    <header className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 dark:border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <TrendingUp className="h-6 w-6 text-primary animate-pulse" />
            <div className="absolute -inset-1 bg-primary/10 rounded-full blur-sm animate-pulse" />
          </div>
          <Link to="/" className="text-xl font-bold text-primary hover:opacity-80 transition-opacity">
            CryptoPulse
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6">
          <div className="flex items-center glass-card rounded-lg p-1">
            <Toggle
              pressed={currency === 'usd'}
              onPressedChange={() => currency === 'eur' && toggleCurrency()}
              aria-label="Toggle to USD"
              className="flex items-center space-x-1 px-3 py-2 rounded-md data-[state=on]:bg-white data-[state=on]:shadow-sm transition-all duration-200"
            >
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">USD</span>
            </Toggle>
            <Toggle
              pressed={currency === 'eur'}
              onPressedChange={() => currency === 'usd' && toggleCurrency()}
              aria-label="Toggle to EUR"
              className="flex items-center space-x-1 px-3 py-2 rounded-md data-[state=on]:bg-white data-[state=on]:shadow-sm transition-all duration-200"
            >
              <EuroIcon className="h-4 w-4" />
              <span className="text-sm font-medium">EUR</span>
            </Toggle>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/category/bitcoin" className="story-link text-gray-600 hover:text-primary transition-colors">Bitcoin</Link>
            <Link to="/category/ethereum" className="story-link text-gray-600 hover:text-primary transition-colors">Ethereum</Link>
            <Link to="/category/defi" className="story-link text-gray-600 hover:text-primary transition-colors">DeFi</Link>
            <Link to="/category/nfts" className="story-link text-gray-600 hover:text-primary transition-colors">NFTs</Link>
            <Link to="/category/markets" className="story-link text-gray-600 hover:text-primary transition-colors">Markets</Link>
            <Button variant="outline" size="sm" className="hover-scale" asChild>
              <Link to="/category/featured">Subscribe</Link>
            </Button>
            <ThemeToggle />
          </div>
          
          {/* Mobile Theme Toggle and Menu */}
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
