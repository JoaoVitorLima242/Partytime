import { GetServerSideProps } from 'next'
import { getPartyByIdRequest, PartyProps } from 'services/party'

type PartyDetailsProps = {
    party: PartyProps
}

const PartyDetails = ({ party }: PartyDetailsProps) => {
  return (
        <div>Details</div>
  )
}

export default PartyDetails

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id
  const { error, party } = await getPartyByIdRequest(id, ctx)
  if (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {
    props: {
      party
    }
  }
}
