import './styles.scss'
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
            <div className='formGroup'>
              <label htmlFor='name' className='label'>
                <IoIosPerson className='icon' />
              </label>
              <input id="name" name="name" type="name" placeholder="Digite seu nome" required className='inputName'/>
            </div>

            <div className='formGroup'>
              <label htmlFor='email' className='label'>
                <IoIosMail className='icon' />
              </label>
              <input id="email" name="email" type="email" placeholder="Digite seu email" required className='inputName'/>
            </div>

            <div className='formGroup'>
              <label htmlFor='password' className='label'>
                <IoIosLock className='icon' />
              </label>
              <input id="password" name="password" type="password" placeholder="Digite sua senha" required className='inputName'/>
            </div>

            <div className='formGroup'>
              <label htmlFor='confirmPassword' className='label'>
                <IoIosLock className='icon' />
              </label>
              <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirme sua senha" required className='inputName'/>
            </div>

            <button type="submit" className='button'>ENTRAR</button>
          </form>
        </div>
      </main>
    </>
  )
}
