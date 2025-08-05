import React, { useState } from 'react';
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
  GameModal,
  Cart
} from './components';
import {
  featuredGames,
  popularGames,
  saleGames,
  giftCards,
  subscriptions
} from './data/gamesData';

function App() {
  // Cart state management
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  // Visibility state for sections
  const [visibleFeaturedGames, setVisibleFeaturedGames] = useState(8);
  const [visiblePopularGames, setVisiblePopularGames] = useState(8);
  const [visibleSaleGames, setVisibleSaleGames] = useState(4);

  // Cart functions
  const addToCart = (game, quantity = 1) => {
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
  };

  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };

  const updateQuantity = (gameId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === gameId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * item.quantity);
    }, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const openGameModal = (game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const closeGameModal = () => {
    setIsGameModalOpen(false);
    setSelectedGame(null);
  };

  // Load more functions
  const handleLoadMoreFeatured = () => {
    setVisibleFeaturedGames(prev => prev + 8);
  };

  const handleLoadMorePopular = () => {
    setVisiblePopularGames(prev => prev + 8);
  };

  const handleLoadMoreSale = () => {
    setVisibleSaleGames(prev => prev + 4);
  };

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
        <GameModal 
          game={selectedGame} 
          closeGameModal={closeGameModal}
          addToCart={addToCart}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <Cart 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          getTotalPrice={getTotalPrice}
          setIsCartOpen={setIsCartOpen}
        />
      )}
    </div>
  );
}

export default App;
