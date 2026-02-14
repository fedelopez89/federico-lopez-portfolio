import { FC, useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  placeholder?: string;
}

const ImageContainer = styled.div<{
  $width?: number | string;
  $height?: number | string;
}>`
  position: relative;
  width: ${({ $width }) =>
    typeof $width === 'number' ? `${$width}px` : $width || '100%'};
  height: ${({ $height }) =>
    typeof $height === 'number' ? `${$height}px` : $height || 'auto'};
  overflow: hidden;
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const StyledImage = styled.img<{ $objectFit?: string; $isLoaded?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
  transition: opacity 0.3s ease-in-out;
  opacity: ${({ $isLoaded }) => ($isLoaded ? 1 : 0)};
  display: block;
`;

const Placeholder = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.surfaceAlt};
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 3px solid ${({ theme }) => theme.colors.border};
    border-top-color: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
  }
`;

export const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  priority = false,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <ImageContainer $width={width} $height={height}>
      {!isLoaded && <Placeholder />}
      <StyledImage
        ref={imgRef}
        src={isInView ? src : placeholder}
        alt={alt}
        $objectFit={objectFit}
        $isLoaded={isLoaded}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        {...props}
      />
    </ImageContainer>
  );
};
