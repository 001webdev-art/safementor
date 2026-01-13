import React from 'react';

export const SafeMentorLogo = ({ className = "float-gentle", size = 40 }: { className?: string, size?: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        className={className}
        aria-hidden="true"
    >
        <circle cx="20" cy="20" r="18" fill="#A8B5A0" opacity="0.3" />
        <path
            d="M20 8C20 8 12 14 12 22C12 26 15 30 20 30C25 30 28 26 28 22C28 14 20 8 20 8Z"
            fill="#7B8F71"
            opacity="0.8"
        />
        <path
            d="M20 12V26M16 18C16 18 18 20 20 20C22 20 24 18 24 18"
            stroke="#5A6B52"
            strokeWidth="1.5"
            strokeLinecap="round"
        />
    </svg>
);

export const KosaIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 1L3 5V9C3 13.5 6 17.5 10 19C14 17.5 17 13.5 17 9V5L10 1Z" />
    </svg>
);

export const GdprIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2ZM9 14L5 10L6.41 8.59L9 11.17L13.59 6.58L15 8L9 14Z" />
    </svg>
);

export const ParentsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2C7.79 2 6 3.79 6 6C6 8.21 7.79 10 10 10C12.21 10 14 8.21 14 6C14 3.79 12.21 2 10 2ZM10 12C6.69 12 2 13.69 2 17V18H18V17C18 13.69 13.31 12 10 12Z" />
    </svg>
);

export const CuriosityIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="#5A6B52" strokeWidth="2" fill="none" />
        <path d="M16 12V16L19 19" stroke="#5A6B52" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="8" r="1.5" fill="#5A6B52" />
    </svg>
);

export const ConnectionIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 26V12L16 4L26 12V26H20V18H12V26H6Z" stroke="#5A6B52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
);

export const TrustIcon = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 4L20 12H24L19 16L21 24L16 20L11 24L13 16L8 12H12L16 4Z" stroke="#5A6B52" strokeWidth="2" fill="none" />
    </svg>
);

export const QuoteIcon = ({ className }: { className?: string }) => (
    <svg width="48" height="48" viewBox="0 0 48 48" className={className}>
        <path d="M14 24C14 18 18 14 24 14V10C16 10 10 16 10 24V38H22V26H14V24ZM34 24C34 18 30 14 36 14V10C28 10 22 16 22 24V38H34V26H26V24H34Z" fill="currentColor" />
    </svg>
);

export const MenuIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);
