import React from 'react';
import Team from '@/components/Team';
import CTA from '@/components/CTA';

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-teal-700 to-teal-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Team</h1>
            <p className="text-xl text-white/90">
              Meet the dedicated professionals at ReThink Mental Health committed to your wellness journey.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      {/* Our Approach Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Our Approach to Care</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                At ReThink Mental Health, our team takes a collaborative, patient-centered approach to mental health care.
                We believe that the best outcomes are achieved when providers and patients work together as partners in
                the healing journey.
              </p>
              <p>
                Each member of our team brings unique expertise and perspectives to their work, but all share a common
                commitment to compassionate, evidence-based care. We regularly collaborate on complex cases, ensuring
                that our patients benefit from our collective knowledge and experience.
              </p>
              <p>
                Our providers stay current with the latest research and innovations in mental health care, allowing us
                to offer both traditional treatments and cutting-edge approaches like ketamine therapy and integrative
                psychiatry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
}