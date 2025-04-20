
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react';
import { CryptoCasino } from '@/types/CryptoCasino';
import casinoService from '@/services/casinoService';

interface CasinoListItemProps {
  casino: CryptoCasino;
  onReview: (casinoId: number, isPositive: boolean) => void;
}

const CasinoListItem = ({ casino, onReview }: CasinoListItemProps) => {
  const handleClick = () => {
    casinoService.trackCasinoClick(casino.id);
    window.open(casino.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  // Generate a reliable fallback image for any casino
  const getFallbackImage = (casinoName: string) => {
    const formattedName = casinoName.replace(/[^\w\s]/gi, '').trim();
    return `https://placehold.co/300x300/1F2937/FFFFFF?text=${encodeURIComponent(formattedName)}`;
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-border/50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Logo & Basic Info */}
          <div className="md:col-span-3 flex flex-col items-center text-center space-y-3">
            <div className="w-28 h-28 relative flex items-center justify-center bg-muted/20 rounded-xl p-4">
              <img 
                src={casino.logo} 
                alt={`${casino.name} logo`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = getFallbackImage(casino.name);
                }}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">{casino.name}</h3>
              <div className="flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < casino.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            {casino.featured && (
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Top Pick
              </Badge>
            )}
          </div>

          {/* Casino Info */}
          <div className="md:col-span-6 space-y-4">
            <p className="text-sm text-muted-foreground">{casino.description}</p>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Accepted Cryptocurrencies</h4>
                <div className="flex flex-wrap gap-2">
                  {casino.acceptedCurrencies.map((currency) => (
                    <Badge key={currency.code} variant="outline" className="bg-accent/50">
                      {currency.icon && <span className="mr-1">{currency.icon}</span>}
                      {currency.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Welcome Bonus</h4>
                <p className="text-lg font-semibold text-primary">{casino.welcomeBonus}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <Button 
              onClick={handleClick}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 py-6"
            >
              <span className="text-base">Visit Casino</span>
              <ExternalLink className="h-5 w-5" />
            </Button>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">User Reviews</h4>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onReview(casino.id, true)}
                  className="flex-1 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  <span>{casino.review.thumbsUp}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onReview(casino.id, false)}
                  className="flex-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  <span>{casino.review.thumbsDown}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasinoListItem;
