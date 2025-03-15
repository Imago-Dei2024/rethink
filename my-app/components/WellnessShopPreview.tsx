"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: 'supplements' | 'tools' | 'books';
}

const products: Product[] = [
  // Supplements
  {
    id: 1,
    name: "Omega-3 Fish Oil",
    description: "High-quality omega-3 fatty acids to support brain health and reduce inflammation.",
    price: "$29.99",
    image: "/images/shop/omega3.jpg",
    category: "supplements"
  },
  {
    id: 2,
    name: "Vitamin D3 + K2",
    description: "Essential vitamins for mood regulation, immune function, and bone health.",
    price: "$24.99",
    image: "/images/shop/vitamind.jpg",
    category: "supplements"
  },
  {
    id: 3,
    name: "Magnesium Glycinate",
    description: "Highly absorbable form of magnesium to support relaxation and sleep quality.",
    price: "$19.99",
    image: "/images/shop/magnesium.jpg",
    category: "supplements"
  },

  // Wellness Tools
  {
    id: 4,
    name: "Light Therapy Lamp",
    description: "10,000 lux light therapy lamp to help regulate mood and circadian rhythms.",
    price: "$79.99",
    image: "/images/shop/lighttherapy.jpg",
    category: "tools"
  },
  {
    id: 5,
    name: "Weighted Blanket",
    description: "15lb weighted blanket to promote relaxation and improve sleep quality.",
    price: "$89.99",
    image: "/images/shop/weightedblanket.jpg",
    category: "tools"
  },
  {
    id: 6,
    name: "Meditation Cushion Set",
    description: "Comfortable cushion and mat set to support your meditation practice.",
    price: "$49.99",
    image: "/images/shop/meditation.jpg",
    category: "tools"
  },

  // Books & Resources
  {
    id: 7,
    name: "The Anxiety Toolkit",
    description: "Practical strategies for managing anxiety and building resilience.",
    price: "$18.99",
    image: "/images/shop/anxietybook.jpg",
    category: "books"
  },
  {
    id: 8,
    name: "Mindfulness Journal",
    description: "Guided journal with prompts to support daily mindfulness practice.",
    price: "$15.99",
    image: "/images/shop/journal.jpg",
    category: "books"
  },
  {
    id: 9,
    name: "Sleep Improvement Guide",
    description: "Comprehensive guide to improving sleep quality naturally.",
    price: "$16.99",
    image: "/images/shop/sleepguide.jpg",
    category: "books"
  }
];

const WellnessShopPreview = () => {
  const [activeTab, setActiveTab] = useState<'supplements' | 'tools' | 'books'>('supplements');

  const filteredProducts = products.filter(product => product.category === activeTab);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Wellness Shop</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of supplements, wellness tools, and resources to support your mental health journey.
            Available through our partnerships with Fullscript and Thorne.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm inline-flex p-1">
            <button
              onClick={() => setActiveTab('supplements')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'supplements'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Supplements
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'tools'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Wellness Tools
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === 'books'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Books & Resources
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
              <div className="relative h-48 w-full">
                {/* Placeholder for product images */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <i className={`fas ${
                    product.category === 'supplements' ? 'fa-pills' :
                    product.category === 'tools' ? 'fa-toolbox' : 'fa-book'
                  } text-gray-400 text-4xl`}></i>
                </div>
                {/* Uncomment when actual images are available
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-bold">{product.price}</span>
                  <Link href="/shop" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/shop" className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-md border border-blue-200 transition-colors duration-300 inline-flex items-center">
            Visit Full Shop
            <i className="fas fa-chevron-right ml-2"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WellnessShopPreview;