import { PostRelationResolvers, QueryResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts: QueryResolvers['posts'] = () => {
  return db.post.findMany()
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({ where: { id } })
}

export const Post: PostRelationResolvers = {
  user: async (_obj, { root }) => {
    const maybeAuthor = await db.post
      .findFirst({ where: { id: root.id } })
      .user()

    if (!maybeAuthor) {
      throw new Error('Could not resolve author')
    }

    return maybeAuthor
  },
}
