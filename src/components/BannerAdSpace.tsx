
import React from 'react';
import { Badge } from '@/components/ui/badge';

const BETPANDA_BANNER_LINK = "https://betpanda.io/";

interface BannerAdSpaceProps {
  message: string;
}

const BannerAdSpace = ({ message }: BannerAdSpaceProps) => (
  <div
    className="w-full max-w-[444px] h-[88px] mx-auto mb-8 rounded-lg overflow-hidden cursor-pointer flex justify-between items-center px-6 bg-gradient-to-r from-primary/5 to-primary/10 dark:from-slate-800 dark:to-slate-900 border border-primary/10 shadow transition hover:shadow-md"
    style={{
      width: 444,
      height: 88,
      minHeight: 60,
    }}
    onClick={() => window.open(BETPANDA_BANNER_LINK, '_blank', 'noopener,noreferrer')}
    aria-label="Betpanda 100% Casino Bonus"
  >
    <div className="flex flex-col justify-center">
      <span className="font-semibold text-lg text-primary dark:text-white">
        Betpanda.io - #1 Crypto Casino
      </span>
      <span className="text-sm text-muted-foreground mt-1">
        100% Bonus up to 1 BTC · Regional Sponsor of Team Argentina
      </span>
    </div>
    <div className="flex flex-col items-end">
      <Badge variant="outline" className="bg-black/50 text-white border-white/20 text-xs mb-1">
        Sponsored
      </Badge>
      <span className="text-xs text-primary underline underline-offset-2 mt-1">
        Play Now
      </span>
    </div>
  </div>
);

export default BannerAdSpace;
