import React from 'react';
import Link from 'next/link';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute w-full h-full object-cover"
      >
        <source src="/4K-Adobe.mov" type="video/quicktime" />
        <source src="/4K-Adobe.mov" type="video/mov" />
        <source src="/4K-Adobe.mov" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">
            Welcome to Rethink Mental Health
          </h1>
          <div className="flex justify-center gap-4">
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
    </section>
  );
};

export default Hero;