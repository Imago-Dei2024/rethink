"use client";

import React, { useState } from 'react';
import CTA from '@/components/CTA';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    // General Questions
    {
      question: "What services does ReThink Mental Health offer?",
      answer: "ReThink Mental Health offers a comprehensive range of mental health services including psychiatric evaluations, medication management, ketamine therapy, Spravato treatment, genetic testing, specialized care for first responders and veterans, and integrative psychiatry approaches.",
      category: "general"
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept many major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. We also offer self-pay options and can provide superbills for out-of-network reimbursement. Please contact our office for verification of your specific insurance coverage.",
      category: "general"
    },
    {
      question: "How do I schedule an appointment?",
      answer: "You can schedule an appointment by calling our office at (303) 406-0784, using our online scheduling system through the patient portal, or by filling out the contact form on our website. New patients will need to complete initial paperwork before their first appointment.",
      category: "general"
    },

    // Treatment Questions
    {
      question: "What is ketamine therapy and how does it work?",
      answer: "Ketamine therapy is an innovative treatment for treatment-resistant depression, anxiety, PTSD, and chronic pain conditions. Ketamine works by blocking NMDA receptors in the brain and promoting the growth of new neural connections, which can rapidly reduce symptoms. We offer both IV ketamine infusions and intramuscular ketamine injections, administered in a safe, monitored environment by our trained medical professionals.",
      category: "treatment"
    },
    {
      question: "What is the difference between ketamine therapy and Spravato?",
      answer: "While both treatments involve ketamine, they differ in administration and approval status. Ketamine therapy typically uses IV or IM administration of racemic ketamine. Spravato (esketamine) is an FDA-approved nasal spray specifically for treatment-resistant depression and major depressive disorder with suicidal thoughts. Spravato contains only the S-enantiomer of ketamine and is administered in-office with monitoring before and after treatment.",
      category: "treatment"
    },
    {
      question: "How long does it take to see results from psychiatric medications?",
      answer: "The timeline for medication effectiveness varies widely depending on the medication and individual factors. Some medications may begin to show initial effects within days, while others may take 4-6 weeks to reach full therapeutic effect. During the initial treatment phase, we monitor patients closely and may adjust medications as needed to find the optimal treatment regimen.",
      category: "treatment"
    },

    // First Visit Questions
    {
      question: "What should I expect during my first appointment?",
      answer: "Your first appointment will typically last 60-90 minutes and include a comprehensive assessment of your symptoms, medical history, and treatment goals. Our provider will discuss treatment options with you and develop an initial treatment plan. Please arrive 15 minutes early to complete any remaining paperwork, and bring your insurance card, identification, a list of current medications, and any relevant medical records if available.",
      category: "first-visit"
    },
    {
      question: "What should I bring to my first appointment?",
      answer: "Please bring your insurance card, photo ID, a list of all current medications and dosages (including supplements), any relevant medical records or previous psychiatric evaluations, and completed new patient forms if you received them in advance. If you've had genetic testing done previously, bringing those results can also be helpful.",
      category: "first-visit"
    },
    {
      question: "Do you offer telehealth appointments?",
      answer: "Yes, we offer secure telehealth appointments for many of our services, including initial consultations, medication management, and follow-up visits. Telehealth provides convenient access to care from the comfort of your home. However, some services like ketamine therapy and Spravato treatment require in-person visits. Our team can help determine if telehealth is appropriate for your specific needs.",
      category: "first-visit"
    }
  ];

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-white/90">
              Find answers to common questions about our services, treatments, and processes.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Category Tabs */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center mb-8">
              <div className="bg-[#e8f0f8] rounded-lg shadow-sm inline-flex p-1">
                <button
                  onClick={() => setActiveCategory('general')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeCategory === 'general'
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-[#d6e6f5]'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setActiveCategory('treatment')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeCategory === 'treatment'
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-[#d6e6f5]'
                  }`}
                >
                  Treatments
                </button>
                <button
                  onClick={() => setActiveCategory('first-visit')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    activeCategory === 'first-visit'
                      ? 'bg-primary text-white'
                      : 'text-neutral-700 hover:bg-[#d6e6f5]'
                  }`}
                >
                  First Visit
                </button>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="border border-neutral-200 rounded-lg overflow-hidden shadow-sm">
                  <button
                    className="w-full px-6 py-4 text-left bg-white hover:bg-[#f3f8fd] flex justify-between items-center focus:outline-none"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-semibold text-primary">{faq.question}</h3>
                    <span className="text-primary">
                      <svg
                        className={`h-5 w-5 transform transition-transform duration-200 ${openFAQ === index ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`px-6 overflow-hidden transition-all duration-300 ${
                      openFAQ === index ? 'py-4 max-h-96' : 'max-h-0 py-0'
                    }`}
                  >
                    <p className="text-neutral-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="max-w-3xl mx-auto mt-16 text-center bg-[#e8f1f3] p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-secondary mb-4">Still Have Questions?</h2>
            <p className="text-neutral-700 mb-8">
              If you couldn't find the answer to your question, feel free to contact us directly.
              Our team is here to help and provide the information you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:(303)406-0784" className="btn btn-primary py-3 px-6 rounded-md inline-flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </a>
              <a href="/contact" className="btn btn-outline py-3 px-6 rounded-md inline-flex items-center justify-center">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Form
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  );
};

export default FAQPage;