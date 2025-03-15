"use client";

import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="section bg-teal-700 text-white relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-orange-300 opacity-10 rounded-full translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-white/90 mb-8 md:text-lg">
            Take the first step toward better mental health. Schedule a consultation with one of our experienced providers today.
          </p>
          <Link
            href="/contact"
            className="btn bg-orange-300 text-neutral-900 hover:bg-orange-200 px-8 py-3 text-lg font-medium rounded-md shadow-md hover:shadow-lg transition-all"
          >
            Book Your Appointment
          </Link>
          <p className="mt-4 text-sm text-white/80">
            We accept most major insurance plans. Contact us to verify your coverage.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;