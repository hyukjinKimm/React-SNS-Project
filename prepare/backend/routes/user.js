const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('./models')
const router = express.Router()

router.post('/', async (req, res, next) => {
  try{
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