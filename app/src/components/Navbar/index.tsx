import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wrapper } from './styles'
import { AuthContext } from 'contexts/Auth/AuthContext'
const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext)
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
                    { isAuthenticated
                      ? <>
                          <Link href="/profile">PROFILE</Link>
                        </>
                      : <>
                          <Link href="/register">CADASTRO</Link>
                          <Link href="/login">LOGIN</Link>
                        </>
                    }
                </li>
            </ul>
         </Wrapper>
  )
}

export default Navbar
