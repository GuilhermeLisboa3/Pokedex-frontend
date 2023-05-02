import 'bootstrap/dist/css/bootstrap.min.css'
import '@/application/styles/global.scss'
import '@/application/styles/typesPokemons.scss'

const RootLayout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout
