import React from 'react';

const Section = ({ id, title, description, children, className = "", featured = false }) => {
  return (
    <div id={id} className={`py-12 md:py-20 px-4 md:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight px-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed px-4">
              {description}
            </p>
          )}
        </div>
        <div className={`grid gap-4 md:gap-8 ${
          featured 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Section;
