"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface InsuranceProvider {
  id: number;
  name: string;
  logo: string;
}

const insuranceProviders: InsuranceProvider[] = [
  {
    id: 1,
    name: "Blue Cross Blue Shield",
    logo: "/images/insurance/bcbs.png"
  },
  {
    id: 2,
    name: "Aetna",
    logo: "/images/insurance/aetna.png"
  },
  {
    id: 3,
    name: "Cigna",
    logo: "/images/insurance/cigna.png"
  },
  {
    id: 4,
    name: "UnitedHealthcare",
    logo: "/images/insurance/united.png"
  },
  {
    id: 5,
    name: "Medicare",
    logo: "/images/insurance/medicare.png"
  },
  {
    id: 6,
    name: "Medicaid",
    logo: "/images/insurance/medicaid.png"
  }
];

const InsuranceInfo = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    insuranceProvider: '',
    memberId: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('Processing your verification request...');

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('Your insurance verification request has been submitted. Our team will contact you within 1-2 business days with the results.');

      // Reset form after submission
      setFormData({
        name: '',
        dob: '',
        insuranceProvider: '',
        memberId: '',
        phone: '',
        email: ''
      });
    }, 2000);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Insurance Information</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            ReThink Mental Health works with many major insurance providers to make mental health care accessible.
            Verify your benefits or learn about our accepted insurance plans.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Accepted Insurance */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Accepted Insurance Plans</h3>
            <p className="text-gray-600 mb-6">
              We accept a wide range of insurance plans to ensure our services are accessible to as many patients as possible.
              If you don't see your insurance provider listed, please contact us to discuss your options.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {insuranceProviders.map((provider) => (
                <div key={provider.id} className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center justify-center">
                  {/* Placeholder for insurance logos */}
                  <div className="h-12 w-full bg-gray-200 rounded flex items-center justify-center mb-2">
                    <i className="fas fa-building text-gray-400"></i>
                  </div>
                  {/* Uncomment when actual logos are available
                  <Image
                    src={provider.logo}
                    alt={provider.name}
                    width={100}
                    height={50}
                    className="object-contain mb-2"
                  />
                  */}
                  <p className="text-sm text-center font-medium">{provider.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Verification Form */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Verify Your Benefits</h3>
            <p className="text-gray-600 mb-6">
              Complete the form below to request verification of your insurance benefits.
              Our team will check your coverage and contact you with the results.
            </p>

            {submitMessage ? (
              <div className={`p-4 rounded-lg ${isSubmitting ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                <p>{submitMessage}</p>
                {!isSubmitting && (
                  <button
                    onClick={() => setSubmitMessage('')}
                    className="mt-4 text-sm font-medium underline"
                  >
                    Submit another request
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="dob" className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="insuranceProvider" className="block text-gray-700 font-medium mb-1">Insurance Provider</label>
                    <select
                      id="insuranceProvider"
                      name="insuranceProvider"
                      value={formData.insuranceProvider}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Provider</option>
                      {insuranceProviders.map(provider => (
                        <option key={provider.id} value={provider.name}>
                          {provider.name}
                        </option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="memberId" className="block text-gray-700 font-medium mb-1">Member ID</label>
                    <input
                      type="text"
                      id="memberId"
                      name="memberId"
                      value={formData.memberId}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Verify My Benefits'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceInfo;