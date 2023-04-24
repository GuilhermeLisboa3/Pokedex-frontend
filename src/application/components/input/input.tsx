import './styles.scss'
import { type ReactNode } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon: ReactNode
  hasError: 'bg-danger' | 'bg-success'
}

export const Input: React.FC<Props> = ({ icon, hasError, ...props }: Props) => {
  return (
    <>
      <div className='formGroup'>
        <label htmlFor= {props.name} className={['label', `${hasError}`].join(' ')}>
          { icon }
        </label>
        <input {...props} className='inputName'/>
      </div>
    </>
  )
}
