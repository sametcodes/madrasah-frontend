export type Card = {
  id: number
  type: 'hadeeth' | 'vocabulary'
  author_id: number
  is_public: boolean
  image_source: string
  content: any
}
