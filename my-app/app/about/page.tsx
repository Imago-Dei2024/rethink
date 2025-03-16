"use client";
import React, { useEffect, useRef, useState } from 'react';
import { FadeIn, SlideIn } from '@/components/ui/page-transition';
import CTA from '@/components/CTA';
import Link from 'next/link';
import { RevealAnimation } from '@/components/ui/reveal-animation';
import { ParallaxSection, ParallaxContent } from '@/components/ui/parallax-section';
import { AnimatedCardGrid } from '@/components/ui/animated-card-grid';
import { PageTransitions } from '@/components/ui/page-transitions';
import { Lightbulb, Heart, Star, Target, Compass, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { transitions } from '@/lib/utils';

export default function AboutPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    console.log('Setting up video with source:', '/4K-Adobe.mov');

    const handleError = (e: any) => {
      console.error('Video error:', e);
      console.error('Video error details:', video.error);
      setVideoError('Error loading video. Click to try again.');
      setIsVideoLoading(false);
    };

    const handleLoadStart = () => {
      console.log('Video loading started');
      setIsVideoLoading(true);
      setVideoError(null);
    };

    const handleCanPlay = () => {
      console.log('Video can play now');
      setIsVideoLoading(false);
      setVideoError(null);

      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Video playback started successfully');
          setIsVideoPlaying(true);
        }).catch(error => {
          console.error('Playback failed:', error);
          setIsVideoPlaying(false);
          setVideoError('Click to play video');
        });
      }
    };

    const handlePlaying = () => {
      setIsVideoPlaying(true);
      setIsVideoLoading(false);
      setVideoError(null);
    };

    const handleWaiting = () => {
      setIsVideoLoading(true);
    };

    const handleStalled = () => {
      if (!isVideoPlaying) {
        setVideoError('Video stalled. Click to try again.');
      }
    };

    video.addEventListener('error', handleError);
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('stalled', handleStalled);

    // Try to load the video
    try {
      video.load();
      console.log('Video load initiated');
    } catch (error) {
      console.error('Video load error:', error);
      setVideoError('Error loading video. Click to try again.');
      setIsVideoLoading(false);
    }

    return () => {
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('stalled', handleStalled);
    };
  }, [isVideoPlaying]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (videoError || !isVideoPlaying) {
      setIsVideoLoading(true);
      setVideoError(null);

      // Try to reload and play the video
      try {
        video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsVideoPlaying(true);
            setIsVideoLoading(false);
          }).catch(error => {
            console.error('Manual play failed:', error);
            setVideoError('Video playback failed. Please try again.');
            setIsVideoPlaying(false);
          });
        }
      } catch (error) {
        console.error('Video reload error:', error);
        setVideoError('Error loading video. Please refresh the page.');
        setIsVideoPlaying(false);
      }
    }
  };

  const values = [
    {
      id: "1",
      icon: <Heart className="h-5 w-5 text-teal-600" />,
      title: "Compassion",
      description: "We approach every interaction with empathy, understanding, and genuine care for our users' well-being.",
    },
    {
      id: "2",
      icon: <Lightbulb className="h-5 w-5 text-teal-600" />,
      title: "Innovation",
      description: "We continuously push boundaries to develop cutting-edge solutions that transform mental health care delivery.",
    },
    {
      id: "3",
      icon: <Star className="h-5 w-5 text-teal-600" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from our technology to our user experience.",
    },
    {
      id: "4",
      icon: <Target className="h-5 w-5 text-teal-600" />,
      title: "Focus",
      description: "We remain dedicated to our purpose of improving mental health outcomes through focused, intentional care.",
    },
    {
      id: "5",
      icon: <Compass className="h-5 w-5 text-teal-600" />,
      title: "Guidance",
      description: "We serve as trusted guides on each individual's unique journey to mental wellness.",
    },
    {
      id: "6",
      icon: <Shield className="h-5 w-5 text-teal-600" />,
      title: "Trust",
      description: "We build relationships founded on reliability, transparency, and unwavering ethical standards.",
    },
  ];

  return (
    <PageTransitions>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section with Video */}
        <section className="relative h-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-b from-teal-700 to-teal-600"
            onClick={handleVideoClick}
            style={{ cursor: (videoError || !isVideoPlaying) ? 'pointer' : 'default' }}
          >
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-90' : 'opacity-0'}`}
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              poster="/poster-image.jpg"
            >
              <source src="/4K-Adobe.mov" type="video/quicktime" />
              <source src="/4K-Adobe.mp4" type="video/mp4" />
              <source src="/4K-Adobe-low.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {isVideoLoading && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-xl bg-black/30 px-8 py-4 rounded-lg">
                  Loading video...
                </div>
              </motion.div>
            )}

            {videoError && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-white text-xl bg-black/50 px-8 py-4 rounded-lg cursor-pointer">
                  {videoError}
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <RevealAnimation type="fade" duration={1.2}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                Our Story
              </h1>
              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-md">
                We are dedicated to transforming mental health care through innovative technology
                and compassionate service. Our journey began with a simple vision: to make
                quality mental health care accessible to everyone.
              </p>
            </RevealAnimation>
          </div>
        </section>

        {/* Mission Section */}
        <ParallaxSection
          title="Our Mission"
          subtitle="Revolutionizing mental health care through accessibility and innovation"
          className="bg-white py-16"
        >
          <ParallaxContent direction="none" speed={30}>
            <div className="bg-gradient-to-r from-teal-50 to-teal-100 p-8 rounded-2xl shadow-xl">
              <p className="text-xl text-gray-800 text-center max-w-4xl mx-auto">
                We are dedicated to revolutionizing mental health care by providing personalized,
                accessible, and effective solutions that empower individuals on their journey to
                better mental well-being.
              </p>
            </div>
          </ParallaxContent>
        </ParallaxSection>

        {/* Values Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <RevealAnimation type="fade" duration={0.7}>
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Our Values</h2>
            </RevealAnimation>

            <AnimatedCardGrid items={values} columns={3} />
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <RevealAnimation type="fade">
                <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Our Journey</h2>
              </RevealAnimation>

              <div className="space-y-8">
                <RevealAnimation type="slide" direction="up" delay={0.1}>
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-teal-700 mb-3">Our Beginning</h3>
                    <p className="text-gray-700">
                      ReThink Mental Health was founded by Karen Laber, PMHNP-BC, with a vision to transform mental health care in the Denver area. After years of working in traditional psychiatric settings, Karen recognized the need for a more integrative approach that addressed not just symptoms, but the underlying factors contributing to mental health challenges.
                    </p>
                  </div>
                </RevealAnimation>

                <RevealAnimation type="slide" direction="up" delay={0.2}>
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-teal-700 mb-3">Our Growth</h3>
                    <p className="text-gray-700">
                      In 2018, ReThink Mental Health opened its doors with a commitment to providing personalized, comprehensive care that combines conventional psychiatric treatments with complementary therapies. Our practice has grown to include a team of dedicated professionals who share a passion for helping individuals achieve optimal mental wellness.
                    </p>
                  </div>
                </RevealAnimation>

                <RevealAnimation type="slide" direction="up" delay={0.3}>
                  <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-xl font-semibold text-teal-700 mb-3">Today</h3>
                    <p className="text-gray-700">
                      Today, ReThink Mental Health is known for its innovative approaches to treating complex mental health conditions, including our specialized programs for first responders, veterans, and individuals with treatment-resistant depression. We continue to evolve our practice based on the latest research and best practices in integrative psychiatry.
                    </p>
                  </div>
                </RevealAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Team Link Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <RevealAnimation type="fade">
              <h2 className="text-3xl font-bold text-teal-700 mb-6">Meet Our Team</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Get to know the dedicated professionals who are committed to providing exceptional mental health care at ReThink Mental Health.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={transitions.fast}
              >
                <Link
                  href="/team"
                  className="btn bg-teal-700 text-white hover:bg-teal-600 px-8 py-3 rounded-md font-medium transition-colors inline-flex items-center"
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