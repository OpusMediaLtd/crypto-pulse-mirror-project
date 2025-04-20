
# WordPress Integration Guide for CryptoPulse

This guide explains how to set up your WordPress backend to work with the CryptoPulse React frontend.

## Required WordPress Plugins

1. **JWT Authentication for WP REST API** - For secure authentication
2. **Advanced Custom Fields (ACF)** - For creating custom fields on posts and custom post types
3. **Custom Post Type UI** - For creating custom post types
4. **WP REST API - Custom Endpoints** - For extending the REST API
5. **CORS Enabler** - For allowing cross-origin requests

## WordPress Configuration

### 1. Enable Pretty Permalinks

Go to Settings > Permalinks and select "Post name" as the permalink structure.

### 2. Configure CORS

Add these headers to your `.htaccess` file or server configuration:

```
# CORS Headers
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
  Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
  Header set Access-Control-Allow-Headers "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization"
  Header set Access-Control-Allow-Credentials "true"
</IfModule>
```

For Nginx, add to your server block:

```
# CORS Headers
add_header 'Access-Control-Allow-Origin' '*';
add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
add_header 'Access-Control-Allow-Headers' 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization';
add_header 'Access-Control-Allow-Credentials' 'true';
```

### 3. Create Categories and Tags

Create the following categories:
- Bitcoin
- Ethereum
- DeFi
- NFTs
- Regulation
- Trading
- Altcoins

Create relevant tags for cryptocurrency news and topics.

## Custom Post Types

### 1. Crypto Casinos

Create a custom post type "crypto_casinos" with the following settings:

- Custom Post Type Name: crypto_casinos
- Plural Label: Crypto Casinos
- Singular Label: Crypto Casino
- REST API base slug: crypto-casinos
- Supports: Title, Editor, Featured Image

#### ACF Fields for Crypto Casinos:

- **casino_rating** (Number field, 1-5)
- **welcome_bonus** (Text field)
- **affiliate_link** (URL field)
- **accepted_currencies** (Checkbox field with options: BTC, ETH, LTC, DOGE, XRP, BCH, USDT, ADA, SOL)
- **is_featured** (True/False field)
- **casino_rank** (Number field)
- **thumbs_up** (Number field, default 0)
- **thumbs_down** (Number field, default 0)

### 2. Banner Ads

Create a custom post type "banner_ads" with the following settings:

- Custom Post Type Name: banner_ads
- Plural Label: Banner Ads
- Singular Label: Banner Ad
- REST API base slug: banner-ads
- Supports: Title, Editor, Featured Image

#### ACF Fields for Banner Ads:

- **ad_link** (URL field)
- **ad_location** (Select field with options: banner, sidebar, article-inline)
- **is_active** (True/False field)
- **ad_tracking_id** (Text field, optional)

## Standard Posts Configuration

Add these ACF fields to the standard posts:

- **is_sponsored** (True/False field)
- **external_source** (Text field, optional)
- **post_importance** (Select field: normal, featured, trending)

## API Endpoints

Configure these main API endpoints:

- **Posts**: `/wp-json/wp/v2/posts`
- **Categories**: `/wp-json/wp/v2/categories`  
- **Tags**: `/wp-json/wp/v2/tags`
- **Crypto Casinos**: `/wp-json/wp/v2/crypto-casinos`
- **Banner Ads**: `/wp-json/wp/v2/banner-ads`

Always use the `_embed` parameter to include featured images, authors, and term data in the response.

## Testing the API

Test your API with these requests:

- Get all posts: `GET /wp-json/wp/v2/posts?_embed`
- Get posts by category: `GET /wp-json/wp/v2/posts?_embed&categories=1`
- Get crypto casinos: `GET /wp-json/wp/v2/crypto-casinos?_embed`
- Get banner ads: `GET /wp-json/wp/v2/banner-ads?_embed&ad_location=banner`

## Environment Variables

Set these environment variables in your React app:

```
VITE_WORDPRESS_API=https://your-wordpress-site.com/wp-json/wp/v2
```

## Authentication

For secured endpoints, add JWT authentication:

1. Request a token: `POST /wp-json/jwt-auth/v1/token` with username and password
2. Use the token in subsequent requests: `Authorization: Bearer YOUR_TOKEN`
