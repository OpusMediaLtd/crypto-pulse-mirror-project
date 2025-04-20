
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout 
      title="About Us | CryptoPulse"
      description="Learn more about CryptoPulse and our mission in the cryptocurrency space"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">About CryptoPulse</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            At CryptoPulse, we're dedicated to providing accurate, timely, and insightful cryptocurrency news and analysis. Our mission is to help both newcomers and experienced traders navigate the complex world of digital assets with confidence.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">What Sets Us Apart</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-lg font-semibold mb-2">Expert Analysis</h3>
              <p className="text-muted-foreground">Our team of experienced analysts and writers provide deep insights into market trends and developments.</p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-lg font-semibold mb-2">Real-Time Updates</h3>
              <p className="text-muted-foreground">Stay informed with our 24/7 coverage of breaking news and market movements.</p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-lg font-semibold mb-2">Educational Content</h3>
              <p className="text-muted-foreground">We believe in empowering our readers with knowledge through comprehensive guides and tutorials.</p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="text-lg font-semibold mb-2">Community Focus</h3>
              <p className="text-muted-foreground">Join our growing community of crypto enthusiasts and participate in meaningful discussions.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our diverse team brings together expertise from finance, technology, and journalism. With backgrounds in blockchain development, traditional finance, and digital media, we provide well-rounded coverage of the cryptocurrency ecosystem.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default About;
