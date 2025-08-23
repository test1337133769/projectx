import React, { useState } from 'react';

const Header = ({ getTotalItems, setIsCartOpen, onSearch, searchTerm, setSearchTerm }) => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-2xl font-semibold text-gray-900 tracking-tight hover:text-blue-600 transition-colors"
            >
              ArcadeGS
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('featured-games')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Featured Games
            </button>
            <button 
              onClick={() => scrollToSection('popular-games')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Popular Games
            </button>
            <button 
              onClick={() => scrollToSection('gift-cards')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Gift Cards
            </button>
            <button 
              onClick={() => scrollToSection('subscriptions')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Subscriptions
            </button>
            <button 
              onClick={() => scrollToSection('support')}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Contact Us
            </button>
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden sm:block relative">
              <input
                type="text"
                placeholder="Search games, gift cards..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => setIsSearchExpanded(true)}
                onBlur={() => setTimeout(() => setIsSearchExpanded(false), 200)}
                className={`transition-all duration-300 px-4 py-2 bg-gray-100 border-0 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 ${
                  isSearchExpanded ? 'w-80' : 'w-64'
                }`}
              />
              {searchTerm ? (
                <button 
                  onClick={clearSearch}
                  className="absolute right-8 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
              <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* Cart Button */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6 0L17 13" />
              </svg>
              {getTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-2 bg-gray-100 border-0 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            {searchTerm ? (
              <button 
                onClick={clearSearch}
                className="absolute right-8 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : null}
            <button className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('featured-games')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-left"
              >
                Featured Games
              </button>
              <button 
                onClick={() => scrollToSection('popular-games')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-left"
              >
                Popular Games
              </button>
              <button 
                onClick={() => scrollToSection('gift-cards')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-left"
              >
                Gift Cards
              </button>
              <button 
                onClick={() => scrollToSection('subscriptions')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-left"
              >
                Subscriptions
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-left"
              >
                Contact Us
              </button>
            </nav>
          </div>
        )}
        
        {/* Search Results Dropdown */}
        {searchTerm && isSearchExpanded && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-xl rounded-b-2xl mt-1 max-h-96 overflow-y-auto">
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-2">
                Searching for "{searchTerm}"...
              </p>
              <p className="text-xs text-gray-500">
                Results will appear in the sections below
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
