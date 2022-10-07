import React, { useState, useCallback, useMemo } from 'react'
import useInput from '../hooks/useInput'
import PropTyps from 'prop-types'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch, useSelector  } from 'react-redux'
import { loginRequestAction } from '../reducers/user'
const ButtonWrapper = styled.div`
  margin-top: 10px;
`
const FormWrapper = styled(Form)`
  padding: 10px;
`
const LoginForm = () => {  
  const dispatch = useDispatch()
  const  { logInLoading } = useSelector((state)=>state.user);
  const [email, onChangeEmali] = useInput('')
  const [password, onChangePassword] = useInput('')
  
  const onSubmitForm = useCallback(() => {
    console.log(email, password)
    
    dispatch(loginRequestAction({ email, password}))

  }, [email, password])

  const style = useMemo(() => ({ marginTop: 10 }), [])

  return(
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <br/>
        <Input id='user-email' name='user-email'  type='email' value={email} onChange={onChangeEmali} required />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br/>
        <Input 
          id='user-password' 
          name='user-password' 
          type='password' 
          value={password} 
          onChange={onChangePassword} 
          required 
        />
      </div>
      <div style={style}>
        <Button type='primary' htmlType='submit' loading={ logInLoading }>로그인</Button>
        <Link href='/signup'><a><Button>회원가입</Button></a></Link>
      </div>
    </FormWrapper>
  )
}

export default LoginForm