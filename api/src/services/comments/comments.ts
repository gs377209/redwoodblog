import type {
  QueryResolvers,
  CommentRelationResolvers,
  MutationResolvers,
} from 'types/graphql'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const comments: QueryResolvers['comments'] = ({ postId }) => {
  return db.comment.findMany({ where: { postId } })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const Comment: CommentRelationResolvers = {
  post: async (_obj, { root }) => {
    const maybePost = await db.comment
      .findUnique({ where: { id: root?.id } })
      .post()

    if (!maybePost) {
      throw new Error('Could not resolve author')
    }

    return maybePost
  },
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  return db.comment.create({
    data: input,
  })
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  requireAuth({ roles: 'moderator' })
  return db.comment.delete({
    where: { id },
  })
}
