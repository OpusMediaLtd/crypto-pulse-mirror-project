
interface CryptoPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export const getPrices = async (ids: string[], currency: string = 'usd'): Promise<CryptoPrice[]> => {
  const response = await fetch(
    `${COINGECKO_API_URL}/coins/markets?vs_currency=${currency}&ids=${ids.join(',')}&order=market_cap_desc&sparkline=false`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch crypto prices');
  }
  
  return response.json();
};

export default {
  getPrices,
};
