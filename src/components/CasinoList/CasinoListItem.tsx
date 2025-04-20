
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

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${casino.featured ? 'border-primary/30 bg-primary/5' : ''}`}>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Logo & Casino Info */}
          <div className="md:col-span-3 p-6 flex flex-col items-center justify-center bg-muted/20">
            <div className="w-24 h-24 mb-3 relative flex items-center justify-center">
              <img 
                src={casino.logo} 
                alt={`${casino.name} logo`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/F7FAFC/BEBED4?text=Casino';
                }}
              />
            </div>
            <h3 className="text-lg font-bold text-center">{casino.name}</h3>
            
            {/* Rating Stars */}
            <div className="flex mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-4 w-4 ${i < casino.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            
            {casino.featured && (
              <Badge variant="outline" className="mt-2 bg-primary/10 text-primary border-primary/20">
                Top Pick
              </Badge>
            )}
          </div>
          
          {/* Casino Description & Features */}
          <div className="md:col-span-6 p-6">
            <p className="text-sm text-muted-foreground mb-4">{casino.description}</p>
            
            {/* Accepted Cryptocurrencies */}
            <div className="mb-4">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Accepted Cryptocurrencies</h4>
              <div className="flex flex-wrap gap-2">
                {casino.acceptedCurrencies.map((currency) => (
                  <Badge key={currency.code} variant="secondary" className="bg-muted/30">
                    {currency.icon && <span className="mr-1">{currency.icon}</span>}
                    {currency.name}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Welcome Bonus */}
            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Welcome Bonus</h4>
              <p className="text-sm font-semibold text-primary">{casino.welcomeBonus}</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="md:col-span-3 p-6 flex flex-col items-center justify-center bg-muted/10">
            <Button className="w-full mb-4" onClick={handleClick}>
              Visit Casino
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            
            {/* Review */}
            <div className="w-full">
              <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 text-center">User Reviews</h4>
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 mr-2"
                  onClick={() => onReview(casino.id, true)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  <span>{casino.review.thumbsUp}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1"
                  onClick={() => onReview(casino.id, false)}
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
