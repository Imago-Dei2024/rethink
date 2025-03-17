"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FadeIn } from '@/components/ui/page-transition';
import CTA from '@/components/CTA';
import Link from 'next/link';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { ParallaxSection } from '@/components/ui/parallax-section';
import { PageTransitions } from '@/components/ui/page-transitions';
import { Lightbulb, Heart, Star, Target, Compass, Shield } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { transitions } from '@/lib/utils';
import Image from 'next/image';
import { HorizontalTimelineSlider } from '@/components/ui/horizontal-timeline-slider';

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasAttemptedPlay, setHasAttemptedPlay] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const handleError = (e: any) => {
    console.error('Video error:', e);
    const video = videoRef.current;
    if (video?.error) {
      console.error('Video error details:', {
        code: video.error.code,
        message: video.error.message
      });
    }
    setVideoError('Error loading video');
    setIsVideoLoading(false);
    setIsVideoPlaying(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      console.log('Video load started');
      setIsVideoLoading(true);
      setVideoError(null);
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      setIsVideoLoading(false);
      if (!hasAttemptedPlay) {
        setHasAttemptedPlay(true);
        video.play().catch(error => {
          console.error('Video play error:', error);
          setVideoError('Error playing video');
          setIsVideoPlaying(false);
        });
      }
    };

    const handlePlaying = () => {
      console.log('Video is playing');
      setIsVideoPlaying(true);
      setIsVideoLoading(false);
      setVideoError(null);
    };

    const handleStalled = () => {
      console.log('Video stalled');
      setIsVideoLoading(true);
    };

    const handleWaiting = () => {
      console.log('Video buffering');
      setIsVideoLoading(true);
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('stalled', handleStalled);
    video.addEventListener('waiting', handleWaiting);

    // Try to load the video
    try {
      video.load();
    } catch (error) {
      console.error('Video load error:', error);
      setVideoError('Error loading video');
      setIsVideoLoading(false);
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('stalled', handleStalled);
      video.removeEventListener('waiting', handleWaiting);
    };
  }, [hasAttemptedPlay]);

  const values = [
    {
      id: "1",
      icon: <Heart className="h-8 w-8 text-teal-600" />,
      title: "Compassion",
      description: "We approach every interaction with empathy, understanding, and genuine care for our users' well-being.",
    },
    {
      id: "2",
      icon: <Lightbulb className="h-8 w-8 text-teal-600" />,
      title: "Innovation",
      description: "We continuously push boundaries to develop cutting-edge solutions that transform mental health care delivery.",
    },
    {
      id: "3",
      icon: <Star className="h-8 w-8 text-teal-600" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from our technology to our user experience.",
    },
    {
      id: "4",
      icon: <Target className="h-8 w-8 text-teal-600" />,
      title: "Focus",
      description: "We remain dedicated to our purpose of improving mental health outcomes through focused, intentional care.",
    },
    {
      id: "5",
      icon: <Compass className="h-8 w-8 text-teal-600" />,
      title: "Guidance",
      description: "We serve as trusted guides on each individual's unique journey to mental wellness.",
    },
    {
      id: "6",
      icon: <Shield className="h-8 w-8 text-teal-600" />,
      title: "Trust",
      description: "We build relationships founded on reliability, transparency, and unwavering ethical standards.",
    },
  ];

  return (
    <PageTransitions>
      <div className="min-h-screen" ref={containerRef}>
        {/* Hero Section */}
        <motion.section
          className="relative h-screen overflow-hidden"
          style={{ opacity, scale }}
        >
          {/* Background with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            {/* Video */}
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoPlaying ? 'opacity-100' : 'opacity-0'
              }`}
              autoPlay
              muted
              loop
              playsInline
              onPlaying={() => setIsVideoPlaying(true)}
              onWaiting={() => setIsVideoPlaying(false)}
              onStalled={() => setIsVideoPlaying(false)}
              onError={handleError}
            >
              <source src="/Empower-Adobe.mov" type="video/quicktime" />
              <source src="/videos/empower.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Loading Indicator */}
            {isVideoLoading && !videoError && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 border-4 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </motion.div>
            )}

            {/* Error Message */}
            {videoError && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-white/80 text-lg bg-black/20 backdrop-blur-sm px-6 py-3 rounded-lg">
                  {videoError}
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="p-8 md:p-12"
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 tracking-tight">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We are dedicated to transforming mental health care through innovative technology
                and compassionate service. Our journey began with a simple vision: to make
                quality mental health care accessible to everyone.
              </p>
            </motion.div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </motion.section>

        {/* Mission Section */}
        <section className="py-24 px-4 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <RevealAnimation type="fade">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Our Mission
              </h2>
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 md:p-12 rounded-2xl shadow-xl">
                <p className="text-xl md:text-2xl text-gray-800 text-center max-w-4xl mx-auto leading-relaxed">
                  We are dedicated to revolutionizing mental health care by providing personalized,
                  accessible, and effective solutions that empower individuals on their journey to
                  better mental well-being.
                </p>
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <RevealAnimation type="fade">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
                Our Values
              </h2>
            </RevealAnimation>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <RevealAnimation key={value.id} type="slide" direction="up" delay={index * 0.1}>
                  <motion.div
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    whileHover={{ y: -5 }}
                    transition={transitions.bounce}
                  >
                    <div className="bg-teal-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </motion.div>
                </RevealAnimation>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Timeline Section */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <RevealAnimation type="fade">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
                Our Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 text-center">
                Explore the key milestones in our history as we've grown to become a leading mental health provider in Colorado.
              </p>
            </RevealAnimation>
            
            <RevealAnimation type="fade">
              <div className="bg-gray-50 p-6 md:p-10 rounded-2xl shadow-md">
                <HorizontalTimelineSlider 
                  items={[
                    {
                      year: "2018",
                      title: "ReThink Mental Health Opens Its Doors",
                      description: "Founded by Karen Laber, PMHNP-BC, ReThink Mental Health began with a vision to transform mental health care in the Denver area. We opened our first office with a commitment to providing personalized, comprehensive care that combines conventional psychiatric treatments with complementary therapies."
                    },
                    {
                      year: "2019",
                      title: "Expanding Our Services",
                      description: "We introduced specialized programs for first responders and veterans, recognizing the unique mental health challenges faced by these communities. Our team grew to include additional specialists dedicated to trauma-informed care."
                    },
                    {
                      year: "2020",
                      title: "Adapting to New Challenges",
                      description: "In response to the global pandemic, we quickly pivoted to offer telehealth services, ensuring continuous care for our patients during uncertain times. This expansion of our service model allowed us to reach more individuals in need."
                    },
                    {
                      year: "2021",
                      title: "Milestone: 500+ Patients",
                      description: "We celebrated serving over 500 patients, a testament to our growing reputation for quality care and effective treatment approaches. Our patient community continued to grow through referrals and positive outcomes."
                    },
                    {
                      year: "2022",
                      title: "New Office Location",
                      description: "To accommodate our growing practice, we moved into a larger, more modern facility designed specifically for mental health care. The new space features comfortable therapy rooms, advanced treatment areas, and a welcoming environment for all patients."
                    },
                    {
                      year: "2023",
                      title: "Innovative Treatment Programs",
                      description: "We expanded our treatment offerings to include cutting-edge approaches for treatment-resistant conditions, further establishing ReThink as a leader in comprehensive mental health care in Colorado."
                    },
                    {
                      year: "Today",
                      title: "Continuing Our Mission",
                      description: "ReThink Mental Health continues to evolve and grow, always guided by our core mission of providing personalized, effective mental health care that empowers individuals on their journey to wellness."
                    }
                  ]}
                />
              </div>
            </RevealAnimation>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <RevealAnimation type="fade">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Meet Our Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                Get to know the dedicated professionals who are committed to providing exceptional mental health care at ReThink Mental Health.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={transitions.bounce}
              >
                <Link
                  href="/team"
                  className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  View Our Team
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </motion.div>
            </RevealAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <RevealAnimation type="fade">
          <CTA />
        </RevealAnimation>
      </div>
    </PageTransitions>
  );
}
