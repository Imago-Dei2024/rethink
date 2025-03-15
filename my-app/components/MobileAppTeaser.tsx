"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface AppFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const appFeatures: AppFeature[] = [
  {
    id: 1,
    title: "Appointment Management",
    description: "Schedule, reschedule, or cancel appointments directly from your phone.",
    icon: "fa-calendar-check"
  },
  {
    id: 2,
    title: "Mood Tracking",
    description: "Track your mood patterns over time to identify triggers and improvements.",
    icon: "fa-chart-line"
  },
  {
    id: 3,
    title: "Medication Reminders",
    description: "Set reminders for medications and track your adherence over time.",
    icon: "fa-pills"
  },
  {
    id: 4,
    title: "Telehealth Sessions",
    description: "Connect with your provider through secure video sessions from anywhere.",
    icon: "fa-video"
  }
];

const MobileAppTeaser = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Thanks for your interest! We\'ll notify you when our app launches.');
      setEmail('');
    }, 1500);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* App Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">ReThink Mental Wellness App</h2>
            <p className="text-white/90 mb-8">
              Coming soon to iOS and Android! Our mobile app will put mental wellness tools and resources at your fingertips,
              making it easier than ever to manage your care and track your progress.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {appFeatures.map((feature) => (
                <div key={feature.id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-blue-200 mb-3">
                    <i className={`fas ${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {submitMessage ? (
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <p>{submitMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Get Notified at Launch</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-grow px-4 py-3 rounded-md bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50 transition-colors duration-300 disabled:opacity-70"
                  >
                    {isSubmitting ? 'Submitting...' : 'Notify Me'}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* App Mockup */}
          <div className="order-first lg:order-last mb-8 lg:mb-0 flex justify-center">
            <div className="relative h-[500px] w-[250px] bg-black rounded-[40px] p-2 shadow-xl border-4 border-gray-800">
              {/* Phone frame */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-7 bg-black rounded-b-xl z-10"></div>

              {/* App screen mockup */}
              <div className="h-full w-full bg-gradient-to-br from-blue-400 to-indigo-600 rounded-[32px] overflow-hidden relative">
                {/* App UI elements */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-indigo-700 flex items-center justify-center">
                  <h3 className="text-white font-semibold">ReThink Wellness</h3>
                </div>

                <div className="absolute top-20 left-0 right-0 px-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mb-3">
                    <div className="h-4 bg-white/30 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-1/2"></div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center">
                      <div className="h-8 w-8 bg-white/30 rounded-full mb-2"></div>
                      <div className="h-3 bg-white/30 rounded w-2/3"></div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex flex-col items-center justify-center">
                      <div className="h-8 w-8 bg-white/30 rounded-full mb-2"></div>
                      <div className="h-3 bg-white/30 rounded w-2/3"></div>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                    <div className="h-4 bg-white/30 rounded w-full mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-5/6 mb-2"></div>
                    <div className="h-3 bg-white/30 rounded w-4/6"></div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-16 bg-indigo-800/80 backdrop-blur-sm flex justify-around items-center px-4">
                  <div className="h-8 w-8 bg-white/30 rounded-full"></div>
                  <div className="h-8 w-8 bg-white/30 rounded-full"></div>
                  <div className="h-8 w-8 bg-white/30 rounded-full"></div>
                  <div className="h-8 w-8 bg-white/30 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppTeaser;