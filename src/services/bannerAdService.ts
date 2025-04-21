import { WORDPRESS_BANNER_ADS_ENDPOINT } from './wordpress/config';
import { fetchWithCache } from './wordpress/utils';

export interface BannerAd {
  id: number;
  title: string;
  content: string;
  link: string;
  image: string;
  location: string;
  active: boolean;
}

// Use the latest uploaded horizontal banner image for banner locations
const HORIZONTAL_BANNER = "/lovable-uploads/e3f44304-f45d-4e28-993f-6909bfd52efe.png";

// Keep existing sidebar image
const SIDEBAR_BANNER = "/lovable-uploads/595a2250-2aed-4929-845f-0b1e66ebe4b0.png";

// Use the horizontal banner for article-inline ads as well
const ARTICLE_INLINE_BANNERS = [
  HORIZONTAL_BANNER,
];

// Use horizontal banner for giant spaces too
const GIANT_BANNERS = [
  HORIZONTAL_BANNER,
];

const BETPANDA_LINK = "https://betpanda.io/";

const getBetpandaBannerAd = (location: string): BannerAd => {
  console.log(`Getting Betpanda banner ad for location: ${location}`);
  
  let image = "";
  
  if (location === "sidebar") {
    image = SIDEBAR_BANNER;
    console.log(`Using sidebar banner: ${image}`);
  } else if (location === "article-inline") {
    image = ARTICLE_INLINE_BANNERS[0];
    console.log(`Using article-inline banner: ${image}`);
  } else if (location === "banner") {
    image = HORIZONTAL_BANNER;
    console.log(`Using horizontal banner: ${image}`);
  } else if (location === "giant") {
    image = GIANT_BANNERS[0];
    console.log(`Using giant banner: ${image}`);
  } else {
    // For any other location, default to the horizontal banner
    image = HORIZONTAL_BANNER;
    console.log(`Using default banner for ${location}: ${image}`);
  }

  // Always set an active state to true to ensure visibility
  return {
    id: 9999,
    title: "Betpanda.io – #1 Crypto Casino",
    content: "Join Betpanda.io now for a top bonus and lightning-fast withdrawals. Crypto gambling never looked this good!",
    link: BETPANDA_LINK,
    image,
    location,
    active: true,
  };
};

/**
 * Get all banner ads
 */
export const getBannerAds = async (): Promise<BannerAd[]> => {
  // Return Betpanda ad for all main locations
  return [
    getBetpandaBannerAd("banner"),
    getBetpandaBannerAd("sidebar"),
    getBetpandaBannerAd("article-inline"),
    getBetpandaBannerAd("giant"),
  ];
};

/**
 * Get a random banner ad for a specific location
 */
export const getRandomBannerAdForLocation = async (location: string): Promise<BannerAd | null> => {
  // Always return a Betpanda ad
  console.log(`Getting banner ad for location: ${location}`);
  const bannerAd = getBetpandaBannerAd(location);
  console.log(`Banner ad returned:`, bannerAd);
  return bannerAd;
};

export const trackBannerAdClick = async (adId: number): Promise<void> => {
  // No-op for now; optionally send tracking
  console.log(`Betpanda ad clicked: ${adId}`);
};

export default {
  getBannerAds,
  getRandomBannerAdForLocation,
  trackBannerAdClick,
};
