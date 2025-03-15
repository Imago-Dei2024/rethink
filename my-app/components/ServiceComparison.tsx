"use client";

import React, { useState } from 'react';

interface PlanFeature {
  feature: string;
  included: boolean;
}

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const ServiceComparison: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      name: "Basic Care",
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: "Essential mental health support for individuals seeking help",
      features: [
        { feature: "Initial Assessment", included: true },
        { feature: "Weekly Therapy Sessions", included: true },
        { feature: "Progress Tracking", included: true },
        { feature: "24/7 Text Support", included: false },
        { feature: "Crisis Intervention", included: false }
      ]
    },
    {
      name: "Standard Care",
      monthlyPrice: 199,
      yearlyPrice: 1990,
      description: "Comprehensive care with additional support options",
      features: [
        { feature: "Initial Assessment", included: true },
        { feature: "Weekly Therapy Sessions", included: true },
        { feature: "Progress Tracking", included: true },
        { feature: "24/7 Text Support", included: true },
        { feature: "Crisis Intervention", included: true },
        { feature: "Specialized Treatment Plans", included: false }
      ],
      popular: true
    },
    {
      name: "Premium Care",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      description: "Complete mental health care with specialized treatments",
      features: [
        { feature: "Initial Assessment", included: true },
        { feature: "Weekly Therapy Sessions", included: true },
        { feature: "Progress Tracking", included: true },
        { feature: "24/7 Text Support", included: true },
        { feature: "Crisis Intervention", included: true },
        { feature: "Specialized Treatment Plans", included: true },
        { feature: "Medication Management", included: true },
        { feature: "Family Therapy Sessions", included: true }
      ]
    }
  ];

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    // In a real app, you might want to navigate to a checkout page or show a modal
    alert(`You've selected the ${planName} plan. In a real application, this would take you to a checkout page.`);
  };

  return (
    <section id="service-comparison" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="enhanced-section-title text-center mb-12">
          <h2 className="text-3xl font-bold text-neutral-800 mb-2">Treatment Plans</h2>
          <p className="text-neutral-600 max-w-3xl mx-auto">
            Choose the right mental health care plan for your needs
          </p>
        </div>

        <div className="service-comparison">
          <div className="billing-toggle-container flex items-center justify-center mb-10">
            <span className={`billing-toggle-label ${!isYearly ? 'text-primary font-semibold' : 'text-neutral-500'}`}>
              Monthly
            </span>

            <label className="billing-toggle mx-4 relative inline-block w-14 h-7">
              <input
                type="checkbox"
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                className="opacity-0 w-0 h-0"
              />
              <span className="billing-toggle-slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral-300 rounded-full transition-all before:absolute before:h-5 before:w-5 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"></span>
            </label>

            <span className={`billing-toggle-label ${isYearly ? 'text-primary font-semibold' : 'text-neutral-500'}`}>
              Yearly
            </span>

            <span className="yearly-discount ml-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
              Save 15%
            </span>
          </div>

          <div className="plan-cards grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`plan-card bg-white rounded-lg shadow-md p-6 border ${plan.popular ? 'border-primary relative' : 'border-neutral-200'}`}
              >
                {plan.popular && (
                  <div className="popular-badge absolute top-0 right-0 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                    Most Popular
                  </div>
                )}

                <h3 className="plan-name text-xl font-semibold text-neutral-800 mb-4">{plan.name}</h3>

                <div className={`plan-price ${isYearly ? 'hidden' : 'block'} text-3xl font-bold text-primary mb-2`}>
                  ${plan.monthlyPrice}<span className="period text-sm text-neutral-500 font-normal">/month</span>
                </div>

                <div className={`plan-price ${isYearly ? 'block' : 'hidden'} text-3xl font-bold text-primary mb-2`}>
                  ${plan.yearlyPrice}<span className="period text-sm text-neutral-500 font-normal">/year</span>
                </div>

                <p className="plan-description text-neutral-600 mb-6">{plan.description}</p>

                <ul className="plan-features space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="plan-feature flex items-center">
                      <i className={`${feature.included ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500'} mr-2`}></i>
                      <span className="text-neutral-700">{feature.feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="plan-button w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors"
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  Select Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;