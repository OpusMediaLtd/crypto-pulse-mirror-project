
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, TrendingDown } from 'lucide-react';
import crypto from '@/services/crypto';
import { useCurrency } from '@/contexts/CurrencyContext';

const RollingTicker = () => {
  const { currency } = useCurrency();
  const { data: cryptoPrices, isLoading } = useQuery({
    queryKey: ['crypto-prices-ticker', currency],
    queryFn: () => crypto.getPrices([
      'bitcoin', 'ethereum', 'binancecoin', 'ripple', 'cardano',
      'solana', 'polkadot', 'dogecoin', 'avalanche-2', 'tron',
      'chainlink', 'polygon', 'litecoin', 'bitcoin-cash', 'stellar',
      'monero', 'cosmos', 'ethereum-classic', 'tezos', 'vechain',
      'theta-token', 'filecoin', 'aave', 'eos', 'maker',
      'algorand', 'neo', 'uniswap', 'compound-governance-token', 'dash'
    ], currency),
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="bg-primary/5 border-b py-2 overflow-hidden">
        <div className="animate-pulse flex gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Duplicate the array to create a seamless infinite scroll effect
  const duplicatedPrices = [...(cryptoPrices || []), ...(cryptoPrices || [])];

  const currencySymbol = currency === 'usd' ? '$' : '€';

  return (
    <div className="bg-primary/5 border-b py-2 overflow-hidden">
      <div className="animate-[slide_60s_linear_infinite] flex gap-8 whitespace-nowrap">
        {duplicatedPrices.map((crypto, index) => (
          <div key={`${crypto.id}-${index}`} className="flex items-center gap-2">
            <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
            <span>{currencySymbol}{crypto.current_price.toLocaleString()}</span>
            <span className={`flex items-center ${
              crypto.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {crypto.price_change_percentage_24h > 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollingTicker;
