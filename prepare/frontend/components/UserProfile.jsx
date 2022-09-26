import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../reducers'
const UserProfile = () => {
  const dispatch = useDispatch()
  const onLogout = useCallback(() => {
    dispatch(logoutAction())
  }, [])
  return(
    <Card
      actions={[
        <div key="twit">트윗 0</div>,
        <div key="followings">팔로잉 0</div>,
        <div key="follwers">팔로워 0</div>
      ]}
    >
      <Card.Meta
        avatar={<Avatar>HJ</Avatar>}
        title='hyukjinKimm'
      />
      <Button style={{marginTop: 15}} onClick={onLogout}>로그아웃</Button>
    </Card>
  )
}
export default UserProfile