import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface PortalFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const portalFeatures: PortalFeature[] = [
  {
    id: 1,
    title: "Appointment Management",
    description: "Schedule, reschedule, or cancel appointments with ease through our secure online portal.",
    icon: "fa-calendar-alt"
  },
  {
    id: 2,
    title: "Secure Messaging",
    description: "Communicate directly with your provider through our HIPAA-compliant messaging system.",
    icon: "fa-comments"
  },
  {
    id: 3,
    title: "Medication Refills",
    description: "Request medication refills online and receive notifications when they're ready.",
    icon: "fa-prescription-bottle-alt"
  },
  {
    id: 4,
    title: "Medical Records",
    description: "Access your treatment plans, progress notes, and other medical records securely.",
    icon: "fa-file-medical"
  }
];

const PatientPortalPreview = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Patient Portal</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our secure patient portal gives you 24/7 access to your health information and
            convenient tools to manage your care from anywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Portal Features */}
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portalFeatures.map((feature) => (
                <div key={feature.id} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-blue-500 mb-4">
                    <i className={`fas ${feature.icon} text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/portal/login" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 text-center">
                Log In to Portal
              </Link>
              <Link href="/portal/register" className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-200 transition-colors duration-300 text-center">
                Create an Account
              </Link>
            </div>
          </div>

          {/* Portal Mockup Image */}
          <div className="order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative h-[400px] w-full rounded-lg shadow-xl overflow-hidden">
              {/* Placeholder for portal mockup image */}
              <div className="absolute inset-0 bg-gray-200 flex flex-col items-center justify-center p-8">
                <i className="fas fa-laptop-medical text-gray-400 text-5xl mb-4"></i>
                <div className="w-full max-w-md">
                  <div className="h-8 bg-blue-500 rounded-t-lg"></div>
                  <div className="bg-white p-4 rounded-b-lg">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="h-12 bg-gray-200 rounded"></div>
                      <div className="h-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-24 bg-gray-200 rounded mb-3"></div>
                    <div className="h-8 bg-blue-400 rounded w-1/3"></div>
                  </div>
                </div>
                <p className="text-gray-500 mt-4 text-center">Patient Portal Interface</p>
              </div>

              {/* Uncomment when actual mockup image is available
              <Image
                src="/images/portal-mockup.jpg"
                alt="ReThink Mental Health Patient Portal"
                fill
                className="object-cover"
              />
              */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientPortalPreview;