import {React, useState } from 'react'
import TablePuasa from '@/components/puasa/TablePuasa';
import Layout from '@/layouts/Layout';
import { Container } from 'react-bootstrap';
import AppContext from '@/context/appContext';

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
            <TablePuasa/>
          </Container>
        </Layout>
      </AppContext.Provider>
    </>
  )
}

export async function getServerSideProps() {

  const response = await fetch("http://localhost:3000/api/puasa");
  const getPuasa = await response.json();

  return {
    props: {
      puasa: getPuasa
    }
  }
}