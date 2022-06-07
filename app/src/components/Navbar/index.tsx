import Image from 'next/image'
import Link from 'next/link'
import { Wrapper } from './styles'

const Navbar = () => {
  return (
         <Wrapper>
            <div>
                <Image
                    src='/img/partytimelogo.png'
                    width={70}
                    height={70}
                    alt=''
                />
              <h2>Partytime</h2>
            </div>
            <ul>
                <li>
                    <Link href="/">HOME</Link>
                    <Link href="/register">CADASTRO</Link>
                </li>
            </ul>
         </Wrapper>
  )
}

export default Navbar
