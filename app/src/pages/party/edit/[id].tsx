import { GetStaticPaths, GetStaticProps } from 'next'
import { api, getApiClient } from 'services/axios'
import { getParties, getPartyByIdRequest, PartyProps } from 'services/party'

const EditParty = ({ party }) => {
  return (
        <div>
            <h1>{party.title}</h1>
        </div>
  )
}

export default EditParty

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await getParties()
  const parties = response.parties

  const paths = parties?.map((party: PartyProps) => {
    return {
      params: {
        id: party._id.toString()
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id
  const response = await getPartyByIdRequest(id)
  const party = response.party

  return {
    props: { party }
  }
}
