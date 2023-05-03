import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'
import Script from 'next/script'

function MyApp({ Component, pageProps : {session, ...pageProps} }) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Script  src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" />
        <Script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" />

        {/* <Script>var Alert = ReactBootstrap.Alert;</Script> */}

        <Script src="https://code.jquery.com/jquery-3.5.1.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" />
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" />

        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
