import 'bootstrap/dist/css/bootstrap.min.css'
import '@/application/styles/global.scss'

export default function RootLayout ({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
