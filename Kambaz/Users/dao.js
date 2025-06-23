import { v4 as uuidv4 } from 'uuid'

import model from './model.js'

export const createUser = user => {
  const newUser = {
    ...user,
    _id: uuidv4(),
    loginId: Math.random().toString(36).substring(2, 15).toUpperCase(),
    section: 'S101',
    lastActivity: new Date(),
    totalActivity: `${Math.floor(Math.random() * 24)}:${Math.floor(
      Math.random() * 60
    )}:${Math.floor(Math.random() * 60)}`,
  }
  return model.create(newUser)
}

export const findAllUsers = () => model.find()

export const findUserById = userId => model.findById(userId)

export const findUserByUsername = username =>
  model.findOne({ username: username })

export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password })

export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user })

export const deleteUser = userId => model.deleteOne({ _id: userId })

export const findUsersByRole = role => model.find({ role: role }) // or just model.find({ role })

export const findUsersByPartialName = partialName => {
  const regex = new RegExp(partialName, 'i') // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  })
}
