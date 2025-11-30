'use client';

import { easeOut, motion } from 'motion/react';
import * as React from 'react';

interface ServiceFeature {
  text: string;
}

export interface ServiceFlipCardData {
  title: string;
  subtitle: string;
  features: ServiceFeature[];
  color: 'blue' | 'green' | 'orange';
  iconPath?: string;
  iconSvgUrl?: string;
  delay?: number;
}

interface ServiceFlipCardProps {
  data: ServiceFlipCardData;
}

const colorClasses = {
  blue: {
    borderFront: 'border-blue-500/30 hover:border-blue-500',
    iconBg: 'bg-blue-500/20',
    iconGlow: 'bg-blue-500/30',
    iconColor: 'text-blue-400',
    buttonBg: 'bg-blue-500 hover:bg-blue-600',
    buttonShadow: 'hover:shadow-blue-500/50',
    particleMain: 'bg-blue-400',
    particleSecondary: 'bg-blue-300',
    backGradient: 'from-blue-600 to-blue-800',
    backBorder: 'border-blue-500',
    checkColor: 'text-blue-200',
    ctaText: 'text-blue-600',
  },
  green: {
    borderFront: 'border-green-500/30 hover:border-green-500',
    iconBg: 'bg-green-500/20',
    iconGlow: 'bg-green-500/30',
    iconColor: 'text-green-400',
    buttonBg: 'bg-green-500 hover:bg-green-600',
    buttonShadow: 'hover:shadow-green-500/50',
    particleMain: 'bg-green-400',
    particleSecondary: 'bg-green-300',
    backGradient: 'from-green-600 to-green-800',
    backBorder: 'border-green-500',
    checkColor: 'text-green-200',
    ctaText: 'text-green-600',
  },
  orange: {
    borderFront: 'border-orange-500/30 hover:border-orange-500',
    iconBg: 'bg-orange-500/20',
    iconGlow: 'bg-orange-500/30',
    iconColor: 'text-orange-400',
    buttonBg: 'bg-orange-500 hover:bg-orange-600',
    buttonShadow: 'hover:shadow-orange-500/50',
    particleMain: 'bg-orange-400',
    particleSecondary: 'bg-orange-300',
    backGradient: 'from-orange-600 to-orange-800',
    backBorder: 'border-orange-500',
    checkColor: 'text-orange-200',
    ctaText: 'text-orange-600',
  },
};

export function ServiceFlipCard({ data }: ServiceFlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const colors = colorClasses[data.color];

  const isTouchDevice =
    typeof window !== 'undefined' && 'ontouchstart' in window;

  const handleClick = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) setIsFlipped(false);
  };

  return (
    <div
      className="w-full max-w-sm mx-auto h-[420px] sm:h-[450px] lg:h-[480px] cursor-pointer"
      style={{ perspective: '1000px' }}
      data-aos="fade-up"
      data-aos-delay={data.delay}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ 
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          MozTransformStyle: 'preserve-3d'
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
      >
        {/* FRENTE */}
        <div
          className={`absolute inset-0 backface-hidden rounded-3xl border-2 ${colors.borderFront} transition-all duration-300 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden group`}
          style={{ 
            WebkitBackfaceVisibility: 'hidden', 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)',
            WebkitTransform: 'rotateY(0deg)'
          }}
        >
          <div className={`particle w-2 h-2 ${colors.particleMain} absolute top-10 right-10 opacity-50 animate-float`}></div>
          <div className={`particle w-1.5 h-1.5 ${colors.particleSecondary} absolute bottom-20 left-10 opacity-40 animate-float`}></div>
          
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 sm:p-8 text-center">
            <div className="icon-bounce relative mb-4 sm:mb-6">
              {data.iconSvgUrl ? (
                <img src={data.iconSvgUrl} alt="" className="w-20 h-20 sm:w-24 sm:h-24" />
              ) : (
                <svg className="w-20 h-20 sm:w-24 sm:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={data.iconPath} />
                </svg>
              )}
            </div>
            
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">{data.title}</h3>
            <p className="text-gray-300 text-sm mb-4 sm:mb-6">{data.subtitle}</p>
            
            <button className={`px-6 sm:px-8 py-2.5 sm:py-3 ${colors.buttonBg} text-white rounded-full transition-all duration-300 text-sm font-semibold shadow-lg ${colors.buttonShadow}`}>
              Ver Detalles
            </button>
          </div>
        </div>
        
        
        <div
          className={`absolute inset-0 backface-hidden rounded-3xl border-2 ${colors.backBorder} bg-gradient-to-br ${colors.backGradient}`}
          style={{ 
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden'
          } as React.CSSProperties}
        >
          <div className="relative z-10 flex flex-col h-full p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">{data.title}</h3>
            <ul className="text-white text-sm sm:text-base space-y-3 sm:space-y-4 mb-4 sm:mb-6 flex-grow">
              {data.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className={`w-5 h-5 ${colors.checkColor} mr-3 mt-1 flex-shrink-0`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>{feature.text}</span>
                </li>
              ))}
            </ul>
            <button className={`px-6 py-3 bg-white ${colors.ctaText} rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 w-full shadow-lg`}>
              Solicitar Cotización
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
