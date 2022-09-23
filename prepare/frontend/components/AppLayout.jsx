import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu } from 'antd'
const AppLayout = ({ children }) => {
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
          <Link href='/signup'><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      {children}
    </div>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // React 에서의 node 타입 (화면에 그릴 수 있는 모든 것)
}
export default AppLayout