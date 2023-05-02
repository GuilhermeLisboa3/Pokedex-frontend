import './styles.scss'
import { Header } from '@/application/components'

import { Container } from 'reactstrap'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaLinkedinIn, FaGithub, FaInstagram, FaRegCopyright, FaRegHeart } from 'react-icons/fa'
import Link from 'next/link'

export const Home: React.FC = () => {
  return (
    <>
      <Container className='homeContainer'>
        <Header/>
        <main>
          <div className='containerPagination'>
            <h1>Pokedex</h1>
            <div className='pagination'>
              <button className='btnPagination'> <BsChevronLeft/> </button>
              <span className='page'>0 de 1</span>
              <button className='btnPagination'> <BsChevronRight /> </button>
            </div>
          </div>
          <div className='listPokemons'>
            <div className='cardPokemon'>
              <img className='imgPokemon' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/448.png' alt=''/>
              <button className='buttonFavorite'> <FaRegHeart/> </button>
              <p className='idPokemon'>N° 1</p>
              <p className='namePokemon'>Lucario</p>
              <p className='typesPokemon'>
                <span className='type fire'>fire</span>
                <span className='type water'>water</span>
              </p>
            </div>
          </div>
        </main>
        <footer>
          <p className='name'><FaRegCopyright/> Guilherme Gonçalves Lisboa</p>
          <div className='icons'>
            <Link href="https://www.linkedin.com/in/guilherme-gon%C3%A7alves-lisboa-abb8b0227/" target='_blank' className='linkIcon'>
              <FaLinkedinIn className='icon'/>
            </Link>
            <Link href="https://github.com/GuilhermeLisboa3" target='_blank' className='linkIcon'>
              <FaGithub className='icon'/>
            </Link>
            <Link href="https://www.instagram.com/guime.lisboa/" target='_blank' className='linkIcon'>
              <FaInstagram className='icon'/>
            </Link>
          </div>
        </footer>
      </Container>
    </>
  )
}
