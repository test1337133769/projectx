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
      />
      <HeroBanner />

      <Section
        title="Featured Games"
        description="Handpicked gaming experiences designed to elevate your play"
        className="bg-gray-50"
      >
        {featuredGames.slice(0, visibleFeaturedGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visibleFeaturedGames < featuredGames.length && (
        <div className="bg-gray-50">
          <LoadMoreButton onClick={handleLoadMoreFeatured} />
        </div>
      )}

      <Section
        title="Popular Games"
        description="The games everyone's talking about"
        className="bg-gray-50"
      >
        {popularGames.slice(0, visiblePopularGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visiblePopularGames < popularGames.length && (
        <div className="bg-gray-50">
          <LoadMoreButton onClick={handleLoadMorePopular} />
        </div>
      )}

      <FeatureSection />

      <Section
        title="Limited Time Offers"
        description="Exceptional value on premium gaming content"
        className="bg-white"
      >
        {saleGames.slice(0, visibleSaleGames).map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      {visibleSaleGames < saleGames.length && (
        <LoadMoreButton onClick={handleLoadMoreSale} />
      )}

      <Section
        title="Gift Cards"
        description="Perfect for any gamer. Beautifully simple to give."
        className="bg-gray-50"
      >
        {giftCards.map(game => (
          <GameCard 
            key={game.id} 
            game={game} 
            openGameModal={openGameModal}
          />
        ))}
      </Section>

      <Section
        title="Subscriptions"
        description="Unlimited access to premium gaming experiences"
        className="bg-white"
      >
        {subscriptions.map(game => (
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
