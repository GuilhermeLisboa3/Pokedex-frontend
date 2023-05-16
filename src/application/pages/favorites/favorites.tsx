import './styles.scss'
import { CardPokemon, Footer } from '@/application/components'
import { type GetListFavoritePokemon } from '@/domain/use-cases/pokemon'
import { type GetDataPokemon } from '@/domain/use-cases/api-pokemon'
import { type ApiPokemon, type Pokemon } from '@/domain/models'

import { Container } from 'reactstrap'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PokemonProvider } from '@/application/contexts'

type Props = {
  getListFavoritePokemon: GetListFavoritePokemon
  getDataPokemon: GetDataPokemon
}

export const Favorites: React.FC<Props> = ({ getListFavoritePokemon, getDataPokemon }: Props) => {
  const [listFavoritePokemon, setListFavoritePokemon] = useState<Pokemon[]>([])
  const [listPokemon, setListPokemon] = useState<ApiPokemon[]>([])

  useEffect(() => {
    getListFavoritePokemon().then((result: Pokemon[]) => {
      setListFavoritePokemon(result)
      listPokemonHandler()
    })
  })

  const listPokemonHandler = async (): Promise<void> => {
    listFavoritePokemon.map(async (pokemon) => {
      const dataPokemon = await getDataPokemon({ name: pokemon.idPokemon })
      setListPokemon([...listPokemon, dataPokemon.pokemon])
    })
  }

  const fakeFunction = async (): Promise<void> => {}

  return (
    <>
    <PokemonProvider listFavoritePokemon={listFavoritePokemon} getDataPokemon={fakeFunction} deletePokemon={fakeFunction}>
      <Container className='favorite-container'>
        <Link href={'/'} className='favorite-container-logo'>
          <img src="/pokedexLogo.png" alt="logo" />
        </Link>
        <div className='favorite-list-pokemons'>
        { listPokemon.length > 0
          ? listPokemon.map(pokemon => (<CardPokemon pokemon={pokemon} key={pokemon.id}/>))
          : <p className='favorite-text'>Você não tem pokemons favoritado.</p>
        }
        </div>
        <Footer/>
      </Container>
    </PokemonProvider>
    </>
  )
}
