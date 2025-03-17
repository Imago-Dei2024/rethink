"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  isLeft?: boolean;
  delay?: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ 
  year, 
  title, 
  description, 
  isLeft = false,
  delay = 0
}) => {
  return (
    <div className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'} mb-8 md:mb-0`}>
      <motion.div 
        className={`w-full md:w-5/12 ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
      >
        <div className="p-6 bg-white rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-shadow">
          <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-800 font-semibold mb-4">
            {year}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};

interface VerticalTimelineProps {
  items: {
    year: string;
    title: string;
    description: string;
  }[];
}

export const VerticalTimeline: React.FC<VerticalTimelineProps> = ({ items }) => {
  return (
    <div className="relative w-full py-12">
      {/* Center line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-teal-400 to-teal-600 rounded-full"></div>
      
      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => (
          <TimelineItem
            key={index}
            year={item.year}
            title={item.title}
            description={item.description}
            isLeft={index % 2 === 0}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};
