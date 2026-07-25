import React from 'react';
import nabisLogoImg from '../assets/nabis.png';

interface NabisLogoIconProps {
  className?: string;
  alt?: string;
}

export const NabisLogoIcon: React.FC<NabisLogoIconProps> = ({ 
  className = "w-6 h-6",
  alt = "NABIS Logo"
}) => {
  return (
    <img 
      src={nabisLogoImg} 
      alt={alt} 
      className={`object-contain pl-1 ${className}`} 
    />
  );
};

export const ParjaLogoIcon = NabisLogoIcon;
