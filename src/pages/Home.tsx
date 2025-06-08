import React from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { Benefits } from '../components/Benefits';
import { Timeline } from '../components/Timeline';
import { Features } from '../components/Features';
import { Pricing } from '../components/Pricing';
import { Testimonials } from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Features />
        <Timeline />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
