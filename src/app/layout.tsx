'use client'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/application/styles/global.scss'
import '@/application/styles/typesPokemons.scss'
import '@/application/styles/abilityPokemon.scss'
import { AccountContext } from '@/application/contexts'
import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>
      <AccountContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter, getCurrentAccount: getCurrentAccountAdapter }}>
        {children}
      </AccountContext.Provider>
      </body>
    </html>
  )
}

export default RootLayout
