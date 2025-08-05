import React from 'react';

// Payment Method Logo Components
export const BkashLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#E70063"/>
    <path d="M16 20h8c4 0 8 2 8 6s-2 4-4 4h4c3 0 6 2 6 5s-3 5-6 5H16V20z" fill="white"/>
    <path d="M24 28h-4v4h4c2 0 3-1 3-2s-1-2-3-2z" fill="#E70063"/>
    <path d="M28 36h-8v4h8c2 0 3-1 3-2s-1-2-3-2z" fill="#E70063"/>
    <text x="32" y="48" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">bKash</text>
  </svg>
);

export const NogodLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#FF0000"/>
    <circle cx="32" cy="24" r="6" fill="white"/>
    <rect x="24" y="32" width="16" height="4" rx="2" fill="white"/>
    <rect x="20" y="38" width="24" height="4" rx="2" fill="white"/>
    <text x="32" y="52" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">nagad</text>
  </svg>
);

export const RocketLogo = () => (
  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
    <rect width="64" height="64" rx="12" fill="#800880"/>
    <path d="M32 16l8 16-8 4-8-4 8-16z" fill="white"/>
    <circle cx="32" cy="26" r="3" fill="#800880"/>
    <path d="M24 36l4 8 4-2 4 2 4-8-8-4-8 4z" fill="white"/>
    <text x="32" y="52" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">Rocket</text>
  </svg>
);
