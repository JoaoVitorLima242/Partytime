import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import moment from 'moment'

// api
import { getParties, getPartyByIdRequest, PartyProps } from 'services/party'
// styles
import { Wrapper } from './styles'
import { Button } from 'assets/styles/buttons'
import { Checkbox, Form, Input, InputFile, TextArea } from 'assets/styles/form'
import { Alert } from 'assets/styles/alert'

type EditPartyProps = {
  party: PartyProps
}

const EditParty = ({ party }: EditPartyProps) => {
  const { register, handleSubmit } = useForm()

  const [alert, setAlert] = useState<{msg: string, type?: string} | null>()

  const editParty = (data) => {
    console.log(data)
  }

  return (
    <Wrapper className='container'>
      <h1>Crie suas festas!</h1>
      <h4>Basta preencher o formulário!</h4>
      <Form onSubmit={handleSubmit(editParty)}>
        <input type='hidden' value={party.userId} {...register('userId')}/>
        <div>
          <label>Titulo</label>
          <Input
            {...register('title')}
            placeholder='Coloque seu titulo'
            name='title'
            id='title'
            required
            defaultValue={party.title}
          />
        </div>
        <div>
          <label>Descrição</label>
          <TextArea
            {...register('description')}
            placeholder='Coloque sua Descrição'
            name='description'
            id='description'
            required
            defaultValue={party.description}
          />
        </div>
        <div>
          <label>Data da festa</label>
          <Input
            {...register('partyDate')}
            placeholder='dd/mm/aaaa'
            name='partyDate'
            id='partyDate'
            type='date'
            required
            defaultValue={moment(party.partyDate).format('yyyy-DD-MM')}
          />
        </div>
        <div>
          <label>Data da festa</label>
          <InputFile
            {...register('photos')}
            placeholder='Poste a sua foto'
            name='photos'
            id='photos'
            type='file'
            multiple
          />
        </div>
        <Checkbox>
          <label>Festa privada</label>
          <input
            {...register('privacy')}
            placeholder='dd/mm/aaaa'
            name='privacy'
            id='privacy'
            type='checkbox'
            checked={party.privacy}
          />
        </Checkbox>
        <Button className='mt-5'>Criar festa</Button>
      </Form>
      {alert ? <Alert type={alert?.type}>{alert?.msg}</Alert> : null}
  </Wrapper>
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
