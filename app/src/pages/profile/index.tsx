import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'
import { getApiClient } from 'services/axios'
import { UserProps } from 'contexts/Auth/AuthContext.d'

type ProfileProps = {
  user: UserProps
}

const Profile = ({ user }: ProfileProps) => {
  return (
    <div>
      <Head>
        <title>Partytime | {user?.name}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'>
        <h1>Profile</h1>
        <h1>{user?.name}</h1>
      </main>
    </div>
  )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth-token': token } = parseCookies(ctx)

  const apiClient = getApiClient(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const response = await apiClient.get('api/user')
  const user: UserProps = response.data.user

  return {
    props: {
      user
    }
  }
}
