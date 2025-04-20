
import { WordPressPost, NewsItem } from './types';
import { formatPostDate } from './utils';

/**
 * Convert WordPress post to NewsCard/NewsItem format
 */
export const convertPostToNewsItem = (post: WordPressPost): NewsItem => {
  console.log("Converting post to news item:", post);

  const title = post.title?.rendered || "Untitled Post";
  const description = post.excerpt?.rendered || "";
  const slug = post.slug || `post-${post.id || Date.now()}`;
  const date = post.date || new Date().toISOString();

  // Get featured image URL if available
  let imageUrl = 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format';
  try {
    if (
      post._embedded &&
      post._embedded['wp:featuredmedia'] &&
      post._embedded['wp:featuredmedia'][0] &&
      post._embedded['wp:featuredmedia'][0].source_url
    ) {
      imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      console.log('Found featured image:', imageUrl);
    }
  } catch (error) {
    console.warn('Error extracting featured image:', error);
  }

  // Get category name if available
  let categoryName = 'News';
  try {
    if (
      post._embedded &&
      post._embedded['wp:term'] &&
      post._embedded['wp:term'][0] &&
      post._embedded['wp:term'][0][0] &&
      post._embedded['wp:term'][0][0].name
    ) {
      categoryName = post._embedded['wp:term'][0][0].name;
      console.log('Found category:', categoryName);
    }
  } catch (error) {
    console.warn('Error extracting category:', error);
  }

  const newsItem: NewsItem = {
    id: post.id || 0,
    title: title,
    description: description,
    image: imageUrl,
    category: categoryName,
    time: formatPostDate(date),
    slug: slug,
    author: extractAuthor(post)
  };

  console.log('Created news item:', newsItem);
  return newsItem;
};

// Separate helper for extracting author
export const extractAuthor = (post: WordPressPost): string => {
  try {
    if (
      post._embedded &&
      post._embedded.author &&
      post._embedded.author[0] &&
      post._embedded.author[0].name
    ) {
      return post._embedded.author[0].name;
    }
  } catch (error) {
    console.warn('Error extracting author:', error);
  }
  return 'CryptoPulse Staff';
};
