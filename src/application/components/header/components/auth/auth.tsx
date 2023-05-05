import './styles.scss'

import Link from 'next/link'
import { Container } from 'reactstrap'
import { FaHeart, FaUserAlt } from 'react-icons/fa'
import { Modal } from '@/application/components/modal/modal'
import { useState } from 'react'

export const Auth: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const handlerModal = (): void => { setModalOpen(!modalOpen) }
  return (
    <>
      <Container className='auth'>
        <div className='auth-icons'>
          <button data-testid='auth-button' className='auth-icon-navigate' onClick={handlerModal}>
            <FaUserAlt className='auth-icon' />
          </button>

          <button className='auth-icon-navigate'>
            <Link href="/favorites">
              <FaHeart className='auth-icon'/>
            </Link>
          </button>
        </div>
        <Modal data-testid='modal' modalOpen={modalOpen} classNameModal='auth-modal' overlayClassName='auth-modal-overlay'>
          <Link href="/" className='auth-link'> Deletar conta </Link>
          <span className='auth-link'>Sair</span>
        </Modal>
      </Container>
    </>
  )
}
