
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/Layout';
import CasinoList from '@/components/CasinoList/CasinoList';
import AdSpace from '@/components/AdSpace';
import { Helmet } from 'react-helmet-async';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchLandingPage } from '@/services/landingPageService';

const LandingPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { 
    data: landingPage, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['landing-page', slug],
    queryFn: () => fetchLandingPage(slug || ''),
    staleTime: 5 * 60 * 1000, // Consider landing pages fresh for 5 minutes
  });

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-24 w-full mb-8" />
          <Skeleton className="h-48 w-full mb-6" />
          <Skeleton className="h-72 w-full mb-6" />
          <Skeleton className="h-48 w-full" />
        </div>
      </Layout>
    );
  }

  if (error || !landingPage) {
    return (
      <Layout>
        <Alert variant="destructive" className="max-w-2xl mx-auto mb-8 mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Content Not Found</AlertTitle>
          <AlertDescription>
            We couldn't find the requested landing page. It might have been removed or the URL is incorrect.
            <div className="mt-4">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  return (
    <Layout
      title={landingPage.title}
      description={landingPage.excerpt}
      ogType="article"
    >
      <Helmet>
        <meta name="keywords" content={landingPage.meta_keywords || ''} />
      </Helmet>
      
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{landingPage.title}</h1>
        
        <div className="mb-8 prose max-w-none" dangerouslySetInnerHTML={{ __html: landingPage.content_before }} />
        
        {landingPage.show_ad_top && <AdSpace variant="banner" message={landingPage.ad_message_top || "Exclusive Offer"} />}
        
        {landingPage.toplist_type && (
          <CasinoList type={landingPage.toplist_type} limit={landingPage.toplist_limit} />
        )}
        
        <div className="mt-8 prose max-w-none" dangerouslySetInnerHTML={{ __html: landingPage.content_after }} />
        
        {landingPage.show_ad_bottom && <AdSpace variant="banner" message={landingPage.ad_message_bottom || "Exclusive: Special Bonus"} />}
      </div>
    </Layout>
  );
};

export default LandingPage;
