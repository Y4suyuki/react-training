import { Square } from '../../src/functions/square'
import { render } from '@testing-library/react'

describe('Square', () => {
  const square = render(
    <Square value={'1'} onClick={() => console.log('Hello')} />
  )

  test('Snapshot', () => {
    expect(square).toMatchSnapshot()
  })
})
