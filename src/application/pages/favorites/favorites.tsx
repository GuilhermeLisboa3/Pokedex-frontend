import { Footer } from '@/application/components'
import './styles.scss'

import { Container } from 'reactstrap'
import Link from 'next/link'

export const Favorites: React.FC = () => {
  return (
    <>
      <Container className='favorite-container'>
        <Link href={'/'} className='favorite-container-logo'>
          <img src="/pokedexLogo.png" alt="logo" />
        </Link>
        <p className='favorite-text'>Você não tem pokemons favoritado.</p>
        <Footer/>
      </Container>
    </>
  )
}
