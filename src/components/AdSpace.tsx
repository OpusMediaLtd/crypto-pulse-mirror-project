
import React from 'react';
import BannerAdSpace from './BannerAdSpace';
import SidebarAdSpace from './SidebarAdSpace';
import ArticleInlineAdSpace from './ArticleInlineAdSpace';

interface AdSpaceProps {
  variant: 'banner' | 'sidebar' | 'article-inline';
  message?: string;
}

const AdSpace = ({ variant, message = "Advertisement Space" }: AdSpaceProps) => {
  if (variant === "banner") {
    return <BannerAdSpace message={message} />;
  }
  if (variant === "sidebar") {
    return <SidebarAdSpace message={message} />;
  }
  if (variant === "article-inline") {
    return <ArticleInlineAdSpace message={message} />;
  }
  return null;
};

export default AdSpace;
