
import React from 'react';
import Layout from '@/components/Layout';
import CasinoList from '@/components/CasinoList/CasinoList';
import AdSpace from '@/components/AdSpace';
import { Helmet } from 'react-helmet-async';

const CryptoCasinos = () => {
  return (
    <Layout
      title="Top Crypto Casinos | Best Bitcoin Gambling Sites"
      description="Discover the best cryptocurrency casinos with our comprehensive list. Find top-rated Bitcoin gambling sites with exclusive bonuses and promotions."
      ogType="article"
    >
      <Helmet>
        <meta name="keywords" content="crypto casino, bitcoin gambling, cryptocurrency gambling, crypto betting, bitcoin casino" />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Best Crypto Casinos of 2025</h1>
        
        <div className="mb-8 prose max-w-none">
          <p>
            Looking for the best cryptocurrency casinos? Our expert team has reviewed and ranked the top crypto gambling 
            sites to bring you this definitive list. We've evaluated each platform based on game selection, cryptocurrency 
            options, bonuses, security, and user experience to help you find your perfect match.
          </p>
        </div>
        
        <AdSpace variant="banner" message="Exclusive Casino Bonus: 100% Match up to 5 BTC" />
        
        <CasinoList />
        
        <div className="mt-8 prose max-w-none">
          <h2>Why Gamble with Cryptocurrency?</h2>
          <p>
            Cryptocurrency gambling offers numerous advantages over traditional online casinos, including enhanced privacy, 
            lower fees, faster transactions, and often more generous bonuses. Bitcoin and other cryptocurrencies allow for 
            anonymous gaming without the need to share sensitive banking information.
          </p>
          
          <h2>How We Rate Crypto Casinos</h2>
          <p>
            Our rating system evaluates each casino across multiple criteria:
          </p>
          <ul>
            <li><strong>Game Selection:</strong> Variety of slots, table games, live dealer options, and exclusive crypto games</li>
            <li><strong>Cryptocurrency Support:</strong> Number and variety of accepted cryptocurrencies</li>
            <li><strong>Bonuses:</strong> Welcome packages, reload bonuses, free spins, and loyalty programs</li>
            <li><strong>Security:</strong> Licensing, encryption, provably fair games, and responsible gambling tools</li>
            <li><strong>User Experience:</strong> Website design, mobile compatibility, and customer support</li>
          </ul>
          
          <h2>Frequently Asked Questions</h2>
          
          <h3>Is cryptocurrency gambling legal?</h3>
          <p>
            The legality of crypto gambling depends on your jurisdiction. Many crypto casinos operate internationally 
            under offshore licenses. Always check your local laws before playing.
          </p>
          
          <h3>Which cryptocurrency is best for online gambling?</h3>
          <p>
            Bitcoin remains the most widely accepted cryptocurrency at online casinos. However, Ethereum, Litecoin, and 
            Dogecoin are also popular choices, offering various advantages in terms of transaction speed and fees.
          </p>
          
          <h3>Are crypto casinos safe?</h3>
          <p>
            Reputable crypto casinos employ strong security measures and fair gaming practices. Look for licensed platforms 
            with provably fair games and positive user reviews.
          </p>
        </div>
        
        <AdSpace variant="banner" message="Exclusive: 250 Free Spins at Top Crypto Casinos" />
      </div>
    </Layout>
  );
};

export default CryptoCasinos;
