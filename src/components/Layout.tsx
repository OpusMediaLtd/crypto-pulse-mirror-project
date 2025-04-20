import React from 'react';
import Header from './Header';
import RollingTicker from './RollingTicker';
import SEOHead from './SEOHead';
interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}
const Layout = ({
  children,
  title = 'Cryptocurrency News & Analysis',
  description = 'Latest cryptocurrency news, market analysis, and blockchain insights from the CryptoPulse team.',
  ogImage,
  ogType,
  canonical
}: LayoutProps) => {
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white bg-slate-950">
      <SEOHead title={title} description={description} ogImage={ogImage} ogType={ogType} canonical={canonical} />
      <Header />
      <RollingTicker />
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
      <footer className="bg-gradient-to-b from-primary to-primary/90 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About CryptoPulse</h3>
              <p className="text-gray-300">
                Your trusted source for cryptocurrency news, market analysis, and blockchain insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="/category/bitcoin" className="text-gray-300 hover:text-white">Bitcoin</a></li>
                <li><a href="/category/ethereum" className="text-gray-300 hover:text-white">Ethereum</a></li>
                <li><a href="/category/defi" className="text-gray-300 hover:text-white">DeFi</a></li>
                <li><a href="/category/nfts" className="text-gray-300 hover:text-white">NFTs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-gray-300 mb-2">Stay updated with the latest crypto news</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l text-gray-800 w-full" />
                <button className="bg-primary border border-white px-4 py-2 rounded-r hover:bg-white hover:text-primary transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© {new Date().getFullYear()} CryptoPulse. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Layout;