const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/post')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const hashtagRouter = require('./routes/hashtag')
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

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true,
}))
app.use('/', express.static(path.join(__dirname, 'uploads')));
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

app.use('/posts', postsRouter);
app.use('/post', postRouter)
app.use('/user', userRouter)
app.use('/hashtag', hashtagRouter)

app.listen(3065, () => {
  console.log('서버 실행중')
})