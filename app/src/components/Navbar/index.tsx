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
                      style={{ cursor: 'pointer' }}
                  />
              </Link>
              <h2>Partytime</h2>
            </div>
            <ul>
              <Link href='/'>Home</Link>
              { isAuthenticated
                ? <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/profile">Configurações</Link>
                    <span onClick={() => logOutUser()}>Logout</span>
                  </>
                : <>
                    <Link href="/login">Login</Link>
                    <Link href="/register">Cadastro</Link>
                  </>
              }
            </ul>
         </Wrapper>
  )
}

export default Navbar
