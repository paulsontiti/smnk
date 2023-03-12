// __tests__/index.test.jsx

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import mockRouter from 'next-router-mock';
import LoginRouterMock from './loginRouterMock'

describe('Home', () => {
  it('renders a heading', () => {
    render(<LoginRouterMock />)

    const heading = screen.getByRole('heading')

    expect(heading).toBeInTheDocument()
  })
})