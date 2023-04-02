import clsx from 'clsx';

interface DotsProps {
  children?: any
  className?: string
}

export default function Dots({ children = <span />, className }: DotsProps) {
  return (
    <>
      <style>
        {`
          .dots::after {
            content: '.';
          }
        `}
      </style>
      <span
        className={clsx('after:inline-block dots after:animate-ellipsis after:w-4 after:text-left', className)}
      >
        {children}
      </span>
    </>
  )
}
