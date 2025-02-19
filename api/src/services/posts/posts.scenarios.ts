import type { Prisma } from '@prisma/client'

export const standard = defineScenario<
  Prisma.PostCreateArgs | Prisma.UserCreateArgs | Prisma.CommentCreateArgs,
  'post' | 'user' | 'comment'
>({
  user: {
    kris: {
      data: {
        name: 'Kris',
        email: 'kris@kris.com',
        hashedPassword: 'pass',
        salt: 'salt',
      },
    },
    rob: {
      data: {
        name: 'rob',
        email: 'rob@rob.com',
        hashedPassword: 'pass',
        salt: 'salt',
      },
    },
  },
  post: {
    first: (scenario) => ({
      data: {
        title: 'First Post',
        body: 'test',
        userId: scenario.user.kris.id,
      },
    }),
  },
  comment: {
    first: (scenario) => ({
      data: {
        name: 'First Comment',
        body: 'String',
        postId: scenario.post.first.id,
      },
    }),
    response: (scenario) => ({
      data: {
        name: 'First Comment Response',
        body: 'String',
        postId: scenario.post.first.id,
      },
    }),
  },
})

export type StandardScenario = typeof standard
