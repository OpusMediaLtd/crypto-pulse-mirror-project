import React, { Suspense } from 'react';
import Header from './Header';
import RollingTicker from './RollingTicker';
import SEOHead from './SEOHead';
import BannerAd from './BannerAd';
import { Skeleton } from '@/components/ui/skeleton';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

const LoadingContent = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-3/4" />
    <Skeleton className="h-[200px] w-full" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Skeleton className="h-[150px]" />
      <Skeleton className="h-[150px]" />
      <Skeleton className="h-[150px]" />
    </div>
  </div>
);

const Layout = ({
  children,
  title = 'Cryptocurrency News & Analysis',
  description = 'Latest cryptocurrency news, market analysis, and blockchain insights from the CryptoPulse team.',
  ogImage,
  ogType,
  canonical
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground dark:bg-slate-950 dark:text-white">
      <SEOHead title={title} description={description} ogImage={ogImage} ogType={ogType} canonical={canonical} />
      <Header />
      <Suspense fallback={null}>
        <BannerAd />
      </Suspense>
      <Suspense fallback={null}>
        <RollingTicker />
      </Suspense>
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        <Suspense fallback={<LoadingContent />}>
          {children}
        </Suspense>
      </main>
      <footer className="bg-primary/10 dark:bg-slate-900 text-foreground dark:text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About CryptoPulse</h3>
              <p className="text-muted-foreground dark:text-gray-400">
                Your trusted source for cryptocurrency news, market analysis, and blockchain insights.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><a href="/category/bitcoin" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Bitcoin</a></li>
                <li><a href="/category/ethereum" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Ethereum</a></li>
                <li><a href="/category/defi" className="text-muted-foreground dark:text-gray-300 hover:text-primary">DeFi</a></li>
                <li><a href="/category/nfts" className="text-muted-foreground dark:text-gray-300 hover:text-primary">NFTs</a></li>
                <li><a href="/crypto-casinos" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Crypto Casinos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-muted-foreground dark:text-gray-300 hover:text-primary">About Us</a></li>
                <li><a href="/contact" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Contact</a></li>
                <li><a href="/privacy" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Privacy Policy</a></li>
                <li><a href="/terms" className="text-muted-foreground dark:text-gray-300 hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-muted-foreground dark:text-gray-400 mb-2">support@cryptopulse.gg</p>
              <p className="text-muted-foreground dark:text-gray-400">
                Opus Media Limited<br />
                No 2 Triq Geraldu Farrugia<br />
                ZEBBUG ZBG4351<br />
                MALTA
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border dark:border-slate-700 text-center text-muted-foreground dark:text-gray-400">
            <p>© {new Date().getFullYear()} CryptoPulse. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
