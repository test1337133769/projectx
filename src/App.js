import React, { useState, createContext, useContext } from 'react';
import './App.css';
import { Header, GameCard, HeroBanner, Section, LoadMoreButton, Footer, FeatureSection, Stats, GameModal, Cart } from './components';

// Create Cart Context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Mock Data - Apple-style clean content
const featuredGames = [
  {
    id: 1,
    title: 'Mobile Legends',
    image: 'img/Mobile Legends.png',
  },
  {
    id: 2,
    title: 'Valorant',
    image: 'img/Valorant.jpg',
  },
  {
    id: 3,
    title: 'Genshin Impact',
    image: 'img/Genshin_Impact.webp',
  },
    {
    id: 4,
    title: 'Honor of Kings',
    image: 'img/Honor of Kings.png',
  }
];

const popularGames = [
  {
    id: 4,
    title: 'Wuthering Waves',
    image: 'img/Wuthering.png',
    currency: 'Lunite',
    packages: [
      { amount: '60 Lunite', price: '99', popular: false },
      { amount: '300 Lunite', price: '499', popular: true },
      { amount: '980 Lunite', price: '1599', popular: false },
      { amount: '1980 Lunite', price: '2999', popular: false }
    ],
    battlePass: { name: 'Wuthering Pass', price: '799' },
    loginMethods: ['Email', 'Google', 'Facebook']
  },
  {
    id: 5,
    title: 'PUBG Mobile',
    image: 'img/pubg.png',
    currency: 'UC',
    packages: [
      { amount: '60 UC', price: '85', popular: false },
      { amount: '325 UC', price: '425', popular: true },
      { amount: '660 UC', price: '850', popular: false },
      { amount: '1800 UC', price: '2125', popular: false },
      { amount: '3850 UC', price: '4250', popular: false }
    ],
    battlePass: { name: 'Royale Pass', price: '599' },
    loginMethods: ['Email', 'Google', 'Facebook', 'Twitter']
  },
  {
    id: 6,
    title: 'Honkai Star Rail',
    image: 'img/Honkai.png',
    currency: 'Oneiric Shards',
    packages: [
      { amount: '60 Oneiric Shards', price: '99', popular: false },
      { amount: '300 Oneiric Shards', price: '499', popular: true },
      { amount: '980 Oneiric Shards', price: '1599', popular: false },
      { amount: '1980 Oneiric Shards', price: '2999', popular: false }
    ],
    battlePass: { name: 'Nameless Honor', price: '999' },
    loginMethods: ['Email', 'Google', 'Apple ID']
  },
  {
    id: 7,
    title: 'Call of Duty Mobile',
    image: 'img/call of duty.jpg',
    currency: 'CP',
    packages: [
      { amount: '80 CP', price: '99', popular: false },
      { amount: '400 CP', price: '499', popular: true },
      { amount: '800 CP', price: '999', popular: false },
      { amount: '2000 CP', price: '2399', popular: false },
      { amount: '5000 CP', price: '5699', popular: false }
    ],
    battlePass: { name: 'Battle Pass', price: '699' },
    loginMethods: ['Email', 'Google', 'Facebook', 'Apple ID']
  },
  {
    id: 8,
    title: 'Free Fire',
    image: 'img/free.png',
    currency: 'Diamonds',
    packages: [
      { amount: '100 Diamonds', price: '125', popular: false },
      { amount: '520 Diamonds', price: '625', popular: true },
      { amount: '1080 Diamonds', price: '1250', popular: false },
      { amount: '2200 Diamonds', price: '2500', popular: false },
      { amount: '5600 Diamonds', price: '6250', popular: false }
    ],
    battlePass: { name: 'Elite Pass', price: '499' },
    loginMethods: ['Email', 'Google', 'Facebook', 'VK']
  },
  {
    id: 9,
    title: 'Arena of Valor',
    image: 'img/Arena.png',
    currency: 'Vouchers',
    packages: [
      { amount: '60 Vouchers', price: '99', popular: false },
      { amount: '310 Vouchers', price: '499', popular: true },
      { amount: '630 Vouchers', price: '999', popular: false },
      { amount: '1580 Vouchers', price: '2499', popular: false }
    ],
    battlePass: { name: 'Honor Pass', price: '599' },
    loginMethods: ['Email', 'Google', 'Facebook']
  },
  {
    id: 10,
    title: 'Clash of Clans',
    image: 'img/clash of clan.png',
    currency: 'Gems',
    packages: [
      { amount: '80 Gems', price: '99', popular: false },
      { amount: '500 Gems', price: '499', popular: true },
      { amount: '1200 Gems', price: '999', popular: false },
      { amount: '2500 Gems', price: '1999', popular: false },
      { amount: '14000 Gems', price: '9999', popular: false }
    ],
    battlePass: { name: 'Gold Pass', price: '499' },
    loginMethods: ['Email', 'Google', 'Apple ID', 'Supercell ID']
  },
  {
    id: 11,
    title: 'Clash Royale',
    image: 'img/Clash Royale.png',
    currency: 'Gems',
    packages: [
      { amount: '80 Gems', price: '99', popular: false },
      { amount: '500 Gems', price: '499', popular: true },
      { amount: '1200 Gems', price: '999', popular: false },
      { amount: '2500 Gems', price: '1999', popular: false },
      { amount: '14000 Gems', price: '9999', popular: false }
    ],
    battlePass: { name: 'Pass Royale', price: '499' },
    loginMethods: ['Email', 'Google', 'Apple ID', 'Supercell ID']
  }
];

const saleGames = [
  {
    id: 12,
    title: 'Genshin Impact',
    image: 'img/Genshin_Impact.webp',
    price: '999',
    originalPrice: '1499',
    badge: 'SALE'
  },
  {
    id: 13,
    title: 'Steam Wallet',
    image: 'img/Hardware.png',
    price: '1999',
    originalPrice: '2499',
    badge: 'SALE'
  },
  {
    id: 14,
    title: 'Epic Games Store',
    image: 'img/acastro_STK108__01.webp',
    price: '1299',
    originalPrice: '1799',
    badge: 'SALE'
  },
  {
    id: 15,
    title: 'PlayStation Store',
    image: 'img/Sony-PlayStation-Store.webp',
    price: '899',
    originalPrice: '1299',
    badge: 'SALE'
  }
];

const giftCards = [

    {
      id: 1,
      title: 'iTunes Gift Card',
      image: 'img/apple_cardstyle_7.png',
      currency: 'iTunes',
      packages: [
        { amount: '10 USD', price: '1200', popular: false },
        { amount: '15 USD', price: '1800', popular: false },
        { amount: '25 USD', price: '3000', popular: true },
        { amount: '50 USD', price: '6000', popular: false },
        { amount: '100 USD', price: '12000', popular: false }
      ],
    loginMethods: ['Email', 'Google', 'Apple ID', 'Supercell ID']
    },

    {
      id: 2,
      title: 'Google Play Gift Card',
      image: 'img/google-play.webp',
      currency: 'Google Play',
      packages: [
        { amount: '10 USD', price: '1200', popular: false },
        { amount: '15 USD', price: '1800', popular: false }, 
        { amount: '25 USD', price: '3000', popular: true },
        { amount: '50 USD', price: '6000', popular: false },
        { amount: '100 USD', price: '12000', popular: false }
      ],
    },


    {
      id: 3,
      title: 'PlayStation Gift Card',
      image: 'img/Sony-PlayStation-Store.webp',
      currency: 'PlayStation',
      packages: [
        { amount: '10 USD', price: '1200', popular: false },
        { amount: '15 USD', price: '1800', popular: false },
        { amount: '25 USD', price: '3000', popular: true },
        { amount: '50 USD', price: '6000', popular: false },
        { amount: '100 USD', price: '12000', popular: false }
      ],
    },

    {
      id: 4,
      title: 'Xbox Gift Card',
      image: 'img/xbox.jpg',
      currency: 'Xbox',
      packages: [
        { amount: '10 USD', price: '1200', popular: false },
        { amount: '15 USD', price: '1800', popular: false },
        { amount: '25 USD', price: '3000', popular: true },
        { amount: '50 USD', price: '6000', popular: false },
        { amount: '100 USD', price: '12000', popular: false }
      ],
    }
];

const subscriptions = [
  {
    id: 1,
    title: 'Apple Arcade',
    image: 'img/havuqv1c8qn51.jpg',
    currency: 'Arcade',
     packages: [
      { amount: 'Individual', price: '1199', popular: true },
      { amount: 'Family', price: '2000', popular: false },
      { amount: 'Premier', price: '2800', popular: false }
    ],
  },
  {
    id: 2,
    title: 'Xbox Game Pass (US)',
    image: 'img/xboxgmaepass.jpg',
    currency: 'Xbox',
     packages: [
      { amount: '7‑Day Trial', price: '820', popular: false },
      { amount: '1 Month', price: '1850', popular: false },
      { amount: '3 Months', price: '5550', popular: true },
      { amount: '6 Months', price: '8350', popular: false },
      { amount: '12 Months', price: '15900', popular: false }
    ],
  },
  {
    id: 3,
    title: 'PlayStation Plus (US)',
    image: 'img/plays.jpg',
    currency: 'PlayStation',
    packages: [
      { amount: '3‑Month US', price: '2300', popular: true },
      { amount: '12‑Month US', price: '4500', popular: false }
    ],
  },
  {
    id: 4,
    title: 'Discord Nitro',
    image: 'img/discord-nitro-body.webp',
    currency: 'Nitro',
    packages: [
      { amount: 'Nitro Basic 1 Month', price: '580', popular: false },
      { amount: 'Nitro 1 Month', price: '1250', popular: true },
      { amount: 'Nitro 12 Month', price: '11500', popular: false }
    ],
  }
];


const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

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

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isCartOpen,
    setIsCartOpen,
    selectedGame,
    isGameModalOpen,
    openGameModal,
    closeGameModal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

function AppContent() {
  const [visibleFeaturedGames, setVisibleFeaturedGames] = useState(8);
  const [visiblePopularGames, setVisiblePopularGames] = useState(8);
  const [visibleSaleGames, setVisibleSaleGames] = useState(4);
  const { isGameModalOpen, selectedGame, isCartOpen } = useCart();

  const handleLoadMoreFeatured = () => {
    setVisibleFeaturedGames(prev => prev + 8);
  };

  const handleLoadMorePopular = () => {
    setVisiblePopularGames(prev => prev + 8);
  };

  const handleLoadMoreSale = () => {
    setVisibleSaleGames(prev => prev + 4);
  };

  // Combine all games for easy access (optional, not used below)
  const allGames = [...featuredGames, ...popularGames, ...saleGames, ...giftCards, ...subscriptions];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroBanner />

      <Section
        title="Featured Games"
        description="Handpicked gaming experiences designed to elevate your play"
        className="bg-gray-50"
      >
        {featuredGames.slice(0, visibleFeaturedGames).map(game => (
          <GameCard key={game.id} game={game} />
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
          <GameCard key={game.id} game={game} />
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
          <GameCard key={game.id} game={game} />
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
          <GameCard key={game.id} game={game} />
        ))}
      </Section>

      <Section
        title="Subscriptions"
        description="Unlimited access to premium gaming experiences"
        className="bg-white"
      >
        {subscriptions.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </Section>

      <Stats />
      <Footer />

      {/* Game Details Modal */}
      {isGameModalOpen && selectedGame && (
        <GameModal game={selectedGame} />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && <Cart />}
    </div>
  );
}

// Main App component with CartProvider
function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
