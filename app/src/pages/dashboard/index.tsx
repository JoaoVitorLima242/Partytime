import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { parseCookies } from 'nookies'

import { getApiClient } from 'services/axios'
// types
import { PartyProps } from 'services/party'

import { Wrapper } from './styles'

type DashboardProps = {
  parties: PartyProps[]
}

const Dashboard = ({ parties }: DashboardProps) => {
  return (
        <Wrapper className='container'>
            <h1>Dashboard!</h1>
            {parties && parties.length > 0
              ? <div>
                  {parties.map(party => (
                    <div key={party._id}>
                      <p>{party.title}</p>
                    </div>
                  ))}
              </div>
              : <div>
                  <h4>Você não tem nenhuma festa! <Link href="/party/create">Crie uma festa aqui!</Link></h4>
                </div>
            }
        </Wrapper>
  )
}

export default Dashboard

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

  const response = await apiClient.get('api/party/user')

  return {
    props: {
      parties: response.data.parties
    }
  }
}
