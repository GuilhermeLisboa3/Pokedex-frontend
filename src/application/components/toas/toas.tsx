import React from 'react'
import { Toast, ToastBody } from 'reactstrap'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setLodding?: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  color: string
}

export const Toas: React.FC<Props> = ({ isOpen, setIsOpen, setLodding, message, color }: Props) => {
  setTimeout(() => {
    setIsOpen(false)
    if (setLodding) setLodding(false)
  }, 1000 * 3)
  return (
    <>
      <Toast
        data-testid='toas'
        className='text-white fixed-top ms-auto mt-3'
        isOpen={isOpen}
      >
        <ToastBody className={`${color} text-center`}>{message}</ToastBody>
      </Toast>
    </>
  )
}
