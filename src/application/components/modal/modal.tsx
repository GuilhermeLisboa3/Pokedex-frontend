import ReactModal from 'react-modal'

type Props = {
  modalOpen: boolean
  classNameModal: string
  overlayClassName?: string
  closeModal?: () => void
  children: React.ReactNode
}

export const Modal: React.FC<Props> = ({ children, classNameModal, closeModal, modalOpen, overlayClassName }: Props) => {
  return (
    <>
      <ReactModal isOpen={modalOpen} onRequestClose={closeModal} shouldCloseOnEsc={true} className={classNameModal} overlayClassName={overlayClassName}>
        {children}
      </ReactModal>
    </>
  )
}
