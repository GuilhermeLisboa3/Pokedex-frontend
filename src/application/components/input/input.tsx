import './styles.scss'
import { type ReactNode } from 'react'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  icon: ReactNode
}

export const Input: React.FC<Props> = ({ icon, ...props }: Props) => {
  return (
    <>
      <div className='formGroup'>
        <label htmlFor= {props.name} className='label'>
          { icon }
        </label>
        <input {...props} className='inputName'/>
      </div>
    </>
  )
}
