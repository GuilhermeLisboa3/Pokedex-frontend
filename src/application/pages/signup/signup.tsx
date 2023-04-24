'use client'
import './styles.scss'
import { Button, Input } from '@/application/components'
import { type Validator } from '@/application/validation'

import { IoIosLock, IoIosMail, IoIosPerson } from 'react-icons/io'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  validator: Validator
}

export const SignUp: React.FC<Props> = ({ validator }: Props) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState<string | undefined>('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<string | undefined>('')

  useEffect(() => { setNameError(validator.validate('name', { name })) }, [name])
  useEffect(() => { setEmailError(validator.validate('email', { email })) }, [email])
  useEffect(() => { setPasswordError(validator.validate('password', { password })) }, [password])
  useEffect(() => { setPasswordConfirmationError(validator.validate('passwordConfirmation', { password, passwordConfirmation })) }, [passwordConfirmation])

  return (
    <>
      <main>
        <div className='form-container'>
          <div className='imagens'>
            <img src="/greninja.png" alt="greninja" className='imgPokemon'/>
            <Link href={'/'}>
              <img src="/pokedexLogo.png" alt="pokedexLogo" className='imgLogo'/>
            </Link>
            <img src="/charizard.png" alt="charizard" className='imgPokemon'/>
          </div>
          <form action="">
            <Input icon={ <IoIosPerson className='icon'/> } name="name" type="text" placeholder="Digite seu nome" hasError={nameError === undefined ? 'bg-success' : 'bg-danger'} state={name} setState={setName}/>
            <Input icon={ <IoIosMail className='icon'/> } name="email" type="email" placeholder="Digite seu email" hasError={emailError === undefined ? 'bg-success' : 'bg-danger'} state={email} setState={setEmail}/>
            <Input icon={ <IoIosLock className='icon'/> } name="password" type="password" placeholder="Digite sua senha" hasError={passwordError === undefined ? 'bg-success' : 'bg-danger'} state={password} setState={setPassword}/>
            <Input icon={ <IoIosLock className='icon'/> } name="passwordConfirmation" type="password" placeholder="Confirme sua senha" hasError={passwordConfirmationError === undefined ? 'bg-success' : 'bg-danger'} state={passwordConfirmation} setState={setPasswordConfirmation}/>
            <Button type='submit' isFormInvalid={true} text='ENTRAR'/>
          </form>
        </div>
      </main>
    </>
  )
}
