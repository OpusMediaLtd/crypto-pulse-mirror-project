
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <Layout 
      title="Contact Us | CryptoPulse"
      description="Get in touch with the CryptoPulse team"
    >
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
            <Input id="name" required placeholder="Your name" />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <Input id="email" type="email" required placeholder="your@email.com" />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
            <Input id="subject" required placeholder="How can we help?" />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
            <Textarea 
              id="message" 
              required 
              placeholder="Your message..."
              className="min-h-[150px]"
            />
          </div>

          <Button type="submit" className="w-full">Send Message</Button>
        </form>

        <div className="mt-12 grid gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground">support@cryptopulse.gg</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Office</h3>
            <p className="text-muted-foreground">
              Opus Media Limited<br />
              No 2 Triq Geraldu Farrugia<br />
              ZEBBUG ZBG4351<br />
              MALTA
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
