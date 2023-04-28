import './styles.scss'
import { Button, Input } from '@/application/components'
import { type Validator } from '@/application/validation'
import { type Authentication } from '@/domain/use-cases/account'

import { IoIosLock, IoIosMail } from 'react-icons/io'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  validator: Validator
  authentication: Authentication
}

export const Login: React.FC<Props> = ({ validator, authentication }: Props) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')

  useEffect(() => { setEmailError(validator.validate('email', { email })) }, [email])
  useEffect(() => { setPasswordError(validator.validate('password', { password })) }, [password])

  const hasError = (error: string | undefined): 'bg-danger' | 'bg-success' => {
    return error === undefined ? 'bg-success' : 'bg-danger'
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    await authentication({ email, password })
  }

  return (
    <>
      <main>
        <div className='form-container'>
          <div className='imagens'>
            <img src="/lucario.png" alt="greninja" className='imgPokemon'/>
            <Link href={'/'}>
              <img src="/pokedexLogo.png" alt="pokedexLogo" className='imgLogo'/>
            </Link>
            <img src="/machoke.png" alt="charizard" className='imgPokemon'/>
          </div>
          <form onClick={handleSubmit} data-testid='form'>
            <Input icon={ <IoIosMail className='icon'/> } name="email" type="email" placeholder="Digite seu email" hasError={hasError(emailError)} state={email} setState={setEmail}/>
            <Input icon={ <IoIosLock className='icon'/> } name="password" type="password" placeholder="Digite sua senha" hasError={hasError(passwordError)} state={password} setState={setPassword}/>
            <Button type='submit' isFormInvalid={!!emailError || !!passwordError} text='ENTRAR'/>
          </form>
        </div>
      </main>
    </>
  )
}
