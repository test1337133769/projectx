import React, { useState, useCallback, useMemo, Suspense, useEffect } from 'react';
import './App.css';
import {
  Header,
  GameCard,
  HeroBanner,
  Section,
  LoadMoreButton,
  Footer,
  FeatureSection,
  Stats,
  ToastContainer
} from './components';
import { GameModal, Cart } from './components/lazyComponents';
import { useToast } from './hooks/useToast';
import {
  featuredGames,
  popularGames,
  saleGames,
  giftCards,
  subscriptions
} from './data/gamesData';

function App() {
  // Toast notification system
  const { toasts, hideToast, showSuccess, showError } = useToast();
  
  // Cart state management with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('gameCart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState({
    featured: featuredGames,
    popular: popularGames,
    sale: saleGames,
    giftCards: giftCards,
    subscriptions: subscriptions
  });

  // Visibility state for sections
  const [visibleFeaturedGames, setVisibleFeaturedGames] = useState(8);
  const [visiblePopularGames, setVisiblePopularGames] = useState(8);
  const [visibleSaleGames, setVisibleSaleGames] = useState(4);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('gameCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cartItems]);

  // Search functionality
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      // Reset to original data when search is empty
      setFilteredGames({
        featured: featuredGames,
        popular: popularGames,
        sale: saleGames,
        giftCards: giftCards,
        subscriptions: subscriptions
      });
      return;
    }

    const searchLower = term.toLowerCase();
    const filterGames = (games) => 
      games.filter(game => 
        game.title.toLowerCase().includes(searchLower) ||
        game.description?.toLowerCase().includes(searchLower) ||
        game.category?.toLowerCase().includes(searchLower)
      );

    setFilteredGames({
      featured: filterGames(featuredGames),
      popular: filterGames(popularGames),
      sale: filterGames(saleGames),
      giftCards: filterGames(giftCards),
      subscriptions: filterGames(subscriptions)
    });

    // Reset visibility counts when searching
    if (term.trim()) {
      setVisibleFeaturedGames(50);
      setVisiblePopularGames(50);
      setVisibleSaleGames(50);
    } else {
      setVisibleFeaturedGames(8);
      setVisiblePopularGames(8);
      setVisibleSaleGames(4);
    }
  }, []);

  // Cart functions - memoized to prevent unnecessary re-renders
  const addToCart = useCallback((game, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === game.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === game.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...game, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  }, []);

  const updateQuantity = useCallback((gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getTotalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  }, [cartItems]);

  const getTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  const openGameModal = useCallback((game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  }, []);

  const closeGameModal = useCallback(() => {
    setIsGameModalOpen(false);
    setSelectedGame(null);
  }, []);

  // Load more functions - memoized
  const handleLoadMoreFeatured = useCallback(() => {
    setVisibleFeaturedGames(prev => prev + 8);
  }, []);

  const handleLoadMorePopular = useCallback(() => {
    setVisiblePopularGames(prev => prev + 8);
  }, []);

  const handleLoadMoreSale = useCallback(() => {
    setVisibleSaleGames(prev => prev + 4);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        getTotalItems={getTotalItems}
        setIsCartOpen={setIsCartOpen}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <HeroBanner />

      {/* Show search results summary when searching */}
      {searchTerm && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-blue-800 font-medium text-sm md:text-base">
              Search results for "{searchTerm}" 
            </p>
            <p className="text-blue-600 text-xs md:text-sm mt-1">
              Found {filteredGames.featured.length + filteredGames.popular.length + filteredGames.sale.length + filteredGames.giftCards.length + filteredGames.subscriptions.length} items
            </p>
          </div>
        </div>
      )}

      {/* Show no results message when search returns nothing */}
      {searchTerm && 
       filteredGames.featured.length === 0 && 
       filteredGames.popular.length === 0 && 
       filteredGames.sale.length === 0 && 
       filteredGames.giftCards.length === 0 && 
       filteredGames.subscriptions.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">No games found</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base px-4">
              We couldn't find any games matching "{searchTerm}". Try searching for something else.
            </p>
            <button
              onClick={() => handleSearch('')}
              className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

            <Section
        id="featured-games"
        title="Featured Games"
        description="Handpicked gaming experiences designed to elevate your play"
        className="bg-gray-50"
      >
        {filteredGames.featured.slice(0, visibleFeaturedGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visibleFeaturedGames < filteredGames.featured.length && !searchTerm && (
        <div className="bg-gray-50">
          <LoadMoreButton onClick={handleLoadMoreFeatured} />
        </div>
      )}

      <Section
        id="popular-games"
        title="Popular Games"
        description="Join millions of players in these trending games"
      >
        {filteredGames.popular.slice(0, visiblePopularGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visiblePopularGames < filteredGames.popular.length && !searchTerm && (
        <LoadMoreButton onClick={handleLoadMorePopular} />
      )}

      <Section
        id="sale-games"
        title="Special Offers"
        description="Limited-time deals on premium gaming content"
        className="bg-gray-50"
      >
        {filteredGames.sale.slice(0, visibleSaleGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visibleSaleGames < filteredGames.sale.length && !searchTerm && (
        <div className="bg-gray-50">
          <LoadMoreButton onClick={handleLoadMoreSale} />
        </div>
      )}

      <Section
        id="gift-cards"
        title="Gift Cards"
        description="Perfect for any gamer. Beautifully simple to give."
        className="bg-gray-50"
      >
        {filteredGames.giftCards.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      <Section
        id="subscriptions"
        title="Subscriptions"
        description="Unlock unlimited gaming with premium subscriptions"
      >
        {filteredGames.subscriptions.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      <Stats />
      <Footer />

      {/* Game Details Modal */}
      {isGameModalOpen && selectedGame && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>}>
          <GameModal 
            game={selectedGame} 
            closeGameModal={closeGameModal}
            addToCart={addToCart}
            showSuccess={showSuccess}
            showError={showError}
          />
        </Suspense>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Cart...</p>
          </div>
        </div>}>
          <Cart 
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            getTotalPrice={getTotalPrice}
            setIsCartOpen={setIsCartOpen}
            showSuccess={showSuccess}
            showError={showError}
          />
        </Suspense>
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} hideToast={hideToast} />
    </div>
  );
}

export default App;
