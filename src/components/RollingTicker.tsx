import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCurrency } from '@/contexts/CurrencyContext';
import crypto from '@/services/crypto';

const RollingTicker = () => {
  const { currency } = useCurrency();
  const [scrollPosition, setScrollPosition] = useState(0);
  
  const { data: cryptoPrices, isLoading } = useQuery({
    queryKey: ['ticker-prices', currency],
    queryFn: () => crypto.getPrices([
      'bitcoin', 
      'ethereum', 
      'binancecoin', 
      'ripple', 
      'cardano', 
      'solana', 
      'polkadot', 
      'dogecoin', 
      'avalanche-2', 
      'chainlink'
    ], currency),
    refetchInterval: 60000, // Refresh every minute
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition(prev => prev + 1);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  // Fallback data for loading state
  const fallbackData = [
    { symbol: 'BTC', name: 'Bitcoin', current_price: 0, price_change_percentage_24h: 0 },
    { symbol: 'ETH', name: 'Ethereum', current_price: 0, price_change_percentage_24h: 0 },
    { symbol: 'BNB', name: 'BNB', current_price: 0, price_change_percentage_24h: 0 },
    { symbol: 'XRP', name: 'XRP', current_price: 0, price_change_percentage_24h: 0 },
    { symbol: 'ADA', name: 'Cardano', current_price: 0, price_change_percentage_24h: 0 },
    { symbol: 'SOL', name: 'Solana', current_price: 0, price_change_percentage_24h: 0 },
  ];

  const displayData = cryptoPrices || fallbackData;
  const duplicatedData = [...displayData, ...displayData]; // Duplicate for seamless scrolling

  return (
    <div className="bg-gray-900 text-white py-2 overflow-hidden">
      <div 
        className="flex whitespace-nowrap"
        style={{ 
          transform: `translateX(-${scrollPosition}px)`,
        }}
      >
        {duplicatedData.map((coin, index) => (
          <div key={`${coin.symbol}-${index}`} className="inline-flex items-center mx-4">
            <span className="font-medium">{coin.symbol.toUpperCase()}</span>
            <span className="mx-2">
              {isLoading ? (
                <span className="bg-gray-700 animate-pulse rounded h-4 w-16 inline-block"></span>
              ) : (
                <>
                  {currency === 'usd' ? '$' : '€'}
                  {coin.current_price.toLocaleString()}
                </>
              )}
            </span>
            <span 
              className={`text-xs ${
                coin.price_change_percentage_24h > 0 
                  ? 'text-green-400' 
                  : coin.price_change_percentage_24h < 0 
                    ? 'text-red-400' 
                    : 'text-gray-400'
              }`}
            >
              {isLoading ? (
                <span className="bg-gray-700 animate-pulse rounded h-3 w-10 inline-block"></span>
              ) : (
                <>
                  {coin.price_change_percentage_24h > 0 ? '+' : ''}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingTicker;
