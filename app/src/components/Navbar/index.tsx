import { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Wrapper } from './styles'
import { AuthContext } from 'contexts/Auth/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logOutUser } = useContext(AuthContext)
  return (
         <Wrapper>
            <div>
              <Link href="/">
                  <Image
                      src='/img/partytimelogo.png'
                      width={70}
                      height={70}
                      alt='Imagem de um cone de festas soltando faiscas'
                  />
              </Link>
              <h2>Partytime</h2>
            </div>
            <ul>
                <li>
                    { isAuthenticated
                      ? <>
                          <Link href="/profile">PROFILE</Link>
                          <span onClick={() => logOutUser()}>LOGOUT</span>
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
