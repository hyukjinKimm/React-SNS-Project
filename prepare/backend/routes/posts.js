const express = require('express')
const { Post, User, Image, Comment } = require('../models')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
      const posts = await Post.fideAll({
        limit: 10,
        // offset: 0, // 1 ~ 10 게시글 추가 삭제시 문제 발생 
        order: [
            ['createdAt', 'DESC'],
            [Comment, 'createdAt', 'DESC']
        ], // 최신 게시글 부터 가져옴
        
        include: [{
          model: User,
          attributes: ['id', 'nickname']
        }, {
          model: Image
        }, {
          model: Comment,
          include: [{
            model: User,
            attributes: ['id', 'nickname']
          }]
        }]
      });
      res.status(200).json(posts);
    } catch(error){
      console.error(error)
      next(error)
    }

})
module.exports = router