import React from 'react';
import Link from 'next/link';

interface Resource {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const resources: Resource[] = [
  {
    id: 1,
    title: "Patient Forms",
    description: "Download and complete our intake forms before your first appointment to streamline your visit.",
    icon: "fa-file-alt",
    link: "/resources/forms"
  },
  {
    id: 2,
    title: "Educational Materials",
    description: "Access our library of articles, videos, and resources about mental health conditions and treatments.",
    icon: "fa-book-open",
    link: "/resources/education"
  },
  {
    id: 3,
    title: "Support Groups",
    description: "Find information about local and online support groups for various mental health conditions.",
    icon: "fa-users",
    link: "/resources/support-groups"
  },
  {
    id: 4,
    title: "Crisis Resources",
    description: "Immediate resources and hotlines for mental health emergencies and crisis situations.",
    icon: "fa-phone",
    link: "/resources/crisis"
  }
];

const PatientResources = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Patient Resources</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're committed to providing you with the tools and information you need for your mental health journey.
            Explore our resources designed to support your care and wellness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => (
            <div key={resource.id} className="bg-gray-50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-blue-500 mb-4">
                <i className={`fas ${resource.icon} text-3xl`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
              <p className="text-gray-600 mb-4">{resource.description}</p>
              <Link href={resource.link} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                Access Resources
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/resources" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 inline-flex items-center">
            View All Resources
            <i className="fas fa-chevron-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PatientResources;