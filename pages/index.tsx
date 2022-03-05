import React from 'react'
import Header from "../components/Header";
import Main from "../components/Main";
import Head from 'next/head';
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
const index = () => {
  const { data: session, status } = useSession();
  if (!session) return <Login />;
  return (
    <div>
      <Head>
        <title>Google Keep</title>
        <link rel="icon" href="/favicon.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Header />
      <Main />
    </div>
  )
}

export default index