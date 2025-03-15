import React from 'react';
import Link from 'next/link';
import CTA from '@/components/CTA';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  link: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Psychiatric Evaluation & Treatment",
    description: "Comprehensive psychiatric assessments and personalized treatment plans for a wide range of mental health conditions.",
    icon: "fa-brain",
    features: [
      "Thorough diagnostic evaluations",
      "Medication management",
      "Treatment plan development",
      "Regular follow-up appointments",
      "Coordination with other healthcare providers"
    ],
    link: "/services/psychiatric-evaluation"
  },
  {
    id: 2,
    title: "Ketamine Therapy",
    description: "Innovative ketamine treatments for treatment-resistant depression, anxiety, PTSD, and chronic pain conditions.",
    icon: "fa-pills",
    features: [
      "IV ketamine infusions",
      "Intramuscular ketamine injections",
      "Comprehensive pre-treatment assessment",
      "Monitored treatment sessions",
      "Integration support"
    ],
    link: "/services/ketamine-therapy"
  },
  {
    id: 3,
    title: "Spravato Treatment",
    description: "FDA-approved Spravato (esketamine) nasal spray for treatment-resistant depression and major depressive disorder with suicidal thoughts.",
    icon: "fa-spray-can",
    features: [
      "FDA-approved esketamine treatment",
      "In-office administration",
      "Monitoring during and after treatment",
      "Insurance coordination",
      "Ongoing support"
    ],
    link: "/services/spravato-treatment"
  },
  {
    id: 4,
    title: "Genetic & Diagnostic Testing",
    description: "Advanced genetic testing to help identify the most effective medications based on your unique genetic profile.",
    icon: "fa-dna",
    features: [
      "Pharmacogenetic testing",
      "Neurotransmitter testing",
      "Hormone level assessment",
      "Personalized medication recommendations",
      "Detailed results interpretation"
    ],
    link: "/services/genetic-testing"
  },
  {
    id: 5,
    title: "First Responder Care",
    description: "Specialized mental health services for police officers, firefighters, EMTs, and other first responders.",
    icon: "fa-shield-alt",
    features: [
      "Trauma-informed care",
      "PTSD treatment",
      "Stress management",
      "Confidential services",
      "Peer support coordination"
    ],
    link: "/services/first-responder-care"
  },
  {
    id: 6,
    title: "Veteran Mental Health Services",
    description: "Dedicated mental health care for military veterans addressing PTSD, depression, anxiety, and transition challenges.",
    icon: "fa-medal",
    features: [
      "Military trauma treatment",
      "VA coordination",
      "Reintegration support",
      "Family counseling referrals",
      "Substance use disorder treatment"
    ],
    link: "/services/veteran-services"
  },
  {
    id: 7,
    title: "Integrative Psychiatry",
    description: "A holistic approach to mental health that combines conventional psychiatry with complementary and alternative therapies.",
    icon: "fa-balance-scale",
    features: [
      "Nutritional psychiatry",
      "Supplement recommendations",
      "Lifestyle modifications",
      "Mind-body techniques",
      "Collaboration with integrative practitioners"
    ],
    link: "/services/integrative-psychiatry"
  },
  {
    id: 8,
    title: "Telehealth Services",
    description: "Convenient, secure virtual appointments for psychiatric evaluations, medication management, and follow-up care.",
    icon: "fa-video",
    features: [
      "HIPAA-compliant video platform",
      "Flexible scheduling",
      "Medication management",
      "Follow-up appointments",
      "Crisis support coordination"
    ],
    link: "/services/telehealth"
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-white/90">
              Comprehensive mental health care tailored to your unique needs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Comprehensive Mental Health Services</h2>
            <p className="text-gray-600">
              At ReThink Mental Health, we offer a wide range of services designed to address various mental health needs.
              Our integrative approach combines evidence-based psychiatric treatments with complementary therapies for optimal results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-gray-50 rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
                <div className="p-6">
                  <div className="text-blue-600 mb-4">
                    <i className={`fas ${service.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={service.link} className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                    Learn More
                    <i className="fas fa-arrow-right ml-2"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Insurance & Payment Options</h2>
            <p className="text-gray-600">
              We work with many major insurance providers and offer various payment options to make mental health care accessible.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Accepted Insurance Plans</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Blue Cross Blue Shield</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Aetna</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Cigna</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>UnitedHealthcare</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Medicare</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Medicaid</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Options</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Self-pay options</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Sliding scale fees (based on income)</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Credit cards accepted</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>HSA/FSA accounts accepted</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 mr-2"></i>
                    <span>Payment plans available</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Link href="/insurance" className="text-blue-600 hover:text-blue-800 font-medium">
                Learn more about insurance coverage and verification
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}