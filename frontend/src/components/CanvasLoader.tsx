"use client";

import dynamic from 'next/dynamic';

const HarnessCanvas = dynamic(() => import('@/components/HarnessCanvas'), {
  ssr: false,
});

const CanvasLoader = () => {
  return <HarnessCanvas />;
};

export default CanvasLoader;
