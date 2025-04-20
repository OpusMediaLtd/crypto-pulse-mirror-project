
import React from 'react';
import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  text: string;
  wordsPerMinute?: number;
  className?: string;
}

const ReadingTime = ({ text, wordsPerMinute = 200, className = '' }: ReadingTimeProps) => {
  const calculateReadingTime = (content: string): number => {
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return Math.max(1, minutes); // Minimum 1 minute reading time
  };

  const minutes = calculateReadingTime(text);

  return (
    <div className={`flex items-center text-xs text-gray-500 ${className}`}>
      <Clock className="h-3 w-3 mr-1" />
      <span>{minutes} min read</span>
    </div>
  );
};

export default ReadingTime;
