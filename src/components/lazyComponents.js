import { lazy } from 'react';

// Lazy load heavy components
export const GameModal = lazy(() => import('./modals/GameModal'));
export const Cart = lazy(() => import('./ui/Cart'));
export const BillingInfo = lazy(() => import('./modals/BillingInfo'));
export const PaymentPopup = lazy(() => import('./modals/PaymentPopup'));

// Keep frequently used components non-lazy
export { default as Header } from './ui/Header';
export { default as Footer } from './ui/Footer';
export { default as GameCard } from './ui/GameCard';
export { default as LoadMoreButton } from './ui/LoadMoreButton';
export { default as Toast } from './ui/Toast';
export { default as ToastContainer } from './ui/ToastContainer';

// Section Components
export { default as HeroBanner } from './sections/HeroBanner';
export { default as Section } from './sections/Section';
export { default as FeatureSection } from './sections/FeatureSection';
export { default as Stats } from './sections/Stats';
