import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AiLoanStrategist } from './components/AiLoanStrategist';
import { CalculatorsSuite } from './components/CalculatorsSuite';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LendersSection } from './components/LendersSection';
import { LearningHubSection } from './components/LearningHubSection';
import { ContactSection } from './components/ContactSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [prefilledScenario, setPrefilledScenario] = useState('');
  const [selectedService, setSelectedService] = useState('Home Loan');
  const [strategistPurpose, setStrategistPurpose] = useState<'purchase' | 'refinance'>('purchase');

  const handleOpenBooking = () => {
    setPrefilledScenario('');
    setIsBookingModalOpen(true);
  };

  const handleOpenBookingWithScenario = (scenarioText: string) => {
    setPrefilledScenario(scenarioText);
    setIsBookingModalOpen(true);
  };

  const handleHeroIntent = (intent: 'purchase' | 'refinance') => {
    setStrategistPurpose(intent);
    const element = document.getElementById('ai-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (slug: string) => {
    const formatted = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    setSelectedService(formatted);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      {/* 3-Zone Clean Header */}
      <Header onOpenBooking={handleOpenBooking} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero with High-Contrast Scrim & Dual Pathway Gateways */}
        <Hero
          onSelectAction={handleHeroIntent}
          onOpenBooking={handleOpenBooking}
        />

        {/* 40+ Accredited Australian Lenders Trust Strip */}
        <LendersSection />

        {/* Process & Convenience Pillars (One-Step Simplicity, Rapid Response, Continual 2-Yr Care) */}
        <ProcessSection onOpenBooking={handleOpenBooking} />

        {/* THE WOW FACTOR: Blueprint AI Loan Strategist™ Copilot */}
        <AiLoanStrategist
          defaultPurpose={strategistPurpose}
          onOpenBookingWithScenario={handleOpenBookingWithScenario}
        />

        {/* Comprehensive Interactive Traditional Financial Calculators */}
        <CalculatorsSuite onOpenBooking={handleOpenBooking} />

        {/* Services & Loan Types Bento Grid */}
        <ServicesSection
          onSelectService={handleSelectService}
          onOpenBooking={handleOpenBooking}
        />

        {/* About Karina Bridges, Director & Story & 2-Year Review Guarantee */}
        <AboutSection onOpenBooking={handleOpenBooking} />

        {/* Verified Google & RateMyAgent Reviews + Video Spotlights */}
        <ReviewsSection onOpenBooking={handleOpenBooking} />

        {/* Learning Hub & Haven Magazine */}
        <LearningHubSection onOpenBooking={handleOpenBooking} />

        {/* Contact & Free Strategy Consultation Booking */}
        <ContactSection
          initialService={selectedService}
          initialMessage={prefilledScenario}
        />
      </main>

      {/* Verified Footer */}
      <Footer onOpenBooking={handleOpenBooking} />

      {/* Strategy Session Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefilledScenario={prefilledScenario}
      />
    </div>
  );
}
