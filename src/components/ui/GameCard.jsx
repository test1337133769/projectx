import React, { memo } from 'react';
import LazyImage from './LazyImage';

const GameCard = memo(({ game, featured = false, openGameModal }) => {
  return (
    <div className={`bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer ${featured ? 'lg:col-span-2' : ''}`}
      onClick={() => openGameModal(game)}
    >
      <div className={`relative overflow-hidden ${featured ? 'aspect-[2/1]' : 'aspect-square'}`}
      >
        <LazyImage
          src={game.image}
          alt={game.title}
          className="w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        
        {game.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-xl ${
            game.badge === 'SALE' ? 'bg-red-500/90 text-white' : 
            game.badge === 'OUT OF STOCK' ? 'bg-gray-500/90 text-white' : 
            'bg-blue-500/90 text-white'
          }`}
          >
            {game.badge}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
          {game.title}
        </h3>
        {featured && game.price && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {game.originalPrice && (
                <span className="text-gray-400 line-through text-sm">৳{game.originalPrice}</span>
              )}
              <span className="text-2xl font-semibold text-gray-900">৳{game.price}</span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                openGameModal(game);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;
