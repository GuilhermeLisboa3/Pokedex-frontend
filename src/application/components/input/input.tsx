import './styles.scss'
import { type ReactNode } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon: ReactNode
  hasError: 'bg-danger' | 'bg-success'
  state: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

export const Input: React.FC<Props> = ({ icon, hasError, setState, state, name, ...props }: Props) => {
  return (
    <>
      <div className='input-form-group'>
        <label htmlFor= {name} className={['input-label', `${hasError}`].join(' ')}>
          { icon }
        </label>
        <input {...props} data-testid={name} title={state} id={name} autoComplete="off" className='input-name' onChange={e => { setState(e.target.value) } }/>
      </div>
    </>
  )
}
