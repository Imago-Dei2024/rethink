import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="feature-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all hover:translate-y-[-5px]">
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
        <i className={`${icon} text-2xl text-white`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-primary text-center">{title}</h3>
      <p className="text-neutral-600 text-center">{description}</p>
    </div>
  );
};