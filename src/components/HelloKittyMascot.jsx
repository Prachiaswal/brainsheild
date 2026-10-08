import React from 'react';

export default function HelloKittyMascot({ size = 48, className = '' }) {
  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 85" 
        className="w-full h-full drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hello Kitty Outer Head Contour (White with crisp black outline) */}
        <ellipse cx="50" cy="45" rx="38" ry="30" fill="#FFFFFF" stroke="#2B121E" strokeWidth="4" />

        {/* Ears */}
        {/* Left Ear */}
        <path d="M 18 28 C 12 10, 28 12, 32 20 Z" fill="#FFFFFF" stroke="#2B121E" strokeWidth="4" strokeLinejoin="round" />
        {/* Right Ear */}
        <path d="M 82 28 C 88 10, 72 12, 68 20 Z" fill="#FFFFFF" stroke="#2B121E" strokeWidth="4" strokeLinejoin="round" />

        {/* Eyes (Cute black ovals) */}
        <ellipse cx="34" cy="46" rx="4" ry="5.5" fill="#2B121E" />
        <ellipse cx="66" cy="46" rx="4" ry="5.5" fill="#2B121E" />

        {/* Nose (Cute yellow oval) */}
        <ellipse cx="50" cy="52" rx="4.5" ry="3.5" fill="#FFD166" stroke="#2B121E" strokeWidth="2" />

        {/* Whiskers */}
        {/* Left Whiskers */}
        <path d="M 10 42 L 24 44" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 8 49 L 24 49" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 10 56 L 24 54" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />

        {/* Right Whiskers */}
        <path d="M 90 42 L 76 44" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 92 49 L 76 49" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 90 56 L 76 54" stroke="#2B121E" strokeWidth="3.5" strokeLinecap="round" />

        {/* Iconic Hello Kitty Red/Pink Bow on Left Ear */}
        <g transform="translate(18, 8) scale(0.95)">
          {/* Bow Left Knot */}
          <ellipse cx="8" cy="14" rx="8" ry="7" fill="#F43F5E" stroke="#2B121E" strokeWidth="3" />
          {/* Bow Right Knot */}
          <ellipse cx="26" cy="14" rx="8" ry="7" fill="#F43F5E" stroke="#2B121E" strokeWidth="3" />
          {/* Bow Center Center Circle */}
          <circle cx="17" cy="14" r="5.5" fill="#FB7185" stroke="#2B121E" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
