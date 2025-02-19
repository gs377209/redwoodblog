import { render, screen } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './CommentsCell'
import { standard } from './CommentsCell.mock'

describe('CommentsCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    render(<Empty />)
    expect(screen.getByText('No comments yet')).toBeInTheDocument()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} postId={1} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    const comments = standard().comments
    render(<Success comments={comments} postId={1} />)

    comments.forEach((comment) => {
      expect(screen.getByText(comment.body)).toBeInTheDocument()
    })
  })
})
