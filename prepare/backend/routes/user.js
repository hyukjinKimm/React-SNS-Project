const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport');
const { Op } = require('sequelize');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router()
router.get('/:userId', async (req, res, next) => { // GET /user
  try {

      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.userId },
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

    if(fullUserWithoutPassword){
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      
      return res.status(200).json(data);
    } else {
      return res.status(404).json("존재하지 않는 사용자 입니다.");
    }
  } catch (error) {
    console.error(error);
   next(error);
  }
});
router.get('/', async (req, res, next) => { // GET /user
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
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
    } else {
      return res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
   next(error);
  }
});

router.get('/:userId/posts', async (req, res, next) => { 
  try {

    const where = {UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10, 
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickname'],
        }, {
          model: Image,
        }]
      }],
    });
    console.log(posts)
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
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
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy();
    res.status(200).json({
      code: 200,
      message: '로그아웃 성공'
    })
  });
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

router.patch('/nickname', isLoggedIn, async ( req, res, next) => {
  try{
    await User.update({
      nickname: req.body.nickname // 어떻게 수정? 
    }, {
      where: { id: req.user.id } // 누구 꺼?
    })
    res.status(200).json({ nickname: req.body.nickname })
  } catch(error){
    console.error(error)
    next(error)
  }
})

router.patch('/:userId/follow', isLoggedIn, async ( req, res, next) => {
  try{
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user){
      res.status(403).send('존재하지 않는 사용자 입니다. (팔로우실패)')
    }
    await user.addFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch(error){ 
    console.error(error)
    next(error)
  }
})
router.delete('/:userId/follow', isLoggedIn, async ( req, res, next) => {
  try{
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user){
      res.status(403).send('존재하지 않는 사용자 입니다. (언팔로우실패)')
    }
    await user.removeFollowers(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch(error){
    console.error(error)
    next(error)
  }
})
router.delete('/follower/:userId', isLoggedIn, async ( req, res, next) => {
  try{
    const user = await User.findOne({ where: { id: req.params.userId }})
    if (!user){
      res.status(403).send('존재하지 않는 사용자 입니다. (언팔로워실패)')
    }
    await user.removeFollowings(req.user.id);

    res.status(200).json({ UserId: parseInt(req.params.userId, 10) })
  } catch(error){
    console.error(error)
    next(error)
  }
})

router.get('/followers', isLoggedIn, async ( req, res, next) => {
  try{
    const user = await User.findOne({ where: { id: req.user.id }})
    if (!user){
      res.status(403).send('존재하지 않는 사용자 입니다. (팔로워 가져오기 실패)')
    }
    const followers = await user.getFollowers()
    res.status(200).json(followers)
  } catch(error){
    console.error(error)
    next(error)
  }
})

router.get('/followings', isLoggedIn, async ( req, res, next) => {
  try{
    const user = await User.findOne({ where: { id: req.user.id }})
    if (!user){
      res.status(403).send('존재하지 않는 사용자 입니다. (팔로잉 가져오기 실패)')
    }
    const followings = await user.getFollowings()
    res.status(200).json(followings)
  } catch(error){
    console.error(error)
    next(error)
  }
})

module.exports = router