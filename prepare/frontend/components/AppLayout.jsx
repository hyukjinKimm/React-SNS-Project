import React from 'react'
import PropTypes from 'prop-types'

const AppLayout = ({ children }) => {
  return(
    <div>
      <div>공통메뉴</div>
      {children}
    </div>
  )
}
AppLayout.propTypes = {
  children: PropTypes.node.isRequired, // React 에서의 node 타입 (화면에 그릴 수 있는 모든 것)
}
export default AppLayout