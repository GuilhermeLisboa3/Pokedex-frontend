import faker from 'faker'

export const ApiPokemonParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  sprites: { front_default: faker.internet.url() },
  types: [{ type: { name: faker.name.findName() } }],
  height: 75,
  weight: 30,
  base_experience: 170,
  abilities: [{ ability: { name: faker.name.findName() } }],
  species: { url: faker.internet.url() },
  stats: [
    { base_stat: 50 },
    { base_stat: 60 },
    { base_stat: 70 },
    { base_stat: 80 },
    { base_stat: 90 },
    { base_stat: 100 }
  ]
}

export const PokemonParams = { idPokemon: faker.datatype.uuid() }
