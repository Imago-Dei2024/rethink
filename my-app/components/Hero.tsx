import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="hero relative bg-teal-700 py-20 text-white overflow-hidden">
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 pointer-events-none aurora-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-teal-800/30 to-teal-700 mix-blend-overlay"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-400 rounded-full filter blur-[100px] animate-aurora-slow"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-teal-300 rounded-full filter blur-[100px] animate-aurora-fast"></div>
          <div className="absolute top-1/4 right-1/4 w-1/2 h-1/2 bg-blue-400 rounded-full filter blur-[100px] animate-aurora-medium"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-content max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Transformative Mental Health Care</h2>
          <p className="text-xl mb-8">Integrative psychiatry and innovative treatments for lasting wellness</p>
          <div className="hero-buttons flex flex-wrap gap-4">
            <Link
              href="/contact#appointment"
              className="btn bg-orange-300 text-neutral-900 hover:bg-orange-200 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Book an Appointment
            </Link>
            <Link
              href="/services"
              className="btn border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-16 text-white opacity-10">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;