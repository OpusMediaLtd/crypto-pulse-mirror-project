
import React from 'react';
import { Card } from '@/components/ui/card';

const StatsSection = () => {
  return (
    <div className="py-8">
      <div className="flex items-center gap-8 mb-8">
        <div className="flex-shrink-0">
          <h2 className="text-2xl font-bold">Cryptonews</h2>
          <p className="text-gray-600">in numbers</p>
        </div>
        <div className="h-12 w-1 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard
            number="2M+"
            label="Active Monthly Users Around the World"
          />
          <StatCard
            number="250+"
            label="Guides and Reviews Articles"
          />
          <StatCard
            number="8"
            label="Years on the Market"
          />
          <StatCard
            number="70"
            label="International Team Authors"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <Card className="p-4 text-center hover:shadow-lg transition-shadow">
      <div className="text-2xl font-bold text-purple-600 mb-2">{number}</div>
      <div className="text-sm text-gray-600 leading-tight">{label}</div>
    </Card>
  );
};

export default StatsSection;
