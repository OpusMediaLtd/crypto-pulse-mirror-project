import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DollarSign, EuroIcon, TrendingUp, Menu } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Toggle } from '@/components/ui/toggle';
import ThemeToggle from './ThemeToggle';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NewsletterSignup from './NewsletterSignup';

const Header = () => {
  const { currency, toggleCurrency } = useCurrency();
  const [showSubscribe, setShowSubscribe] = useState(false);

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
          <div className="flex items-center glass-card rounded-lg p-1 dark:bg-slate-800/50">
            <Toggle
              pressed={currency === 'usd'}
              onPressedChange={() => currency === 'eur' && toggleCurrency()}
              aria-label="Toggle to USD"
              className="flex items-center space-x-1 px-3 py-2 rounded-md 
                bg-transparent 
                data-[state=on]:bg-primary/10 
                dark:data-[state=on]:bg-primary/20 
                hover:bg-primary/5 
                dark:hover:bg-primary/10 
                transition-all 
                duration-200 
                border 
                border-transparent 
                data-[state=on]:border-primary/30 
                dark:data-[state=on]:border-primary/40"
            >
              <DollarSign className="h-4 w-4 text-primary/70 group-data-[state=on]:text-primary" />
              <span className="text-sm font-medium text-muted-foreground group-data-[state=on]:text-primary">USD</span>
            </Toggle>
            <Toggle
              pressed={currency === 'eur'}
              onPressedChange={() => currency === 'usd' && toggleCurrency()}
              aria-label="Toggle to EUR"
              className="flex items-center space-x-1 px-3 py-2 rounded-md 
                bg-transparent 
                data-[state=on]:bg-primary/10 
                dark:data-[state=on]:bg-primary/20 
                hover:bg-primary/5 
                dark:hover:bg-primary/10 
                transition-all 
                duration-200 
                border 
                border-transparent 
                data-[state=on]:border-primary/30 
                dark:data-[state=on]:border-primary/40"
            >
              <EuroIcon className="h-4 w-4 text-primary/70 group-data-[state=on]:text-primary" />
              <span className="text-sm font-medium text-muted-foreground group-data-[state=on]:text-primary">EUR</span>
            </Toggle>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/category/bitcoin" className="story-link text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Bitcoin</Link>
            <Link to="/category/ethereum" className="story-link text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Ethereum</Link>
            <Link to="/category/defi" className="story-link text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">DeFi</Link>
            <Link to="/category/nfts" className="story-link text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">NFTs</Link>
            <Link to="/category/markets" className="story-link text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">Markets</Link>
            <Button variant="outline" size="sm" className="hover-scale" onClick={() => setShowSubscribe(true)}>
              Subscribe
            </Button>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center space-x-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="hover:bg-accent">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>

      <Dialog open={showSubscribe} onOpenChange={setShowSubscribe}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-center">Subscribe to Our Newsletter</DialogTitle>
          </DialogHeader>
          <NewsletterSignup />
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
