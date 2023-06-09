import { React, useState } from 'react'
import TablePuasa from '@/components/puasa/TablePuasa';
import Layout from '@/layouts/Layout';
import { Container } from 'react-bootstrap';
import AppContext from '@/context/appContext';
import { getSession } from 'next-auth/react';

export default function Test({ puasa }) {

  const [dataPuasa, setDataPuasa] = useState(puasa);

  return (
    <>
      <AppContext.Provider value={{
        puasa: dataPuasa,
        setDataPuasa: setDataPuasa
      }}>
        <Layout title="Data Puasa">
          <Container>
            <TablePuasa />
          </Container>
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export async function getServerSideProps(context) {

  const user = await getSession(context);

  const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/puasa/${user.id}`);
  const getPuasa = await response.json();

  return {
    props: {
      puasa: getPuasa
    }
  }
}