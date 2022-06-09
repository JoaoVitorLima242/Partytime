import type { NextPage } from 'next'
import { useState, MouseEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { AuthContext } from 'contexts/Auth/AuthContext'
// Styles
import { Wrapper } from './styles'
import { Form, Input } from 'assets/styles/form'
import { Button } from 'assets/styles/buttons'
import { Alert } from 'assets/styles/alert'

const Register: NextPage = () => {
  const router = useRouter()

  const { RegisterUser } = useContext(AuthContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [alert, setAlert] = useState<{msg: string, type?: string} | null>()

  const register = async (e: MouseEvent): Promise<void> => {
    e.preventDefault()

    const data = {
      name,
      email,
      password,
      confirmPassword
    }
    const response = await RegisterUser(data)
    if (response.error) {
      setAlert({ msg: response.msg, type: 'danger' })
    }
  }
  return (
      <div>
      <Head>
        <title>Partytime | Cadastro</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper className='container'>
        <h1>Crie uma conta</h1>
        <h2>Preencha o formulário para se cadastrar!</h2>
        <Form maxWidth={700}>
            <div>
              <label>Nome</label>
              <Input placeholder='Coloque seu nome' value={name} name='name' id='name' onChange={e => setName(e.target.value)}/>
            </div>
            <div>
              <label>Email</label>
              <Input placeholder='Coloque seu email' value={email} name='email' id='email' onChange={e => setEmail(e.target.value)}/>
            </div>
            <div>
              <label>Senha</label>
              <Input type='password' placeholder='Coloque sua senha' value={password} name='password' id='password' onChange={e => setPassword(e.target.value)}/>
            </div>
            <div>
              <label>Confirme sua senha</label>
              <Input type='password' placeholder='Confirme sua senha' value={confirmPassword} name='confirmPassword' id='confirmPassword'onChange={e => setConfirmPassword(e.target.value)}/>
            </div>
            <Button className='mt-5' onClick={e => register(e)}>Cadastrar</Button>
        </Form>
        {alert ? <Alert type={alert?.type}>{alert?.msg}</Alert> : null}
      </Wrapper>
  </div>
  )
}

export default Register
