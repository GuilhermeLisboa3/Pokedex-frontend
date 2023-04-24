import { fireEvent, screen } from '@testing-library/react'

export const populateField = (fieldName: string, value: string): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
