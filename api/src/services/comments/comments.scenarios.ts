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
    redwood: (scenario) => ({
      data: {
        title: 'Redwood Leaves',
        body: 'The quick brown fox jumped over the lazy dog.',
        userId: scenario.user.kris.id,
      },
    }),
    rootSys: (scenario) => ({
      data: {
        title: 'Root Systems',
        body: 'The five boxing wizards jump quickly.',
        userId: scenario.user.rob.id,
      },
    }),
  },
  comment: {
    jane: (scenario) => ({
      data: {
        name: 'Jane Doe',
        body: 'I like trees',
        postId: scenario.post.redwood.id,
      },
    }),
    john: (scenario) => ({
      data: {
        name: 'John Doe',
        body: 'Hug a tree today',
        postId: scenario.post.rootSys.id,
      },
    }),
  },
})

export const postOnly = defineScenario<
  Prisma.PostCreateArgs | Prisma.UserCreateArgs,
  'post' | 'user'
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
    bark: (scenario) => ({
      data: {
        title: 'Bark',
        body: "A tree's bark is worse than its bite",
        userId: scenario.user.kris.id,
      },
    }),
  },
})

export type StandardScenario = typeof standard
export type PostOnlyScenario = typeof postOnly
