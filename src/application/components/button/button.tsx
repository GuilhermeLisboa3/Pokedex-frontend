type Props = {
  type: 'button' | 'submit' | 'reset' | undefined
  text: string
  isFormInvalid?: boolean
}

export const Button: React.FC<Props> = ({ type, text, isFormInvalid }: Props) => {
  return (
    <>
      <button type={type} className='button' disabled={isFormInvalid}>{ text }</button>
    </>
  )
}
