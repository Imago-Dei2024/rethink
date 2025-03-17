"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface HorizontalTimelineSliderProps {
  items: TimelineItem[];
}

export const HorizontalTimelineSlider: React.FC<HorizontalTimelineSliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    let currentX: number;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = startX - currentX;
    
    if (diff > 50 && currentIndex < items.length - 1) {
      handleNext();
      setIsDragging(false);
    } else if (diff < -50 && currentIndex > 0) {
      handlePrev();
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="w-full">
      {/* Timeline track */}
      <div className="relative w-full mb-8 mt-12">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 transform -translate-y-1/2"></div>
        
        <div className="relative flex justify-between max-w-5xl mx-auto px-4">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`relative flex flex-col items-center ${index === currentIndex ? 'z-10' : ''}`}
            >
              <motion.div 
                className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-teal-500 border-teal-600 scale-125' 
                    : index < currentIndex 
                      ? 'bg-teal-300 border-teal-400' 
                      : 'bg-white border-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
              />
              <motion.div 
                className={`absolute top-8 text-sm font-semibold transition-all duration-300 ${
                  index === currentIndex ? 'text-teal-700' : 'text-gray-500'
                }`}
                animate={{ 
                  scale: index === currentIndex ? 1.1 : 1,
                  y: index === currentIndex ? 0 : 5
                }}
              >
                {item.year}
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Content slider */}
      <div 
        className="relative overflow-hidden bg-white rounded-xl shadow-lg"
        ref={timelineRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="p-8"
          >
            <h3 className="text-2xl font-bold text-teal-700 mb-3">{items[currentIndex].title}</h3>
            <p className="text-gray-700">{items[currentIndex].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={handlePrev}
          className={`p-2 rounded-full ${
            currentIndex === 0 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-teal-600 hover:text-teal-800 hover:bg-teal-50'
          }`}
          whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
          whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        
        <motion.button
          onClick={handleNext}
          className={`p-2 rounded-full ${
            currentIndex === items.length - 1 
              ? 'text-gray-300 cursor-not-allowed' 
              : 'text-teal-600 hover:text-teal-800 hover:bg-teal-50'
          }`}
          whileHover={currentIndex < items.length - 1 ? { scale: 1.1 } : {}}
          whileTap={currentIndex < items.length - 1 ? { scale: 0.9 } : {}}
          disabled={currentIndex === items.length - 1}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};
