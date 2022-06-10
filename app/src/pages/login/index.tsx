import type { NextPage } from 'next'
import { useState, useContext } from 'react'
import Router from 'next/router'
import Head from 'next/head'
import { useForm } from 'react-hook-form'

import { AuthContext } from 'contexts/Auth/AuthContext'
// Styles
import { Wrapper } from './styles'
import { Form, Input } from 'assets/styles/form'
import { Button } from 'assets/styles/buttons'
import { Alert } from 'assets/styles/alert'

const Login: NextPage = () => {
  const { register, handleSubmit } = useForm()
  const { logInUser } = useContext(AuthContext)

  const [alert, setAlert] = useState<{msg: string, type?: string} | null>()

  const handleLogIn = async (data): Promise<void> => {
    console.log(data)
    const { error, msg } = await logInUser(data)
    if (error) {
      console.log(error)
      setAlert({ msg, type: 'danger' })
      return
    }

    Router.push('/profile')
  }
  return (
    <div>
      <Head>
        <title>Partytime | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper className='container'>
        <h1>Acesse sua conta</h1>
        <h2>Coloque as suas informações para logar!</h2>
        <Form maxWidth={700} onSubmit={handleSubmit(handleLogIn)}>
            <div>
              <label>Email</label>
              <Input
                {...register('email')}
                placeholder='Coloque seu email'
                name='email'
                id='email'
                type='email'
                required
              />
            </div>
            <div>
              <label>Senha</label>
              <Input
                {...register('password')}
                type='password'
                placeholder='Coloque sua senha'
                name='password'
                id='password'
                required
               />
            </div>
            <Button className='mt-5'>Acessar</Button>
        </Form>
        {alert ? <Alert type={alert?.type}>{alert?.msg}</Alert> : null}
      </Wrapper>
  </div>
  )
}

export default Login
