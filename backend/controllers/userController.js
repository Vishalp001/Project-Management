import User from '../models/User.js'
import bcrypt from 'bcrypt'
export const registerUser = async (req, res) => {
  try {
    const { email, password, name, photoURL } = req.body
    console.log('Received fields:', req.body)

    // Validate required fields
    if (!password || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    //Hash Password
    const hadedPassword = await bcrypt.hash(password, 10)

    //Create User
    const newUser = new User({
      email,
      password: hadedPassword,
      name,
      photoURL,
    })

    await newUser.save()
    res.status(200).json({
      message: 'User Register successfuly',
      data: newUser,
    })
  } catch (err) {
    console.error('Error in createOrUpdateUser:', err)
    res.status(500).json({ error: 'User creation failed' })
  }
}

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Hmm... we can’t find you. Did you mean to sign up?' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' })

    user.lastLoginAt = new Date()
    await user.save()

    // You can set up a session here if not using JWT
    res.status(200).json({
      message: 'Login successful',
      user,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const getUserByUid = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email: email }).populate('projects tasks')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('projects tasks')
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('projects tasks')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
