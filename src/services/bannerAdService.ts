
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

const BETPANDA_BANNERS = {
  sidebar: [
    "/lovable-uploads/595a2250-2aed-4929-845f-0b1e66ebe4b0.png",
  ],
  "article-inline": [
    "/lovable-uploads/ec312f2d-f78c-43d9-85dd-b7bcf581f854.png",
    "/lovable-uploads/0f810989-6d62-4986-b988-4d08ba8a3cdc.png",
  ],
  banner: [
    "/lovable-uploads/b3aed9bf-1a43-44f3-a74b-05f48e5fb0d1.png",
  ],
  giant: [
    "/lovable-uploads/1a507e2d-45cb-4228-8377-3dba07cccc36.png",
  ],
};

const BETPANDA_LINK = "https://betpanda.io/";

const getBetpandaBannerAd = (location: string): BannerAd => {
  let image = "";
  if (location === "sidebar") {
    image = BETPANDA_BANNERS.sidebar[0];
  } else if (location === "article-inline") {
    const inlineBanners = BETPANDA_BANNERS["article-inline"];
    image = inlineBanners[Math.floor(Math.random() * inlineBanners.length)];
  } else if (location === "banner") {
    image = BETPANDA_BANNERS.banner[0];
  } else if (location === "giant") {
    const giantBanners = BETPANDA_BANNERS.giant;
    image = giantBanners[Math.floor(Math.random() * giantBanners.length)];
  } else {
    const all = [
      ...BETPANDA_BANNERS.banner,
      ...BETPANDA_BANNERS.sidebar,
      ...BETPANDA_BANNERS["article-inline"],
      ...BETPANDA_BANNERS.giant,
    ];
    image = all[Math.floor(Math.random() * all.length)];
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
