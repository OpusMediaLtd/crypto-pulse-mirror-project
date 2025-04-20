
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package } from 'lucide-react';

interface AdSpaceProps {
  variant: 'banner' | 'sidebar' | 'article-inline';
  message?: string;
}

const AdSpace = ({ variant, message = "Advertisement Space" }: AdSpaceProps) => {
  const getAdStyles = () => {
    switch (variant) {
      case 'banner':
        return "w-full h-[250px]";
      case 'sidebar':
        return "w-full h-[600px]";
      case 'article-inline':
        return "w-full h-[180px]";
      default:
        return "w-full h-[250px]";
    }
  };

  return (
    <div className={`${getAdStyles()} bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800/50 dark:to-slate-800/80 backdrop-blur-sm border dark:border-slate-800 rounded-lg mb-8`}>
      <div className="h-full p-4 flex flex-col items-center justify-center">
        <div className="flex items-center space-x-2 mb-4">
          <Package className="h-5 w-5 text-primary dark:text-gray-400" />
          <Badge variant="outline" className="bg-background/50 dark:bg-slate-900/50">
            Sponsored
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default AdSpace;
