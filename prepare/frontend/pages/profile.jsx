import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'
const Profile = () => {
  return(
    <>
      <Head>
        <title>내 프로필 | React-SNS-Project</title>
      </Head>
      <AppLayout><div>내 프로필</div></AppLayout>
    </>
  )
}
export default Profile