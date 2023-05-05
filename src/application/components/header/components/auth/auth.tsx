import './styles.scss'

import Link from 'next/link'
import { Container } from 'reactstrap'
import { FaHeart, FaUserAlt } from 'react-icons/fa'
import { Modal } from '@/application/components/modal/modal'

export const Auth: React.FC = () => {
  return (
    <>
      <Container className='auth'>
        <div className='auth-icons'>
          <button className='auth-icon-navigate'>
            <FaUserAlt className='auth-icon' />
          </button>

          <button className='auth-icon-navigate'>
            <Link href="/favorites">
              <FaHeart className='auth-icon'/>
            </Link>
          </button>
        </div>
        <Modal modalOpen={false} classNameModal='auth-modal' overlayClassName='auth-modal-overlay'>
          <Link href="/" className='auth-link'>
            <span>Delete account</span >
          </Link>
          <span className='auth-link'>Exit</span>
        </Modal>
      </Container>
    </>
  )
}
