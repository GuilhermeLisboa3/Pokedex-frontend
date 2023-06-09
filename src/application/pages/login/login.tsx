import './styles.scss'
import { Button, Input, Toas } from '@/application/components'
import { type Validator } from '@/application/validation'
import { type Authentication } from '@/domain/use-cases/account'

import { IoIosLock, IoIosMail } from 'react-icons/io'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AccountContext } from '@/application/contexts'

type Props = {
  validator: Validator
  authentication: Authentication
}

export const Login: React.FC<Props> = ({ validator, authentication }: Props) => {
  const { setCurrentAccount } = useContext(AccountContext)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [toastIsOpen, setToastIsOpen] = useState(false)
  const [toastColor, setToastColor] = useState('bg-danger')
  const [toastMessage, setToastMessage] = useState('')
  const [lodding, setLodding] = useState(false)
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>('')
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState<string | undefined>('')

  useEffect(() => { setEmailError(validator.validate('email', { email })) }, [email])
  useEffect(() => { setPasswordError(validator.validate('password', { password })) }, [password])
  useEffect(() => {
    if (searchParams.get('registred') === 'true') {
      setToastColor('bg-success')
      setToastIsOpen(true)
      setToastMessage('Registrado com sucesso!')
    }
  }, [])

  const hasError = (error: string | undefined): 'bg-danger' | 'bg-success' => {
    return error === undefined ? 'bg-success' : 'bg-danger'
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (lodding || emailError || passwordError) return
    setLodding(true)
    try {
      const account = await authentication({ email, password })
      setCurrentAccount(account)
      router.push('/')
    } catch (error: any) {
      setToastColor('bg-danger')
      setToastIsOpen(true)
      setToastMessage(error.message)
    }
  }

  return (
    <>
      <main className='login-container'>
        <div className='login-form-container'>
          <div className='login-imagens'>
            <img src="/lucario.png" alt="greninja" className='login-img-pokemon'/>
            <Link href={'/'}>
              <img src="/pokedexLogo.png" alt="pokedexLogo" className='login-img-logo'/>
            </Link>
            <img src="/machoke.png" alt="charizard" className='login-img-pokemon'/>
          </div>
          <form onClick={handleSubmit} data-testid='form'>
            <Input icon={ <IoIosMail className='icon'/> } name="email" type="email" placeholder="Digite seu email" hasError={hasError(emailError)} state={email} setState={setEmail}/>
            <Input icon={ <IoIosLock className='icon'/> } name="password" type="password" placeholder="Digite sua senha" hasError={hasError(passwordError)} state={password} setState={setPassword}/>
            <Button type='submit' isFormInvalid={!!emailError || !!passwordError} text='ENTRAR'/>
          </form>
        </div>
      </main>
      <Toas color={toastColor} isOpen={toastIsOpen} setIsOpen={setToastIsOpen} setLodding={setLodding} message={toastMessage}/>
    </>
  )
}
