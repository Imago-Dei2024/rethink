"use client";

import React, { useState, useEffect } from 'react';

interface Testimonial {
  content: string;
  author: string;
}

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      content: "The team at ReThink Mental Health has transformed my life. Their integrative approach addressed issues that traditional therapy alone couldn't solve.",
      author: "Sarah M."
    },
    {
      content: "As a first responder, I found specialized care that truly understood my unique challenges. I'm grateful for their dedicated approach.",
      author: "Michael T."
    },
    {
      content: "The ketamine therapy program gave me hope when nothing else worked. The staff was compassionate and professional throughout my treatment.",
      author: "Jennifer K."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, currentSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="testimonials py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl font-bold text-teal-700 mb-10 text-center">
          What Our Patients Say
        </h2>

        <div
          className="testimonial-slider relative max-w-3xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="testimonial-track relative overflow-hidden h-64">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial absolute w-full transition-all duration-500 ${
                  index === currentSlide
                    ? 'opacity-100 translate-x-0'
                    : index < currentSlide
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="testimonial-content bg-white p-8 rounded-lg shadow-md mb-6 relative">
                  <p className="text-neutral-700 italic text-lg mb-4">"{testimonial.content}"</p>
                  <div className="testimonial-arrow absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                </div>
                <div className="testimonial-author text-center">
                  <p className="text-neutral-800 font-semibold">- {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonial-nav flex justify-center mt-6">
            <button
              className="prev w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center mr-4 hover:bg-teal-700 hover:text-white transition-colors"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button
              className="next w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-teal-700 hover:text-white transition-colors"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="testimonial-dots flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentSlide ? 'bg-teal-700' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;