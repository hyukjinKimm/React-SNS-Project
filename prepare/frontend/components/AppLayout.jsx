import React ,{ useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Menu, Input, Row, Col } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

import LoginForm from './LoginForm'
import UserProfile from './UserProfile'

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  .ant-col:first-child {
    padding-left: 0 !important;
  }

  .ant-col:last-child {
    padding-right: 0 !important;
  }
`
const AppLayout = ({ children }) => {
  
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
  return(
    <div>
      <Global />
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>React-SNS-Project</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>내 프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <SearchInput  enterButton/>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/hyukjinKimm" target="_blank" rel='noreferrer noopener'>Made by hyukjinKimm</a>
        </Col>
      </Row>
    </div> 
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // React 에서의 node 타입 (화면에 그릴 수 있는 모든 것)
}
export default AppLayout