'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ProductImageProps {
  src: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function ProductImage({ src, alt, className, width = 400, height = 400 }: ProductImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc(null);
    }
  };

  if (!imageSrc || imageError) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-primary-100 ${className || ''}`}>
        <i className="bx bx-image text-6xl text-primary-400"></i>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      unoptimized={imageSrc.startsWith('/uploads/')}
    />
  );
}
