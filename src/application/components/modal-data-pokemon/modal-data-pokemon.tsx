import './styles.scss'
import { Modal } from '../modal/modal'
import { DataPokemon } from './components'

import { IoMdClose } from 'react-icons/io'

export const ModalDataPokemon: React.FC = () => {
  return (
    <>
        <Modal modalOpen={true} classNameModal='modal-data-pokemon-modal'>
          <div className='modal-data-pokemon-div-icon'><IoMdClose className='modal-data-pokemon-icon-close'/></div>
          <DataPokemon/>
        </Modal>
    </>
  )
}
