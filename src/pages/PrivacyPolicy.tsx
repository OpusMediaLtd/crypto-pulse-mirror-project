
import React from 'react';
import Layout from '@/components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout 
      title="Privacy Policy | CryptoPulse"
      description="Privacy policy and data protection information for CryptoPulse users"
    >
      <div className="max-w-4xl mx-auto prose dark:prose-invert prose-sm sm:prose-base">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p>When you visit CryptoPulse, we may collect certain information about your device, your interaction with the site, and information necessary to process your transactions. We may also collect additional information if you contact us for support.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Cookies</h2>
          <p>We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Third-Party Services</h2>
          <p>We may share your information with third parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Data Protection</h2>
          <p>We implement security measures to maintain the safety of your personal information when you submit or access your personal information.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information. Contact us for assistance with these requests.</p>
        </section>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
