import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import clsx from 'clsx';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
}

export const ImageWithFallback = ({ src, alt, className }: ImageWithFallbackProps) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={clsx(
          'flex items-center justify-center bg-neutral-200 text-neutral-400',
          className,
        )}
      >
        <ImageOff className="h-1/3 w-1/3" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={className}
    />
  );
};

export default ImageWithFallback;
