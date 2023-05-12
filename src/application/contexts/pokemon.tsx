import { type Pokemon } from '@/domain/models'
import { type ReactNode, createContext } from 'react'

type Props = {
  pokemonFavorite: (namePokemon: string) => boolean
  getDataPokemon: (namePokemon: string) => Promise<void>
}

export const PokemonContext = createContext<Props>(null as any)

type ProviderProps = {
  children: ReactNode
  listFavoritePokemon: Pokemon[]
  getDataPokemon: (namePokemon: string) => Promise<void>
}

export function PokemonProvider ({ children, listFavoritePokemon, getDataPokemon }: ProviderProps): any {
  const pokemonFavorite = (namePokemon: string): boolean => {
    const pokemon = listFavoritePokemon.find(poke => poke.namePokemon === namePokemon)
    return pokemon !== undefined
  }
  return <PokemonContext.Provider value={{ pokemonFavorite, getDataPokemon }}>{children}</PokemonContext.Provider>
}
