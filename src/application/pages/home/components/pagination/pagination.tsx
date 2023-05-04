import './styles.scss'

import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

type Props = {
  setPage: React.Dispatch<React.SetStateAction<number>>
  page: number
  count: number
  perPage: number
}

export const Pagination: React.FC<Props> = ({ count, page, setPage, perPage }: Props) => {
  const allPages = Math.ceil(count / perPage)
  const onLeftClick = (): void => {
    if (page > 0) {
      setPage(page - 1)
    }
  }
  const onRightClick = (): void => {
    if (page + 1 !== allPages) {
      setPage(page + 1)
    }
  }
  return (
    <>
      <div className='pagination-container'>
        <h1>Pokedex</h1>
        <div className='pagination'>
          <button className='pagination-btn' onClick={onLeftClick}> <BsChevronLeft/> </button>
          <span className='pagination-page'>{`${page + 1} de ${allPages}`}</span>
          <button className='pagination-btn' onClick={onRightClick}> <BsChevronRight /> </button>
        </div>
      </div>
    </>
  )
}
