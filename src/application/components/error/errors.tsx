import './styles.scss'

type Props = { reload: () => void, error: string }

export const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <>
      <div className='error'>
        <img src="lucario.png" alt="lucario" className='error-img'/>
        <div>
          <span>{error}</span>
          <button onClick={reload} className='button'>Tentar novamente</button>
        </div>
        <img src="machoke.png" alt="machoke" className='error-img'/>
      </div>
    </>
  )
}
