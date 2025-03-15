import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="service-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="service-icon mb-4">
        <i className={`${icon} text-3xl text-primary`}></i>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-neutral-800">{title}</h3>
      <p className="text-neutral-600 mb-4">{description}</p>
      <Link
        href={link}
        className="service-link text-primary hover:text-primary-dark font-medium flex items-center transition-colors"
      >
        Learn More <i className="fas fa-arrow-right ml-2"></i>
      </Link>
    </div>
  );
};

const ServicesPreview: React.FC = () => {
  const services = [
    {
      icon: "fas fa-comments",
      title: "Psychiatric Evaluation & Treatment",
      description: "Comprehensive psychiatric care for adults and children",
      link: "/services#psychiatric"
    },
    {
      icon: "fas fa-syringe",
      title: "Ketamine Therapy",
      description: "Innovative treatment for depression, anxiety, and PTSD",
      link: "/services#ketamine"
    },
    {
      icon: "fas fa-spray-can",
      title: "Spravato Treatment",
      description: "FDA-approved intranasal ketamine for treatment-resistant depression",
      link: "/services#spravato"
    },
    {
      icon: "fas fa-dna",
      title: "Genetic & Diagnostic Testing",
      description: "Personalized testing to guide your treatment plan",
      link: "/services#testing"
    }
  ];

  return (
    <section className="services-preview py-16 bg-neutral-100">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-neutral-800 mb-10 text-center">Our Services</h2>

        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>

        <div className="services-cta text-center">
          <Link
            href="/services"
            className="btn primary-btn bg-primary text-white hover:bg-primary-dark px-6 py-3 rounded-md font-medium transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;