import './styles.scss'
import { FaLinkedinIn, FaGithub, FaInstagram, FaRegCopyright } from 'react-icons/fa'
import Link from 'next/link'

export const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <p className='name'><FaRegCopyright/> Guilherme Gonçalves Lisboa</p>
        <div className='icons'>
          <Link href="https://www.linkedin.com/in/guilherme-gon%C3%A7alves-lisboa-abb8b0227/" target='_blank' className='linkIcon'>
            <FaLinkedinIn className='icon'/>
          </Link>
          <Link href="https://github.com/GuilhermeLisboa3" target='_blank' className='linkIcon'>
            <FaGithub className='icon'/>
          </Link>
          <Link href="https://www.instagram.com/guime.lisboa/" target='_blank' className='linkIcon'>
            <FaInstagram className='icon'/>
          </Link>
        </div>
      </footer>
    </>
  )
}
