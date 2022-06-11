import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

const Profile: NextPage = () => {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Partytime</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'>
        <h1>Profile</h1>
      </main>
    </div>
  )
}

export default Profile

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

  return {
    props: {}
  }
}
