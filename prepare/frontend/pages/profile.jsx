import React from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head'

import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'
const Profile = () => {
  const follwerList = [{nickname: '혁진'}, {nickname: '수지'}, {nickname: '철수'},  {nickname: '아영'}]
  const followingList = [{nickname: '맹구'}, {nickname: '훈이'}, {nickname: '유리'},  {nickname: '진구'}]
  
  return(
    <>
      <Head>
        <title>내 프로필 | React-SNS-Project</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉목록" data={followingList}/>
        <FollowList header="팔로워목록" data={follwerList}/>
      </AppLayout>
    </>
  )
}
export default Profile