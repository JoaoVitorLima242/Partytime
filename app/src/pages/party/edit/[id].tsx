import { GetStaticPaths, GetStaticProps } from 'next'
import { api, getApiClient } from 'services/axios'
import { getParties, getPartyByIdRequest } from 'services/party'

const EditParty = ({ party }) => {
  return (
        <div>
            <h1>{party.title}</h1>
        </div>
  )
}

export default EditParty

export const getStaticPaths: any = async (ctx) => {
  const response = await getParties()
  const parties = response.parties

  const paths = parties?.map((party) => {
    return {
      params: {
        id: party?._id
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = ctx.params
  const response = await getPartyByIdRequest('62a8c2dba798d01cd296c03c')
  const party = response.party

  return {
    props: { party }
  }
}
