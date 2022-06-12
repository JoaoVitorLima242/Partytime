import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getApiClient } from 'services/axios'

import { Wrapper } from './styles'

const Dashboard = () => {
  return (
        <Wrapper>
            <h1>Dashboard!</h1>
        </Wrapper>
  )
}

export default Dashboard

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth-token': token } = parseCookies(ctx)

  //   const apiClient = getApiClient(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
