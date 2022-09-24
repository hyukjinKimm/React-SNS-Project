const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport');
 
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router()

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => { // 로그인상태 쿠키를 프론트로 보낸다.
        if (loginErr) {
            console.error(loginErr);
            return next(loginErr);
        }
        const fullUserWithoutPassword = await User.findOne({
            where: { id: user.id },
            attributes: {
              exclude: ['password']
            },
            include: [{
              model: Post,
              attributes: ['id'],
            }, {
              model: User,
              as: 'Followings',
              attributes: ['id'],
            }, {
              model: User,
              as: 'Followers',
              attributes: ['id'],
            }]
        })
        return res.status(200).json(fullUserWithoutPassword);
      });
  })(req, res, next);
})

router.post('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('ok');
  });
  
router.post('/', isNotLoggedIn, async (req, res, next) => { // POST /user/
  try{
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
    });
    res.send('ok')
  } catch(e) {
    console.error(e)
    next(e)
  }

})


module.exports = router