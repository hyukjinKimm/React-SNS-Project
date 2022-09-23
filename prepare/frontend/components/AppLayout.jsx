import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

const AppLayout = ({ children }) => {
  return(
    <div>
      <div>
        <Link href='/'><a>React-SNS-Project</a></Link>
        <Link href='/profile'><a>내 프로필</a></Link>
        <Link href='/signup'><a>회원가입</a></Link>
      </div>
      {children}
    </div>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // React 에서의 node 타입 (화면에 그릴 수 있는 모든 것)
}
export default AppLayout