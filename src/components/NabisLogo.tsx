import React from 'react';

interface NabisLogoIconProps {
  className?: string;
}

export const NabisLogoIcon: React.FC<NabisLogoIconProps> = ({ 
  className = "w-6 h-6" 
}) => {
  return (
    <svg 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Gradient Shield */}
      <path 
        d="M24 4L8 10.5V23C8 34 14.8 43.2 24 45.8C33.2 43.2 40 34 40 23V10.5L24 4Z" 
        fill="url(#nabis-shield-grad)" 
        stroke="#38BDF8" 
        strokeWidth="1.5"
      />
      
      {/* Inner Heart Emblem */}
      <path 
        d="M24 15.2C21.2 15.2 18.2 17.5 18.2 21.4C18.2 26 24 31.5 24 31.5C24 31.5 29.8 26 29.8 21.4C29.8 17.5 26.8 15.2 24 15.2Z" 
        fill="#FFFFFF"
      />
      
      {/* Empathy Arc / Hands Embrace */}
      <path 
        d="M20.2 22C20.2 22 22.2 24.5 24 24.5C25.8 24.5 27.8 22 27.8 22" 
        stroke="#0369A1" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
      
      {/* Center Star / Pupil of Care */}
      <circle cx="24" cy="19.2" r="1.8" fill="#0284C7" />

      <defs>
        <linearGradient id="nabis-shield-grad" x1="8" y1="4" x2="40" y2="45.8" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0B192C" />
          <stop offset="0.5" stopColor="#0C4A6E" />
          <stop offset="1" stopColor="#0369A1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const ParjaLogoIcon = NabisLogoIcon;
