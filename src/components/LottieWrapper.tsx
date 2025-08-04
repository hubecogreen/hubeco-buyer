"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 rounded" style={{ width: '100%', height: '100%' }} />
});

interface LottieWrapperProps {
  animationData: any;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
}

const LottieWrapper = ({ animationData, loop = true, className, style, children }: LottieWrapperProps) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      className={className}
      style={style}
    />
  );
};

export default LottieWrapper; 