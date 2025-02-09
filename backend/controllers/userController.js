import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const updatedUser = await user.save()

    res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        middleName: updatedUser.middleName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        email: updatedUser.email,
        isHost: updatedUser.isHost,
        isAttendee: updatedUser.isAttendee,
        token: generateToken(updatedUser._id),
    })
    res.status(200)
  } 
  else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

export {
  authUser
}