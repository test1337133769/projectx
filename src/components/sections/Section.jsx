import React from 'react';

const Section = ({ title, description, children, className = "", featured = false }) => {
  return (
    <div className={`py-20 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">{title}</h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">{description}</p>
          )}
        </div>
        <div className={`grid gap-8 ${featured ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Section;
