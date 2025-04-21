
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

// Betpanda.io banner images by variant
const BETPANDA_BANNERS = {
  // Sidebar vertical banners
  sidebar: [
    "/lovable-uploads/18e9c3aa-7497-4dc0-88ee-bad7c7c31365.png", // 160x600
    "/lovable-uploads/edc12483-469d-4fd7-ab7d-99a74d89690a.png", // 300x600
  ],
  // Inline rectangle/square for article
  "article-inline": [
    "/lovable-uploads/b8432540-8fbb-4168-9d77-2958c7024dc7.png", // 250x300 square
    "/lovable-uploads/cd0c9951-c353-4516-9b5d-1ec71ee99efa.png", // 300x300
  ],
  // Wide banners for 'banner' (home/top/bottom/inline)
  banner: [
    "/lovable-uploads/12beb42b-e4e9-4e8a-8103-66400c117af4.png", // 320x50
    "/lovable-uploads/5ae132d2-87aa-44c2-8d1a-ec684eea8ba4.png", // 320x100
    "/lovable-uploads/538faf21-ef58-434a-be66-ffe894cffa16.png", // 444x136
    "/lovable-uploads/237b0729-4945-48f7-bc32-c701474c97f1.png", // 728x90
    "/lovable-uploads/b6057d56-4dd4-4535-aca2-74348b6463bb.png", // 760x80
    "/lovable-uploads/b6057d56-4dd4-4535-aca2-74348b6463bb.png", // 760x80 backup for bigger spaces
    "/lovable-uploads/b6057d56-4dd4-4535-aca2-74348b6463bb.png", // main wide
  ],
  // Super-wide banner (for giant spaces, fallback)
  giant: [
    "/lovable-uploads/b6057d56-4dd4-4535-aca2-74348b6463bb.png", // 1920x108
  ],
};

const BETPANDA_LINK = "https://betpanda.io/";

const getBetpandaBannerAd = (location: string): BannerAd => {
  // Pick from the predefined banners for each location
  let image = "";
  if (location === "sidebar") {
    // Cycle or random between sidebar banners
    const sidebarBanners = BETPANDA_BANNERS.sidebar;
    image = sidebarBanners[Math.floor(Math.random() * sidebarBanners.length)];
  } else if (location === "article-inline") {
    const inlineBanners = BETPANDA_BANNERS["article-inline"];
    image = inlineBanners[Math.floor(Math.random() * inlineBanners.length)];
  } else if (location === "banner") {
    const bannerBanners = BETPANDA_BANNERS.banner;
    image = bannerBanners[Math.floor(Math.random() * bannerBanners.length)];
  } else {
    // Fallback to a wide banner
    const all = [
      ...BETPANDA_BANNERS.banner,
      ...BETPANDA_BANNERS.sidebar,
      ...BETPANDA_BANNERS["article-inline"],
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
    active: true
  };
};

/**
 * Always return Betpanda.io ad for all banner ad requests
 */
export const getBannerAds = async (): Promise<BannerAd[]> => {
  // Return Betpanda ad for all locations (could be expanded for different campaign logic)
  return [
    getBetpandaBannerAd("banner"),
    getBetpandaBannerAd("sidebar"),
    getBetpandaBannerAd("article-inline")
  ];
};

export const getRandomBannerAdForLocation = async (location: string): Promise<BannerAd | null> => {
  return getBetpandaBannerAd(location);
};

export const trackBannerAdClick = async (adId: number): Promise<void> => {
  // No-op for now; optionally send tracking
  console.log(`Betpanda ad clicked: ${adId}`);
};

export default {
  getBannerAds,
  getRandomBannerAdForLocation,
  trackBannerAdClick
};
