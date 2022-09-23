const express = require('express')

const postRouter = reuqire('./routes/post')

const app = express()


app.use('/post', postRouter)
app.listen(3065, () => {
  console.log('서버 실행중')
})