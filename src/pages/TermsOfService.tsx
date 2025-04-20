
import React from 'react';
import Layout from '@/components/Layout';

const TermsOfService = () => {
  return (
    <Layout 
      title="Terms of Service | CryptoPulse"
      description="Terms and conditions for using CryptoPulse services"
    >
      <div className="max-w-4xl mx-auto prose dark:prose-invert prose-sm sm:prose-base">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Agreement to Terms</h2>
          <p>By accessing and using CryptoPulse, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
          <p>Permission is granted to temporarily access the materials (information or software) on CryptoPulse for personal, non-commercial viewing only.</p>
          <p className="mt-4">This license shall automatically terminate if you violate any of these restrictions and may be terminated by CryptoPulse at any time.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
          <p>The materials on CryptoPulse are provided on an 'as is' basis. CryptoPulse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
          <p>In no event shall CryptoPulse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CryptoPulse.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Accuracy of Materials</h2>
          <p>The materials appearing on CryptoPulse could include technical, typographical, or photographic errors. CryptoPulse does not warrant that any of the materials on its website are accurate, complete, or current.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Links</h2>
          <p>CryptoPulse has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by CryptoPulse of the site.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
          <p>CryptoPulse may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        </section>
      </div>
    </Layout>
  );
};

export default TermsOfService;
