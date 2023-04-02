import Typography from '@/components/Typography'
import clsx from 'clsx'
import React, { FC } from 'react'

export interface ModalActionErrorProps {
  className?: string
}

const ModalError: FC<ModalActionErrorProps> = ({ className = '', children }) => {
  if (!children) return <></>

  return (
    <Typography variant="xs" weight={700} className={clsx('text-center text-red', className)}>
      {children}
    </Typography>
  )
}

export default ModalError
