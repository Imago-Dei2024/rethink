import React from 'react';
import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100 flex flex-col">
      <div className="mb-4 bg-teal-50 p-3 rounded-full w-14 h-14 flex items-center justify-center text-teal-700">
        <i className={`${icon} text-2xl text-teal-700`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-teal-700">{title}</h3>
      <p className="text-neutral-600 text-center">{description}</p>
      <div className="mt-auto pt-4">
        <Link
          href={link}
          className="inline-flex items-center text-teal-700 hover:text-orange-500 font-medium"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: "fas fa-brain",
      title: "Integrative Psychiatry",
      description: "Comprehensive mental health care combining traditional and innovative approaches",
      link: "/integrative-psychiatry"
    },
    {
      icon: "fas fa-user-md",
      title: "Specialized Care",
      description: "Dedicated services for First Responders, Healthcare Workers, and Military",
      link: "/specialized-care"
    },
    {
      icon: "fas fa-pills",
      title: "Ketamine & Spravato",
      description: "REMS certified center for advanced treatment options",
      link: "/ketamine-spravato"
    },
    {
      icon: "fas fa-heartbeat",
      title: "Wellness Focus",
      description: "Nutrition counseling and micronutrient therapies for whole-person health",
      link: "/wellness-focus"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-teal-700">Our Comprehensive Mental Health Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide evidence-based treatment solutions tailored to your unique needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              link={feature.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;