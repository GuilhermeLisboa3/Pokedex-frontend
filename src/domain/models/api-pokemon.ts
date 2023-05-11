
export interface ApiPokemon {
  id: string
  name: string
  sprites: { front_default: string }
  types: Array<{ type: { name: string } }>
  height: number
  weight: number
  base_experience: number
  abilities: Array<{ ability: { name: string } }>
  species: { url: string }
  stats: Array<{ base_stat: number }>
}

export interface SpeciesPokemon { flavor_text_entries: Array<{ flavor_text: string, language: { name: string } }>}
