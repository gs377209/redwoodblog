import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const User: UserRelationResolvers = {
  posts: async (_obj, { root }) => {
    const maybePosts = await db.user
      .findUnique({ where: { id: root?.id } })
      .posts()

    if (!maybePosts) {
      throw new Error('Could not resolve author')
    }

    return maybePosts
  },
}
