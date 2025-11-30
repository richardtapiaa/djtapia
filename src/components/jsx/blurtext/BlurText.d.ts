import { ReactNode } from 'react';

export interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: any;
  animationTo?: any;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

declare const BlurText: React.FC<BlurTextProps>;
export default BlurText;
