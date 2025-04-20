
import React from 'react';
import { Share, Copy, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';

interface ShareButtonsProps {
  title: string;
  url?: string;
  className?: string;
}

const ShareButtons = ({ title, url, className }: ShareButtonsProps) => {
  const shareUrl = url || window.location.href;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy link.');
    });
  };

  const openShareWindow = (baseUrl: string) => {
    const shareWindowConfig = 'width=650,height=500,toolbar=0,menubar=0,location=0';
    window.open(baseUrl, 'share', shareWindowConfig);
  };

  const shareToTwitter = () => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(shareUrl);
    openShareWindow(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`);
  };
  
  const shareToFacebook = () => {
    const encodedUrl = encodeURIComponent(shareUrl);
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`);
  };
  
  const shareToLinkedIn = () => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(shareUrl);
    openShareWindow(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800">
          <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy link</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer">
            <Twitter className="mr-2 h-4 w-4" />
            <span>Twitter</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer">
            <Facebook className="mr-2 h-4 w-4" />
            <span>Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={shareToLinkedIn} className="cursor-pointer">
            <Linkedin className="mr-2 h-4 w-4" />
            <span>LinkedIn</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ShareButtons;
