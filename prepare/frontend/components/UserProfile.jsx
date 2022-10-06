import React, { useCallback } from 'react'
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequestAction } from '../reducers/user'
const UserProfile = () => {
  const dispatch = useDispatch()
  const { me, isLoggingOut } = useSelector((state) => state.user )
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction())
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
        avatar={<Avatar>{me.nickname[0]}</Avatar>}
        title={me.nickname}
      />
      <Button style={{marginTop: 15}} onClick={onLogout} loading={isLoggingOut}>로그아웃</Button>
    </Card>
  )
}
export default UserProfile