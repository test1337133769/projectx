import React from 'react';

const LoadMoreButton = ({ onClick }) => {
  return (
    <div className="flex justify-center py-12">
      <button
        onClick={onClick}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
      >
        View more
      </button>
    </div>
  );
};

export default LoadMoreButton;
