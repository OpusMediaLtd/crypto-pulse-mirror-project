
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

// Use new uploaded banners by user (use closest fit for each slot)
// Please ensure that the file paths below match your uploads!
const BETPANDA_BANNERS = {
  // Sidebar vertical banners (tall)
  sidebar: [
    "/lovable-uploads/a99dbc20-81f3-471c-9efd-2cf6b015e736.png", // 160x600 or closest vertical
    "/lovable-uploads/68d39e31-3254-4ecf-8388-c3eab204c96d.png", // 300x600 or another tall
  ],
  // Inline rectangle/square for articles
  "article-inline": [
    "/lovable-uploads/ec312f2d-f78c-43d9-85dd-b7bcf581f854.png", // 300x250, square, or close inline
    "/lovable-uploads/0f810989-6d62-4986-b988-4d08ba8a3cdc.png", // another square or 250x300
  ],
  // Wide banners for top, bottom, inline, or home
  banner: [
    "/lovable-uploads/d150db8b-1d1a-429b-af21-1436d13e8d5e.png", // 320x100 or 728x90, e.g. main wide/top
    "/lovable-uploads/c847c2f3-454e-4d6a-a0af-f57ff5a7262c.png", // another wide format
    "/lovable-uploads/b646166d-848a-40be-8138-e79c6faaa408.png", // 444x136 or close
    "/lovable-uploads/ac34bf63-f57e-489a-81b2-5b7aa477ffef.png", // 760x80 or similar
    "/lovable-uploads/f65b37fd-105a-4b11-894a-54f72c401645.png", // another 728x90, 760x80 format
  ],
  // Super-wide/gigantic banner (fallback for biggest spaces)
  giant: [
    "/lovable-uploads/1a507e2d-45cb-4228-8377-3dba07cccc36.png", // 1920x108 or any giant/ultra-wide
  ],
};

const BETPANDA_LINK = "https://betpanda.io/";

const getBetpandaBannerAd = (location: string): BannerAd => {
  let image = "";
  if (location === "sidebar") {
    const sidebarBanners = BETPANDA_BANNERS.sidebar;
    image = sidebarBanners[Math.floor(Math.random() * sidebarBanners.length)];
  } else if (location === "article-inline") {
    const inlineBanners = BETPANDA_BANNERS["article-inline"];
    image = inlineBanners[Math.floor(Math.random() * inlineBanners.length)];
  } else if (location === "banner") {
    const bannerBanners = BETPANDA_BANNERS.banner;
    image = bannerBanners[Math.floor(Math.random() * bannerBanners.length)];
  } else if (location === "giant") {
    const giantBanners = BETPANDA_BANNERS.giant;
    image = giantBanners[Math.floor(Math.random() * giantBanners.length)];
  } else {
    // Fallback to all banners
    const all = [
      ...BETPANDA_BANNERS.banner,
      ...BETPANDA_BANNERS.sidebar,
      ...BETPANDA_BANNERS["article-inline"],
      ...BETPANDA_BANNERS.giant,
    ];
    image = all[Math.floor(Math.random() * all.length)];
  }

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
  return getBetpandaBannerAd(location);
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
