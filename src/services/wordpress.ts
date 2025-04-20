
/**
 * Re-export from the new WordPress API structure
 * This file is kept for backward compatibility
 */

import wordpress from './wordpress/index';

export default wordpress;

// Also re-export individual functions for direct imports
export * from './wordpress/index';
