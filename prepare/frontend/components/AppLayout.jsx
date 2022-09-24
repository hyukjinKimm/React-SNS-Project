import React ,{useState} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd'

import LoginForm from './LoginForm'
import UserProfile from './UserProfile'
const AppLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return(
    <div>
      <Menu mode='horizontal'>
        <Menu.Item>
          <Link href='/'><a>React-SNS-Project</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href='/profile'><a>내 프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Input.Search style={{verticalAlign:'middle'}} enterButton/>
        </Menu.Item>
        <Menu.Item>
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm/>}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href="https://github.com/hyukjinKimm" target="_blank" rel='noreferrer noopener'>Made by hyukjinKimm</a>
        </Col>
      </Row>
      {children}
    </div> 
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // React 에서의 node 타입 (화면에 그릴 수 있는 모든 것)
}
export default AppLayout