import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, ExternalLink } from 'lucide-react';
import CasinoList from '@/components/CasinoList/CasinoList';

const TopCasinosCard = () => {
  return (
    <div className="my-8">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-primary mr-3" />
            <CardTitle>Top Crypto Casinos 2025</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-4">
            <p className="text-muted-foreground">
              Explore our handpicked selection of the best cryptocurrency gambling platforms, featuring exclusive bonuses and secure gaming options.
            </p>
            <div className="mt-4">
              <Link to="/crypto-casinos">
                <Button variant="default" size="default" className="w-auto">
                  <span>View Full Rankings</span>
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <CasinoList limit={3} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCasinosCard;
