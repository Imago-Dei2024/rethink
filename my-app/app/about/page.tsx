import React from 'react';
import CTA from '@/components/CTA';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About ReThink Mental Health</h1>
            <p className="text-xl text-white/90">
              Transforming mental health care through integrative approaches and compassionate service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-teal-700 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At ReThink Mental Health, our mission is to provide comprehensive, integrative mental health care that addresses the whole person—mind, body, and spirit. We believe in a personalized approach to treatment that combines evidence-based psychiatric care with complementary therapies to achieve optimal wellness.
              </p>
              <p className="text-gray-600">
                We are committed to creating a safe, supportive environment where individuals can heal, grow, and thrive. Our team of dedicated professionals works collaboratively to develop treatment plans tailored to each person's unique needs and goals.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-teal-700 mb-4">Our Core Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-orange-400 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-teal-700">Compassionate Care</h4>
                    <p className="text-gray-600">We approach each individual with empathy, respect, and genuine concern for their wellbeing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-orange-400 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-teal-700">Integrative Approach</h4>
                    <p className="text-gray-600">We combine conventional psychiatric treatments with complementary therapies for holistic healing.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-orange-400 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-teal-700">Evidence-Based Practice</h4>
                    <p className="text-gray-600">Our treatments are grounded in scientific research and clinical expertise.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-orange-400 mt-1 mr-3"></i>
                  <div>
                    <h4 className="font-semibold text-teal-700">Collaborative Partnership</h4>
                    <p className="text-gray-600">We work together with our patients as active participants in their healing journey.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                ReThink Mental Health was founded by Karen Laber, PMHNP-BC, with a vision to transform mental health care in the Denver area. After years of working in traditional psychiatric settings, Karen recognized the need for a more integrative approach that addressed not just symptoms, but the underlying factors contributing to mental health challenges.
              </p>
              <p>
                In 2018, ReThink Mental Health opened its doors with a commitment to providing personalized, comprehensive care that combines conventional psychiatric treatments with complementary therapies. Our practice has grown to include a team of dedicated professionals who share a passion for helping individuals achieve optimal mental wellness.
              </p>
              <p>
                Today, ReThink Mental Health is known for its innovative approaches to treating complex mental health conditions, including our specialized programs for first responders, veterans, and individuals with treatment-resistant depression. We continue to evolve our practice based on the latest research and best practices in integrative psychiatry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Link Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-teal-700 mb-6">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Get to know the dedicated professionals who are committed to providing exceptional mental health care at ReThink Mental Health.
          </p>
          <Link
            href="/team"
            className="btn bg-teal-700 text-white hover:bg-teal-600 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center"
          >
            View Our Team
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}