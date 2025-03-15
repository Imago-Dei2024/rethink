import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPreview: React.FC = () => {
  return (
    <section className="about-preview py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="about-grid grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="about-image">
            {/* Replace with actual image when available */}
            <div className="image-placeholder bg-neutral-200 rounded-lg h-96 flex items-center justify-center text-neutral-500">
              {/* Uncomment and use when you have an actual image */}
              {/* <Image
                src="/images/office.jpg"
                alt="ReThink Mental Health Office"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
                objectFit="cover"
              /> */}
              Office Image
            </div>
          </div>

          <div className="about-content">
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">About ReThink Mental Health</h2>
            <p className="text-neutral-600 mb-4">
              At ReThink Mental Health, we believe in a comprehensive approach to mental wellness.
              Our team of experienced professionals provides personalized care using evidence-based
              treatments and innovative therapies.
            </p>
            <p className="text-neutral-600 mb-6">
              We're committed to creating a supportive, judgment-free environment where you can find
              the help you need to thrive.
            </p>
            <Link
              href="/about"
              className="btn text-btn text-primary hover:text-primary-dark font-medium flex items-center transition-colors"
            >
              Learn More About Us <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;