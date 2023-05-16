import './styles.scss'
import { Footer } from '@/application/components'
import { type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'

import { Container } from 'reactstrap'
import Link from 'next/link'
import { useEffect } from 'react'

type Props = {
  getListFavoritePokemon: GetListFavoritePokemon
}

export const Favorites: React.FC<Props> = ({ getListFavoritePokemon }: Props) => {
  useEffect(() => {
    getListFavoritePokemon()
  })

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
