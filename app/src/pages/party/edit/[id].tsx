import { GetServerSideProps } from 'next'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import moment from 'moment'
import { parseCookies } from 'nookies'

// api
import { EditPartyRequest, getUserPartyByIdRequest, PartyProps } from 'services/party'
import { getApiClient } from 'services/axios'
// styles
import { LitleImage, Wrapper } from './styles'
import { Button } from 'assets/styles/buttons'
import { Checkbox, Form, Input, InputFile, TextArea } from 'assets/styles/form'
import { Alert } from 'assets/styles/alert'

type EditPartyProps = {
  party: PartyProps
}

const EditParty = ({ party }: EditPartyProps) => {
  const { register, handleSubmit } = useForm()
  const [checkbox, setCheckbox] = useState(party.privacy)

  const [alert, setAlert] = useState<{msg: string, type?: string} | null>()

  const editParty = async (data) => {
    const { 'auth-token': token } = parseCookies()

    const formData = new FormData()

    formData.append('id', data.id)
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('partyDate', data.partyDate)
    formData.append('privacy', data.privacy)
    formData.append('userId', data.userId)

    if (data.photos.length > 0) {
      for (const i of Object.keys(data.photos)) {
        formData.append('photos', data.photos[i])
      }
    }

    const { error } = await EditPartyRequest(token, formData)
    if (error) {
      setAlert({ msg: error, type: 'danger' })
      return
    }

    Router.push('/dashboard')
  }

  return (
    <Wrapper className='container'>
      <h1>Crie suas festas!</h1>
      <h4>Basta preencher o formulário!</h4>
      <Form onSubmit={handleSubmit(editParty)}>
        <input type='hidden' value={party.userId} {...register('userId')}/>
        <input type='hidden' value={party._id} {...register('id')}/>
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
            defaultValue={moment(party.partyDate).format('YYYY-MM-DD')}

          />
        </div>
        <div>
          <label>Fotos da festa</label>
          <InputFile
            {...register('photos')}
            placeholder='Poste a sua foto'
            name='photos'
            id='photos'
            type='file'
            multiple
          />
        </div>
        <div>
          {party.photos && party.photos.length > 0
            ? <div className='mt-2'>
                <h3>Fotos existentes:</h3>
                <div className='d-flex'>
                  {party.photos.map(photo => {
                    const localPhoto = photo.replace('public', 'http://localhost:3001')
                    return (
                      <LitleImage key={`photo${photo}`}>
                        <img
                          src={localPhoto}
                          alt="Festaa"
                          />
                      </LitleImage>
                    )
                  })}
                </div>
              </div>
            : null
          }
        </div>
        <Checkbox>
          <label>Festa privada</label>
          <input
            {...register('privacy')}
            placeholder='dd/mm/aaaa'
            name='privacy'
            id='privacy'
            type='checkbox'
            checked={checkbox}
            onChange={() => setCheckbox(!checkbox)}
          />
        </Checkbox>
        <Button className='mt-5'>Criar festa</Button>
      </Form>
      {alert ? <Alert type={alert?.type}>{alert?.msg}</Alert> : null}
  </Wrapper>
  )
}

export default EditParty

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { 'auth-token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const id = ctx.params?.id
  const response = await getUserPartyByIdRequest(ctx, id)
  const party = response.party

  return {
    props: { party }
  }
}
