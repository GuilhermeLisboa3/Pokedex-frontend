import './styles.scss'
import { Modal } from '../modal/modal'
import { DataPokemon } from './components'
import { type Pokemon } from '@/domain/models'

import { IoMdClose } from 'react-icons/io'

type Props = {
  pokemon: Pokemon
  pokemonDescription: string
}

export const ModalDataPokemon: React.FC<Props> = ({ pokemon, pokemonDescription }: Props) => {
  return (
    <>
        <Modal modalOpen={true} classNameModal='modal-data-pokemon-modal'>
          <div className='modal-data-pokemon-div-icon'><IoMdClose className='modal-data-pokemon-icon-close'/></div>
          <DataPokemon pokemon={pokemon} pokemonDescription={pokemonDescription}/>
        </Modal>
    </>
  )
}
