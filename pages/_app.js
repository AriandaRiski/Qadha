import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <SessionProvider session={pageProps.session}>

        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
