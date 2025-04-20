
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const NewsletterSignup = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup logic
  };

  return (
    <div className="bg-gray-900 text-white rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-2">Enter your email for our free Newsletter</h2>
      <p className="text-gray-400 mb-4">Get dialed in every Tuesday & Friday with quick updates on the world of crypto</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="flex-1 bg-white text-gray-900"
            required
          />
          <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
            Sign Up
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          This site is protected by reCAPTCHA and the{' '}
          <a href="https://policies.google.com/privacy" className="text-purple-400 hover:text-purple-300">
            Google Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </a>{' '}
          apply.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;
