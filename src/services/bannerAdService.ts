
import { WORDPRESS_BANNER_ADS_ENDPOINT } from './wordpress/config';
import { fetchWithCache } from './wordpress/utils';

export interface BannerAd {
  id: number;
  title: string;
  content: string;
  link: string;
  image: string;
  location: string; // 'banner', 'sidebar', 'article-inline'
  active: boolean;
}

// Hardcoded Betpanda.io ad used for all locations
const getBetpandaBannerAd = (location: string): BannerAd => ({
  id: 9999,
  title: "Betpanda.io – #1 Crypto Casino",
  content: "Join Betpanda.io now for a top bonus and lightning-fast withdrawals. Crypto gambling never looked this good!",
  link: "https://betpanda.io/",
  image: "https://betpanda.io/cdn/images/promo-banner.jpg", // Replace with actual Betpanda banner if available
  location,
  active: true
});

/**
 * Always return Betpanda.io ad for all banner ad requests
 */
export const getBannerAds = async (): Promise<BannerAd[]> => {
  // Return Betpanda ad for all locations
  return ["banner", "sidebar", "article-inline"].map(loc => getBetpandaBannerAd(loc));
};

export const getRandomBannerAdForLocation = async (location: string): Promise<BannerAd | null> => {
  return getBetpandaBannerAd(location);
};

export const trackBannerAdClick = async (adId: number): Promise<void> => {
  // No-op tracking, or optionally send a request for custom tracking
  console.log(`Betpanda ad clicked: ${adId}`);
};

export default {
  getBannerAds,
  getRandomBannerAdForLocation,
  trackBannerAdClick
};
