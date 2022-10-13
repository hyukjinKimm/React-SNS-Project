import React, { useCallback, useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import Head from 'next/head'
import Router from 'next/router'
import { Form, Input, Checkbox, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST } from '../reducers/user'

const ErrorMessage = styled.div`
  color: red;
`
const Signup = () => {
  const dispatch = useDispatch()
  const [email, onChangeEmail] = useInput('')
  const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user)
  useEffect(() => {
    if ((me && me.id)){
      Router.replace('/');
    }
  }, [ me && me.id]);
  useEffect(() => {
    if(signUpDone) {
      Router.replace('/')
    }
  }, [signUpDone])

  useEffect(() => {
    if(signUpError){
      alert(signUpError)
    }
  }, [signUpError])
  const [password, onChangePassword] = useInput('')
  const [nickname, onChangeNickname] = useInput('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value)
    setPasswordError(e.target.value !== password)
  }, [password])
  const [term, setTerm] = useState('')
  const [termError, setTermError] = useState(false)
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked)
    setTermError(false)
  }, [])


  const onSubmit = useCallback(() => {
    if(password !== passwordCheck){
      setPasswordError(true)
      return
    }
    if(!term){
      setTermError(true)
      return
    }
    console.log(email, password, nickname)
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email, password, nickname
      }
    })

  }, [passwordCheck, term, email, password, nickname])
  

  return(
    <AppLayout>
      <Head>
        <title>회원가입 | React-SNS-Project</title>
      </Head>
      <div>회원가입</div>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input 
            name='user-email'
            value={email}
            required
            onChange={onChangeEmail} 
            type='email'
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <Input 
            id='user-nickname' 
            name='user-nickname'
            value={nickname}
            required
            onChange={onChangeNickname} 
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input 
            name='user-password'
            type='password'
            value={password}
            required
            onChange={onChangePassword} 
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호확인</label>
          <br />
          <Input 
            id='user-password-check' 
            type='password'
            name='user-password-check'
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck} 
          />
          {passwordError ? <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage> : null }
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            김혁진 말을 잘 들을것에 동의합니다.
          </Checkbox>
          {termError? <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage> : null}
        </div>
        <div style={{ marginTop: 10}}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  )
}
export default Signup