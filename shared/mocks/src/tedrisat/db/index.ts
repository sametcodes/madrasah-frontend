import { factory, primaryKey } from '@mswjs/data'
import { faker } from '../faker'
import { seedDatabase } from './seed'

export const db = factory({
  card: {
    id: primaryKey(faker.number.int),
    list_id: faker.number.int,
    author: faker.string.uuid,
    is_public: faker.datatype.boolean,
    content: {
      front: faker.word.adjective,
      back: faker.lorem.paragraphs,
      note: faker.lorem.sentence,
    },
    type: () => faker.helpers.arrayElement(['hadeeth', 'vocabulary']),
    image_source: () => faker.image.urlLoremFlickr({ category: 'nature' }),
  },
})

seedDatabase(db, faker)
