const express = require('express')
const router = express.Router()
const auth = require ('../../Middleware/auth')
const User = require('../../Models/User')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const bcrypt = require('bcryptjs')


//@route  GET api/auth
//@desc   get route
//@access Public
router.get('/',auth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error')
  }
})

//@route  Post api/auth
//@desc   authenticate user and get token
//@access Public
router.post(
  '/',
  [    
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'password is required'
    ).exists()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {email, password } = req.body

    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      //bcrypt compare method 
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return res
         .status(400)
         .json({ errors: [{ msg: 'Invalid credentials' }] })
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) {
          throw err
        }

        res.json({ token })
      })
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router