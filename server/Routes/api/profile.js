const express = require('express')
const router = express.Router()
const auth = require('../../Middleware/auth')
const Profile = require('../../Models/Profile')
const User = require('../../Models/User')
const Post = require ('../../Models/Posts')
const { check, validationResult } = require('express-validator')

//@route  GET api/profile/me
//@desc   Get current users profile
//@access Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    )

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//@route  POST api/profile/
//@desc   Create or update users profile
//@access Private

router.post(
  '/',
  auth,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
  ],
  async (req, res) => {
    //check for errors in the req body by creating error variable
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    //destructured some fields from req.body
    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body

    //build profile object to insert into the database
    const profileFields = {}

    profileFields.user = req.user.id

    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    //we need to turn skills into an array that we wrote in req.body
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    //build/initialize the social object
    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    //now we can update /insert the data

    //look for the profile by the user
    try {
      let profile = await Profile.findOne({ user: req.user.id })

      //if its found update the profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )
        return res.json(profile)
      }

      //if not found than create the profile
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route  Get api/profile/
//@desc   Get all profiles
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//@route  Get api/profile/user/:user_id
//@desc   Get profile by user id
//@access private
router.get('/user/:user_id', async (req, res) => {
  try {
    //we will get id from req url - so params.id
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (!profile)
      return res.status(400).json({ msg: 'there is no profile for this user' })
    res.json(profile)
  } catch (err) {
    console.error(err.message)

    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

//@route  Delete api/profile
//@desc   Delete profile, user and posts
//@access private
router.delete('/', auth, async (req, res) => {
  try {
    //remove users posts
    await Posts.deleteMany({user: req.user.id})

    //remove profile
    await Profile.findOneAndDelete({ user: req.user.id })

    //remove user
    await User.findOneAndDelete({ _id: req.user.id })

    res.json({ msg: 'user deleted' })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error')
  }
})

//@route  Put api/profile/experience
//@desc   Add profile experience
//@access private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //pull out fields from req.body
    const { title, company, location, from, to, current, description } =
      req.body

    //create object for new experience
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      //get the profile by id
      const profile = await Profile.findOne({ user: req.user.id })
      //unshift- same as push, just the most recents are first.
      profile.experience.unshift(newExp)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route  Delete api/profile/experience/:exp_id
//@desc   delete experience from profile
//@access private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    //get the profile by id
    const profile = await Profile.findOne({ user: req.user.id })

    //get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id)

    //splicing it out
    profile.experience.splice(removeIndex, 1)
    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route  Put api/profile/education
//@desc   Add profile education
//@access private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required').not().isEmpty(),
      check('degree', 'degree is required').not().isEmpty(),
      check('fieldofstudy', 'field of study is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    //pull out fields from req.body
    const { school, degree, fieldofstudy, from, to, current, description } =
      req.body

    //create object for new experience
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      //get the profile by id
      const profile = await Profile.findOne({ user: req.user.id })
      //unshift- same as push, just the most recents are first.
      profile.education.unshift(newEdu)

      await profile.save()

      res.json(profile)
    } catch (error) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route  Delete api/profile/education/:edu_id
//@desc   delete education from profile
//@access private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    //get the profile by id
    const profile = await Profile.findOne({ user: req.user.id })

    //get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id)

    //splicing it out
    profile.education.splice(removeIndex, 1)
    await profile.save()

    res.json(profile)
  } catch (error) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
