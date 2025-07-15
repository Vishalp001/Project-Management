import User from '../models/User.js'
// exports.createUser = async (req, res) => {
//   try {
//     const user = await User.create(req.body)
//     res.status(201).json(user)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// }
export const createOrUpdateUser = async (req, res) => {
  try {
    const { uid, email, displayName, photoURL } = req.body.payload
    console.log('Received fields:', req.body)

    if (!uid || !email || !displayName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const update = {
      uid,
      email,
      displayName,
      photoURL,
      lastLoginAt: new Date(),
    }

    const user = await User.findOneAndUpdate({ uid }, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    })

    console.log('User created or updated successfully')
    res.json(user)
  } catch (err) {
    console.error('Error in createOrUpdateUser:', err)
    res.status(500).json({ error: 'User creation failed' })
  }
}

export const getUserByUid = async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid }).populate(
      'projects tasks'
    )
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
