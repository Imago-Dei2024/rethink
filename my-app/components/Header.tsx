"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  
  // Scroll animation
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [1, 0.98]);
  const headerScale = useTransform(scrollY, [0, 50], [1, 0.99]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownButton = document.getElementById('services-dropdown-button');
      
      if (dropdownButton && !dropdownButton.contains(target)) {
        setIsServicesDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would implement search functionality here
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Check if link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <motion.header 
      ref={headerRef}
      style={{ 
        opacity: headerOpacity,
        scale: headerScale,
      }}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-md' 
          : 'bg-white shadow-sm'
      }`}
>
      <div className="container mx-auto px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-50/20 to-transparent pointer-events-none"></div>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="mr-2 relative w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-white font-bold text-sm">R</span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-teal-600 to-teal-400"
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                  />
                  <span className="relative z-10 text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-teal-700">
                  ReThink Mental Health
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={`relative font-medium transition-colors duration-300 ${isActive('/') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                Home
              </motion.span>
              {isActive('/') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                  layoutId="navbar-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            
            <Link href="/about" className={`relative font-medium transition-colors duration-300 ${isActive('/about') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                About Us
              </motion.span>
              {isActive('/about') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                  layoutId="navbar-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            
            <Link href="/services/first-responder-care" className={`relative font-medium transition-colors duration-300 ${isActive('/services/first-responder-care') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                First Responder Care
              </motion.span>
              {isActive('/services/first-responder-care') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                  layoutId="navbar-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <motion.button 
                id="services-dropdown-button"
                className={`relative font-medium transition-colors duration-300 ${pathname.startsWith('/services') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsServicesDropdownOpen(!isServicesDropdownOpen);
                }}
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Services
                <motion.svg 
                  className={`inline-block ml-1 w-4 h-4 transition-transform duration-200`}
                  animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
                
                {isActive('/services') && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                    layoutId="navbar-indicator"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
              
              <AnimatePresence>
                {isServicesDropdownOpen && (
                  <motion.div 
                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link 
                      href="/services" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      All Services
                    </Link>
                    <Link 
                      href="/services/first-responder-care" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      First Responder Care
                    </Link>
                    {/* Add more service links as needed */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href="/team" className={`relative font-medium transition-colors duration-300 ${isActive('/team') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                Our Team
              </motion.span>
              {isActive('/team') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                  layoutId="navbar-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
            
            <Link href="/faq" className={`relative font-medium transition-colors duration-300 ${isActive('/faq') ? 'text-teal-700' : 'text-neutral-700 hover:text-teal-700'}`}>
              <motion.span
                whileHover={{ y: -1 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="inline-block"
              >
                FAQ
              </motion.span>
              {isActive('/faq') && (
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full" 
                  layoutId="navbar-indicator"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Button */}
            <motion.button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-neutral-700 hover:text-teal-700 transition-colors duration-300 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearchOpen && (
                <motion.span 
                  className="absolute -bottom-1 left-1/2 w-2 h-2 bg-teal-500 rounded-full"
                  layoutId="search-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
            
            {/* Contact Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/contact" className="btn bg-gradient-to-r from-orange-300 to-orange-200 hover:from-orange-200 hover:to-orange-100 text-neutral-900 px-4 py-2 rounded-md transition-colors duration-300 shadow-sm hover:shadow">
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <motion.button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-neutral-700 hover:text-teal-700 transition-colors duration-300 relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {isSearchOpen && (
                <motion.span 
                  className="absolute -bottom-1 left-1/2 w-2 h-2 bg-teal-500 rounded-full"
                  layoutId="search-indicator-mobile"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
            
            {/* Menu Toggle Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-teal-700 focus:outline-none"
              whileTap={{ scale: 0.9 }}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            className="bg-gray-50 py-3 px-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <button 
                type="submit"
                className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 transition-colors duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/about') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/services/first-responder-care"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/services/first-responder-care') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                First Responder Care
              </Link>
              
              {/* Services Dropdown - Mobile */}
              <div>
                <motion.button
                  className={`flex justify-between items-center w-full px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${pathname.startsWith('/services') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsServicesDropdownOpen(!isServicesDropdownOpen);
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Services
                  <motion.svg 
                    className="w-4 h-4"
                    animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>
                
                <AnimatePresence>
                  {isServicesDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4"
                    >
                      <Link
                        href="/services"
                        className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-teal-700 hover:bg-teal-50"
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        All Services
                      </Link>
                      <Link
                        href="/services/first-responder-care"
                        className="block px-3 py-2 rounded-md text-base font-medium text-neutral-700 hover:text-teal-700 hover:bg-teal-50"
                        onClick={() => {
                          setIsServicesDropdownOpen(false);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        First Responder Care
                      </Link>
                      {/* Add more service links as needed */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <Link
                href="/team"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/team') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Our Team
              </Link>
              <Link
                href="/faq"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${isActive('/faq') ? 'bg-teal-50 text-teal-700' : 'text-neutral-700 hover:text-teal-700 hover:bg-teal-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-orange-300 to-orange-200 text-neutral-900 hover:from-orange-200 hover:to-orange-100 transition-colors duration-300 shadow-sm"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
