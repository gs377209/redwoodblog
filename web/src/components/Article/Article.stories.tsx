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

import Article from './Article'

const meta: Meta<typeof Article> = {
  component: Article,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Article>

const ARTICLE = {
  id: 1,
  title: 'First Post',
  body: `Neutra tacos hot chicken prism raw denim, put a bird on it enamel pin post-ironic vape cred DIY. Street art next level umami squid. Hammock hexagon glossier 8-bit banjo. Neutra la croix mixtape echo park four loko semiotics kitsch forage chambray. Semiotics salvia selfies jianbing hella shaman. Letterpress helvetica vaporware cronut, shaman butcher YOLO poke fixie hoodie gentrify woke heirloom.`,
  user: {
    name: 'Gerrod',
    email: 'g@g.com',
    hashedPassword: 'pass',
    salt: 'salt',
    id: 1,
    posts: [],
    roles: 'moderator',
  },
  createdAt: '2020-01-01T12:34:56Z',
}

export const Primary: Story = {
  args: {
    article: ARTICLE,
  },
}

export const Summary: Story = {
  args: {
    article: ARTICLE,
    summary: true,
  },
}
