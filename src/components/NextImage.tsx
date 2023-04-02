import Image, { ImageProps } from 'next/image';
import * as React from 'react';
import clsx from 'clsx';

type NextImageProps = {
  useSkeleton?: boolean;
  imgClassName?: string;
  blurClassName?: string;
  alt: string;
  width: string | number;
} & (
    | { width: string | number; height: string | number }
    | { layout: 'fill'; width?: string | number; height?: string | number }
  ) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function NextImage({
  useSkeleton = false,
  src,
  loader,
  width,
  height,
  alt,
  className,
  imgClassName,
  blurClassName,
  ...rest
}: NextImageProps) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete'
  );
  const widthIsSet = className?.includes('w-') ?? false;
  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={className}
    >
      <Image
        className={clsx(
          imgClassName,
          status === 'loading' && clsx('backdrop-blur-sm', blurClassName)
        )}
        loader={loader}
        src={src}
        alt={alt}
        onLoadingComplete={() => { }}
        layout='fill'
        objectFit='scale-down'
        {...rest}
      />
    </figure>
  );
}
