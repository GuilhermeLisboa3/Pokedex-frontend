
export interface Pokemon {
  idPokemon: string
  namePokemon: string
  photoPokemon: string
  urlSpecies: string
  types: Array<{ type: { name: string } }>
}
