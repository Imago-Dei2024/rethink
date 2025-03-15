"use client";

import React, { useEffect, useState, useRef } from 'react';

interface StatisticCardProps {
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ icon, value, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!countRef.current) return;

    observerRef.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        animateCount();
        observerRef.current?.disconnect();
      }
    }, { threshold: 0.1 });

    observerRef.current.observe(countRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const animateCount = () => {
    const duration = 2000; // 2 seconds
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(value * progress);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(value);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
  };

  return (
    <div className="statistic-card bg-white p-6 rounded-lg shadow-md text-center">
      <div className="statistic-icon mb-4">
        <i className={`${icon} text-3xl text-teal-700`}></i>
      </div>
      <div className="statistic-value text-4xl font-bold text-gray-800 mb-2">
        <span ref={countRef}>{count}</span>{suffix}
      </div>
      <div className="statistic-label text-gray-600">{label}</div>
    </div>
  );
};

const Statistics: React.FC = () => {
  const stats = [
    {
      icon: "fas fa-users",
      value: 5000,
      label: "Clients Served",
      suffix: "+"
    },
    {
      icon: "fas fa-brain",
      value: 96,
      label: "Success Rate",
      suffix: "%"
    },
    {
      icon: "fas fa-heart",
      value: 24,
      label: "Years of Service",
      suffix: ""
    },
    {
      icon: "fas fa-award",
      value: 12,
      label: "Certified Therapists",
      suffix: ""
    }
  ];

  return (
    <section id="statistics-section" className="statistics-section py-16 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="enhanced-section-title text-center mb-12">
          <h2 className="text-3xl font-bold text-teal-700 mb-2">Our Impact</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're committed to improving mental health outcomes through compassionate care and evidence-based approaches.
          </p>
        </div>

        <div className="statistics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatisticCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;