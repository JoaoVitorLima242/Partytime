import Navbar from 'components/Navbar'
import { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalStyles from '../assets/styles/global'

function App ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PartyTime</title>
        <meta
          name="description"
          content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
        />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossOrigin="anonymous"></link>
      </Head>
      <GlobalStyles />
      <Navbar/>
      <Component {...pageProps} />
    </>
  )
}

export default App
