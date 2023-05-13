import Login from '@/components/pendaftaran/login'
import Layout from '@/layouts/Layout'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useState } from 'react';

export default function pageLogin() {
  return (
    <>
      <Layout title="Login">
        <Login />
      </Layout>
    </>
  )
}
