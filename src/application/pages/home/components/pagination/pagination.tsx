import './styles.scss'

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

export const Pagination: React.FC = () => {
  return (
    <>
      <div className='containerPagination'>
        <h1>Pokedex</h1>
        <div className='pagination'>
          <button className='btnPagination'> <BsChevronLeft/> </button>
          <span className='page'>0 de 1</span>
          <button className='btnPagination'> <BsChevronRight /> </button>
        </div>
      </div>
    </>
  )
}
