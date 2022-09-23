const express = require('express')

const postRouter = require('./routes/post')
const db = require('./models');
const app = express()

db.sequelize.sync()
  .then(() => {
    console.log('sequelize 서버 연결 완료')
  })
  .catch((e) => {
    console.error(e)
  })

app.use('/post', postRouter)

app.listen(3065, () => {
  console.log('서버 실행중')
})