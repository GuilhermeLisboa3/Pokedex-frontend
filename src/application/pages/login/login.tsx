'use client'
import './styles.scss'
import { Button, Input } from '@/application/components'

import { IoIosLock, IoIosMail } from 'react-icons/io'
import Link from 'next/link'
import { useState } from 'react'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
          <form data-testid='form'>
            <Input icon={ <IoIosMail className='icon'/> } name="email" type="email" placeholder="Digite seu email" hasError={'bg-danger'} state={email} setState={setEmail}/>
            <Input icon={ <IoIosLock className='icon'/> } name="password" type="password" placeholder="Digite sua senha" hasError={'bg-danger'} state={password} setState={setPassword}/>
            <Button type='submit' isFormInvalid={true} text='ENTRAR'/>
          </form>
        </div>
      </main>
    </>
  )
}
