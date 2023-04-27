import { Toas } from '@/application/components'

import React from 'react'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

jest.useFakeTimers()

describe('Toas', () => {
  const setIsOpen: jest.Mock = jest.fn()
  const setLodding: jest.Mock = jest.fn()

  it('should call setState if exists', () => {
    render(<Toas color='bg-danger' message='message' isOpen={false} setIsOpen={setIsOpen} setLodding={setLodding} />)
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(setIsOpen).toHaveBeenCalledWith(false)
    expect(setLodding).toHaveBeenCalledWith(false)
  })
})
