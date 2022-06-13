import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { useForm } from 'react-hook-form'

// styles
import { Checkbox, Form, Input, InputFile, TextArea } from 'assets/styles/form'
import { Wrapper } from './styles'
// api
import { getApiClient } from 'services/axios'
// types
import { UserProps } from 'contexts/Auth/AuthContext.d'
import { Button } from 'assets/styles/buttons'

type CreatePartyProps = {
    user: UserProps
}

const CreateParty = ({ user }: CreatePartyProps) => {
  const { register, handleSubmit } = useForm()

  const createParty = (data) => {
    console.log(data)
  }

  return (
        <Wrapper className='container'>
            <h1>Crie suas festas!</h1>
            <h4>Basta preencher o formulário!</h4>
            <Form onSubmit={handleSubmit(createParty)}>
            <input type='hidden' value={user?._id} {...register('userId')}/>
            <div>
              <label>Titulo</label>
              <Input
                {...register('title')}
                placeholder='Coloque seu titulo'
                name='title'
                id='title'
                required
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

              />
            </Checkbox>
            <Button className='mt-5'>Criar festa</Button>
            </Form>
        </Wrapper>
  )
}

export default CreateParty

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
