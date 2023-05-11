import './styles.scss'
import { Modal } from '../modal/modal'
import { DataPokemon } from './components'
import { type ApiPokemon } from '@/domain/models'

import { IoMdClose } from 'react-icons/io'

type Props = {
  pokemon: ApiPokemon
  pokemonDescription: string
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalDataPokemon: React.FC<Props> = ({ pokemon, pokemonDescription, isOpen, setIsOpen }: Props) => {
  const closeModal = (): void => {
    setIsOpen(false)
  }
  return (
    <>
      <Modal modalOpen={isOpen} classNameModal='modal-data-pokemon-modal'>
        <div data-testid='icon-close' className='modal-data-pokemon-div-icon' onClick={() => { closeModal() }}><IoMdClose className='modal-data-pokemon-icon-close'/></div>
        <DataPokemon pokemon={pokemon} pokemonDescription={pokemonDescription}/>
      </Modal>
    </>
  )
}
