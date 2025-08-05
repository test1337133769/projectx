import React from 'react';

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center py-8 md:py-12 px-4">
      <button
        onClick={onClick}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 md:px-8 md:py-3 rounded-full font-semibold transition-all hover:shadow-lg text-sm md:text-base"
      >
        View more
      </button>
    </div>
  );
};

export default LoadMoreButton;
