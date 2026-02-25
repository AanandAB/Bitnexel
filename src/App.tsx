import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ValueProposition from './components/ValueProposition';
import KeyFeatures from './components/KeyFeatures';
import Benefits from './components/Benefits';
import PricingSection from './components/PricingSection';
import TargetAudience from './components/TargetAudience';
import SocialProof from './components/SocialProof';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import LiveVisitorCounter from './components/LiveVisitorCounter';


function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <ValueProposition />
        <KeyFeatures />
        <Benefits />
        <PricingSection />
        <TargetAudience />
        <SocialProof />
        <CTASection />
      </main>
      <Footer />
      <LiveVisitorCounter />
    </>
  );
}

function App() {
  useEffect(() => {
    document.title = 'Bitnexel - Modern Restaurant POS Solutions';
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background-page font-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
