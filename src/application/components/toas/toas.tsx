import React from 'react'
import { Toast, ToastBody } from 'reactstrap'

type Props = {
  isOpen: boolean
  message: string
  color: string
}

export const Toas: React.FC<Props> = ({ isOpen, message, color }: Props) => {
  return (
    <>
      <Toast
        className={`${color} text-white fixed-top ms-auto mt-3`}
        isOpen={isOpen}
      >
        <ToastBody className="text-center">{message}</ToastBody>
      </Toast>
    </>
  )
}
