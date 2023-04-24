import './styles.scss'
import { Button, Input } from '@/application/components'

import { IoIosLock, IoIosMail, IoIosPerson } from 'react-icons/io'
import Link from 'next/link'

export const SignUp = function (): JSX.Element {
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
            <Input icon={ <IoIosPerson className='icon'/> } id="name" name="name" type="name" placeholder="Digite seu nome" required className='inputName'/>
            <Input icon={ <IoIosMail className='icon'/> } id="email" name="email" type="email" placeholder="Digite seu email" required className='inputName'/>
            <Input icon={ <IoIosLock className='icon'/> } id="password" name="password" type="password" placeholder="Digite sua senha" required className='inputName'/>
            <Input icon={ <IoIosLock className='icon'/> } name="confirmPassword" type="password" placeholder="Confirme sua senha" required className='inputName'/>
            <Button type='submit' isFormInvalid={true} text='ENTRAR'/>
          </form>
        </div>
      </main>
    </>
  )
}
