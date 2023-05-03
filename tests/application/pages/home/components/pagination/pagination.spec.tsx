import { Pagination } from '@/application/pages/home/components'

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Pagination', () => {
  const setPageSpy = jest.fn()
  it('should call setPage with correct value', async () => {
    render(<Pagination count={50} perPage={25} page={2} setPage={setPageSpy}/>)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setPageSpy).toHaveBeenCalledWith(1)
  })

  it('should call setPage with correct value', async () => {
    render(<Pagination count={50} perPage={25} page={0} setPage={setPageSpy}/>)
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(setPageSpy).toHaveBeenCalledWith(1)
  })

  it('should not call setPage with correct value', async () => {
    render(<Pagination count={50} perPage={25} page={0} setPage={setPageSpy}/>)
    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setPageSpy).not.toHaveBeenCalled()
  })

  it('should not call setPage with correct value', async () => {
    render(<Pagination count={50} perPage={25} page={1} setPage={setPageSpy}/>)
    fireEvent.click(screen.getAllByRole('button')[1])
    expect(setPageSpy).not.toHaveBeenCalled()
  })
})
