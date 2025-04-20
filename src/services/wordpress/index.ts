
/**
 * WordPress API service index
 * This service handles fetching data from a WordPress backend via the REST API
 */

import { WORDPRESS_API_URL } from './config';
import { getPosts, getPostBySlug, convertPostToNewsItem } from './posts';
import { getCategories } from './categories';

export { getPosts, getPostBySlug, getCategories, convertPostToNewsItem };

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  convertPostToNewsItem,
  WORDPRESS_API_URL
};
