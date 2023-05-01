import faker from 'faker'

export const PokemonParams = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  sprites: { front_default: faker.internet.url() },
  types: [{ type: { name: faker.name.findName() } }],
  height: faker.random.alphaNumeric(4),
  weight: faker.random.alphaNumeric(4),
  base_experience: faker.random.alphaNumeric(10),
  abilities: [{ ability: { name: faker.name.findName() } }],
  species: { url: faker.internet.url() },
  stats: [{ base_stat: faker.random.alphaNumeric(50) }]
}
