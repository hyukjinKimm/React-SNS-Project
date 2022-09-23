const express = require('express')
const cors = require('cors')
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const db = require('./models');
const app = express()

db.sequelize.sync()
  .then(() => {
    console.log('sequelize 서버 연결 완료')
  })
  .catch((e) => {
    console.error(e)
  })


app.use(cors({
  origin: true,
  credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/post', postRouter)
app.use('/user', userRouter)
app.listen(3065, () => {
  console.log('서버 실행중')
})