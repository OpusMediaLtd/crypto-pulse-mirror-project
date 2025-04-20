
import { WORDPRESS_API_URL } from './wordpress/config';
import { fetchWithCache } from './wordpress/utils';

// Cache duration for landing page data
const LANDING_PAGE_CACHE_TIME = 10 * 60 * 1000; // 10 minutes

export interface LandingPage {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content_before: string;
  content_after: string;
  meta_keywords: string;
  toplist_type: string | null;
  toplist_limit: number | null;
  show_ad_top: boolean;
  show_ad_bottom: boolean;
  ad_message_top: string | null;
  ad_message_bottom: string | null;
}

/**
 * Fetch a landing page by slug
 */
export const fetchLandingPage = async (slug: string): Promise<LandingPage | null> => {
  if (!slug) return null;
  
  try {
    const endpoint = `${WORDPRESS_API_URL}/landing-pages?slug=${slug}&_embed`;
    const response = await fetchWithCache(endpoint, LANDING_PAGE_CACHE_TIME);
    
    if (Array.isArray(response) && response.length > 0) {
      const page = response[0];
      
      return {
        id: page.id,
        title: page.title.rendered,
        slug: page.slug,
        excerpt: page.excerpt?.rendered || '',
        content_before: page.acf?.content_before || '',
        content_after: page.acf?.content_after || '',
        meta_keywords: page.acf?.meta_keywords || '',
        toplist_type: page.acf?.toplist_type || null,
        toplist_limit: page.acf?.toplist_limit || null,
        show_ad_top: !!page.acf?.show_ad_top,
        show_ad_bottom: !!page.acf?.show_ad_bottom,
        ad_message_top: page.acf?.ad_message_top || null,
        ad_message_bottom: page.acf?.ad_message_bottom || null
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching landing page:', error);
    return null;
  }
};

export default {
  fetchLandingPage
};
