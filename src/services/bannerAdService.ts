
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

// Cache duration for banner ads
const BANNER_ADS_CACHE_TIME = 10 * 60 * 1000; // 10 minutes

/**
 * Fetch all active banner ads
 */
export const getBannerAds = async (): Promise<BannerAd[]> => {
  try {
    console.log('Fetching banner ads from WordPress');
    const response = await fetchWithCache(
      `${WORDPRESS_BANNER_ADS_ENDPOINT}?_embed&status=publish&active=true`,
      BANNER_ADS_CACHE_TIME
    );
    
    if (Array.isArray(response) && response.length > 0) {
      return response.map(transformBannerAd);
    }
    
    console.warn('No banner ads found, using mock data');
    return getMockBannerAds();
  } catch (error) {
    console.error('Error fetching banner ads:', error);
    return getMockBannerAds();
  }
};

/**
 * Get a random banner ad for a specific location
 */
export const getRandomBannerAdForLocation = async (location: string): Promise<BannerAd | null> => {
  try {
    const allAds = await getBannerAds();
    const adsForLocation = allAds.filter(ad => ad.location === location && ad.active);
    
    if (adsForLocation.length === 0) {
      return null;
    }
    
    // Return a random ad from the filtered list
    const randomIndex = Math.floor(Math.random() * adsForLocation.length);
    return adsForLocation[randomIndex];
  } catch (error) {
    console.error('Error getting random banner ad:', error);
    return null;
  }
};

/**
 * Track banner ad click
 */
export const trackBannerAdClick = async (adId: number): Promise<void> => {
  try {
    await fetch(`${WORDPRESS_BANNER_ADS_ENDPOINT}/${adId}/track-click`, {
      method: 'POST',
    });
    console.log(`Tracked click for banner ad ID: ${adId}`);
  } catch (error) {
    console.error('Error tracking banner ad click:', error);
  }
};

/**
 * Transform WordPress banner ad response to our interface
 */
const transformBannerAd = (wpAd: any): BannerAd => {
  let imageUrl = '';
  
  try {
    if (wpAd._embedded && 
        wpAd._embedded['wp:featuredmedia'] && 
        wpAd._embedded['wp:featuredmedia'][0]) {
      imageUrl = wpAd._embedded['wp:featuredmedia'][0].source_url;
    }
  } catch (error) {
    console.warn('Error extracting banner ad image:', error);
  }
  
  return {
    id: wpAd.id,
    title: wpAd.title.rendered,
    content: wpAd.content.rendered,
    link: wpAd.acf?.ad_link || '#',
    image: imageUrl,
    location: wpAd.acf?.ad_location || 'banner',
    active: wpAd.acf?.is_active || true
  };
};

/**
 * Get mock banner ads for local development
 */
const getMockBannerAds = (): BannerAd[] => {
  return [
    {
      id: 1,
      title: "Premium Trading Tools - Special Offer",
      content: "Get 75% off Bitcoin Pro Trading Suite - Limited Time Offer",
      link: "https://example.com/special-offer",
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&auto=format",
      location: "sidebar",
      active: true
    },
    {
      id: 2,
      title: "Exclusive: 250 Free Spins at Top Crypto Casinos",
      content: "Sign up today and get 250 free spins on your first deposit",
      link: "https://example.com/free-spins",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&auto=format",
      location: "banner",
      active: true
    },
    {
      id: 3,
      title: "Discover Premium Crypto Analysis Tools",
      content: "Professional trading tools for serious crypto investors",
      link: "https://example.com/analysis-tools",
      image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?w=600&auto=format",
      location: "article-inline",
      active: true
    }
  ];
};

export default {
  getBannerAds,
  getRandomBannerAdForLocation,
  trackBannerAdClick
};
