import { MutationResolvers, QueryResolvers } from 'types/graphql'

import { removeNulls } from '@redwoodjs/api'
import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

const verifyOwnership = async ({ id }: { id: number }) => {
  if (await adminPost({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this post")
  }
}

export const adminPosts: QueryResolvers['adminPosts'] = () => {
  return db.post.findMany({ where: { userId: context.currentUser?.id ?? 0 } })
}

export const adminPost: QueryResolvers['adminPost'] = ({ id }) => {
  return db.post.findFirst({
    where: { id, userId: context.currentUser?.id ?? 0 },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: {
      ...input,
      userId: context.currentUser?.id ?? 0,
    },
  })
}

export const updatePost: MutationResolvers['updatePost'] = async ({
  id,
  input,
}) => {
  await verifyOwnership({ id })

  return db.post.update({
    data: removeNulls(input),
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = async ({ id }) => {
  await verifyOwnership({ id })

  return db.post.delete({
    where: { id },
  })
}
