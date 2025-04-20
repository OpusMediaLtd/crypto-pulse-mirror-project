
import React from 'react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';

const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '41,235.67', change: '+2.5%', trending: true },
  { name: 'Ethereum', symbol: 'ETH', price: '2,890.14', change: '-0.8%', trending: false },
  { name: 'Binance', symbol: 'BNB', price: '312.45', change: '+1.2%', trending: true },
  { name: 'Cardano', symbol: 'ADA', price: '0.512', change: '-1.5%', trending: false },
];

const PriceTicker = () => {
  return (
    <div className="w-full bg-primary/5 py-2 border-y">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide">
          {cryptoData.map((crypto) => (
            <div key={crypto.symbol} className="flex items-center space-x-2 whitespace-nowrap">
              <Bitcoin className="h-5 w-5 text-primary" />
              <span className="font-semibold">{crypto.symbol}</span>
              <span>${crypto.price}</span>
              <span className={`flex items-center ${crypto.trending ? 'text-green-500' : 'text-red-500'}`}>
                {crypto.trending ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {crypto.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
