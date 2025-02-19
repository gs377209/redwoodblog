// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/7/writing-stories/args

import type { Meta, StoryObj } from '@storybook/react'
import {
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from 'types/graphql'

import Comment from './Comment'

const meta: Meta<typeof Comment> = {
  component: Comment,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Comment>

export const Primary: Story = {
  args: {
    comment: {
      id: 1,
      name: 'Rob Cameron',
      body: 'This is the first comment!',
      createdAt: '2020-01-01T12:34:56Z',
      postId: 1,
    },
  },
}

export const Moderator: Story = {
  parameters: {
    msw: {
      handlers: [
        mockGraphQLMutation<
          DeleteCommentMutation,
          DeleteCommentMutationVariables
        >('DeleteCommentMutation', (_variables, { ctx }) => {
          const id = Math.floor(Math.random() * 1000)
          ctx.delay(1000)
          return {
            deleteComment: {
              id,
              postId: 1,
            },
          }
        }),
      ],
    },
  },
  decorators: [
    (Story) => {
      mockCurrentUser({
        id: 2,
        email: 'moderator@moderator.com',
        roles: 'moderator',
      })

      return <Story />
    },
  ],
  args: {
    comment: {
      id: 1,
      name: 'Rob Cameron',
      body: 'This is the first comment!',
      createdAt: '2020-01-01T12:34:56Z',
      postId: 1,
    },
  },
}
