import React from 'react'
import PropTyps from 'prop-types'
import Head from 'next/head'
import 'antd/dist/antd.css'

const App = ({ Component }) => {
  return(
    <>
      <Head>
        <meta charSet='utf-8'/>
        <title>React-SNS-Project</title>
      </Head>
      <Component/>
    </>
  )
}

App.propTyps = {
  Component: PropTyps.elementType.isRequired
}
export default App