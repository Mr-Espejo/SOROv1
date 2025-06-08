import React from 'react';
import { VSLHeader } from '../components/VSLHeader';
import { VideoSection } from '../components/VideoSection';
import { Benefits } from '../components/Benefits';
import { Guarantee } from '../components/Guarantee';
import { CallToAction } from '../components/CallToAction';
import { VSLFooter } from '../components/VSLFooter';

const VSLPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <VSLHeader />
      <main>
        <VideoSection />
        <Benefits />
        <Guarantee />
        <CallToAction />
      </main>
      <VSLFooter />
    </div>
  );
};

export default VSLPage;
