import './styles.scss'
import { Footer } from '@/application/components'
import { type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { type GetDataPokemon } from '@/domain/use-cases/api-pokemon'
import { type Pokemon } from '@/domain/models'

import { Container } from 'reactstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  getListFavoritePokemon: GetListFavoritePokemon
  getDataPokemon: GetDataPokemon
}

export const Favorites: React.FC<Props> = ({ getListFavoritePokemon, getDataPokemon }: Props) => {
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])

  useEffect(() => {
    getListFavoritePokemon().then((result: Pokemon[]) => {
      setListFavoritePokemon(result)
      listPokemonHandler()
    })
  })

  const listPokemonHandler = async (): Promise<void> => {
    listFavoritePokemon.map(async (pokemon) => {
      await getDataPokemon({ name: pokemon.idPokemon })
    })
  }

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
