import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CryptoCasino, CasinoListFilters } from '@/types/CryptoCasino';
import casinoService from '@/services/casinoService';
import CasinoListItem from './CasinoListItem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, SlidersHorizontal, Bitcoin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface CasinoListProps {
  limit?: number;
}

const CasinoList: React.FC<CasinoListProps> = ({ limit }) => {
  const [filters, setFilters] = useState<CasinoListFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  
  const { data: casinos, isLoading, refetch } = useQuery({
    queryKey: ['crypto-casinos', filters],
    queryFn: () => casinoService.getCryptoCasinos(filters)
  });
  
  const handleReview = async (casinoId: number, isPositive: boolean) => {
    try {
      await casinoService.submitCasinoReview(casinoId, isPositive);
      
      toast({
        title: "Review submitted",
        description: `Thank you for your ${isPositive ? 'positive' : 'negative'} review.`,
      });
      
      refetch();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit your review. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const currencyOptions = [
    { label: 'Bitcoin (BTC)', value: 'BTC' },
    { label: 'Ethereum (ETH)', value: 'ETH' },
    { label: 'Litecoin (LTC)', value: 'LTC' },
    { label: 'Dogecoin (DOGE)', value: 'DOGE' },
    { label: 'Ripple (XRP)', value: 'XRP' },
    { label: 'All Cryptocurrencies', value: '' }
  ];
  
  const ratingOptions = [
    { label: 'All Ratings', value: '0' },
    { label: '3+ Stars', value: '3' },
    { label: '4+ Stars', value: '4' },
    { label: '5 Stars Only', value: '5' }
  ];
  
  const updateCurrencyFilter = (value: string) => {
    setFilters(prev => ({
      ...prev,
      currency: value || undefined
    }));
  };
  
  const updateRatingFilter = (value: string) => {
    setFilters(prev => ({
      ...prev,
      minRating: value ? parseInt(value) : undefined
    }));
  };
  
  const displayedCasinos = limit ? casinos?.slice(0, limit) : casinos;
  
  return (
    <div className="mb-8">
      {!limit && (
        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center">
                  <Bitcoin className="mr-2 h-6 w-6 text-primary" />
                  Top Crypto Casinos
                </CardTitle>
                <CardDescription>
                  The best online casinos accepting cryptocurrency
                </CardDescription>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetch()}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          
          {showFilters && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency-filter">Filter by Cryptocurrency</Label>
                  <Select 
                    onValueChange={updateCurrencyFilter}
                    defaultValue={filters.currency || ''}
                  >
                    <SelectTrigger id="currency-filter" className="w-full">
                      <SelectValue placeholder="All Cryptocurrencies" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rating-filter">Filter by Rating</Label>
                  <Select 
                    onValueChange={updateRatingFilter}
                    defaultValue={filters.minRating?.toString() || '0'}
                  >
                    <SelectTrigger id="rating-filter" className="w-full">
                      <SelectValue placeholder="All Ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      {ratingOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, limit || 3].map(i => (
            <Card key={i} className="w-full h-48 animate-pulse bg-muted/50"></Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {displayedCasinos?.map((casino: CryptoCasino) => (
            <CasinoListItem 
              key={casino.id} 
              casino={casino} 
              onReview={handleReview}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CasinoList;
