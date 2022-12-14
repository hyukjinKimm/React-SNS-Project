import React, { useCallback, useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import Head from 'next/head'
import Router from 'next/router'
import { END } from 'redux-saga'
import { Form, Input, Checkbox, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SIGN_UP_REQUEST, LOAD_MY_INFO_REQUEST } from '../reducers/user'
import wrapper from '../store/configureStore';
import axios from 'axios';
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
        <title>???????????? | React-SNS-Project</title>
      </Head>
      <div>????????????</div>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-email">?????????</label>
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
          <label htmlFor="user-nickname">?????????</label>
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
          <label htmlFor="user-password">????????????</label>
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
          <label htmlFor="user-password-check">??????????????????</label>
          <br />
          <Input 
            id='user-password-check' 
            type='password'
            name='user-password-check'
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck} 
          />
          {passwordError ? <ErrorMessage>??????????????? ???????????? ????????????.</ErrorMessage> : null }
        </div>
        <div>
          <Checkbox name='user-term' checked={term} onChange={onChangeTerm}>
            ????????? ?????? ??? ???????????? ???????????????.
          </Checkbox>
          {termError? <ErrorMessage>????????? ??????????????? ?????????.</ErrorMessage> : null}
        </div>
        <div style={{ marginTop: 10}}>
          <Button type='primary' htmlType='submit' loading={signUpLoading}>
            ????????????
          </Button>
        </div>
      </Form>
    </AppLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = ''
  if (context.req && cookie){
    axios.defaults.headers.Cookie = cookie
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST
  })
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup