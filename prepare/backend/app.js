const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')

const db = require('./models');
const passport = require('passport')
const passportConfig = require('./passport');

dotenv.config()
const app = express()
db.sequelize.sync()
  .then(() => {
    console.log('sequelize 서버 연결 완료')
  })
  .catch((e) => {
    console.error(e)
  })
passportConfig();

app.use(cors({
  origin: 'http://localhost:3060',
  credentials:true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
//passport.initialize에서 req에 isAuthenticated login logout등을 추가
app.use(passport.session());

app.use('/post', postRouter)
app.use('/user', userRouter)
app.listen(3065, () => {
  console.log('서버 실행중')
})