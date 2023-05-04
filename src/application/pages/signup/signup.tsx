import './styles.scss'
import { Button, Input, Toas } from '@/application/components'
import { type Validator } from '@/application/validation'
import { type AddAccount } from '@/domain/use-cases/account'
import { useRouter } from 'next/navigation'

import { IoIosLock, IoIosMail, IoIosPerson } from 'react-icons/io'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Props = {
  validator: Validator
  addAccount: AddAccount
}

export const SignUp: React.FC<Props> = ({ validator, addAccount }: Props) => {
  const router = useRouter()
  const [toastIsOpen, setToastIsOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [lodding, setLodding] = useState(false)
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (lodding || nameError || emailError || passwordError || passwordConfirmationError) return
    setLodding(true)
    try {
      const account = await addAccount({ name, email, password })
      if (account) router.push('/login?registred=true')
    } catch (error: any) {
      setToastIsOpen(true)
      setToastMessage(error.message)
    }
  }

  const hasError = (error: string | undefined): 'bg-danger' | 'bg-success' => {
    return error === undefined ? 'bg-success' : 'bg-danger'
  }

  return (
    <>
      <main className='signupContainer'>
        <div className='form-container'>
          <div className='imagens'>
            <img src="/greninja.png" alt="greninja" className='imgPokemon'/>
            <Link href={'/'}>
              <img src="/pokedexLogo.png" alt="pokedexLogo" className='imgLogo'/>
            </Link>
            <img src="/charizard.png" alt="charizard" className='imgPokemon'/>
          </div>
          <form onClick={handleSubmit} data-testid='form'>
            <Input icon={ <IoIosPerson className='icon'/> } name="name" type="text" placeholder="Digite seu nome" hasError={hasError(nameError)} state={name} setState={setName}/>
            <Input icon={ <IoIosMail className='icon'/> } name="email" type="email" placeholder="Digite seu email" hasError={hasError(emailError)} state={email} setState={setEmail}/>
            <Input icon={ <IoIosLock className='icon'/> } name="password" type="password" placeholder="Digite sua senha" hasError={hasError(passwordError)} state={password} setState={setPassword}/>
            <Input icon={ <IoIosLock className='icon'/> } name="passwordConfirmation" type="password" placeholder="Confirme sua senha" hasError={hasError(passwordConfirmationError)} state={passwordConfirmation} setState={setPasswordConfirmation}/>
            <Button type='submit' isFormInvalid={!!nameError || !!emailError || !!passwordError || !!passwordConfirmationError} text='ENTRAR'/>
          </form>
        </div>
        <Toas color='bg-danger' isOpen={toastIsOpen} setIsOpen={setToastIsOpen} setLodding={setLodding} message={toastMessage}/>
      </main>
    </>
  )
}
