import mongoose from 'mongoose'
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  passwordSalt: {
    type: String,
    required: true
  },
  cookieSalt: {
    type: String,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.virtual('password')
  .set(function (password) {
    this.passwordSalt = crypto.randomBytes(32)
    this.cookieSalt = crypto.randomBytes(8)
    this.passwordHash = crypto.pbkdf2Sync(
      password, this.passwordSalt, 2, 32, 'sha256'
    )
  })

userSchema.methods.checkPassword = function (password) {
  return crypto.pbkdf2Sync(
    password, this.passwordSalt, 2, 32, 'sha256'
  ) == this.passwordHash
}

export default mongoose.model('User', userSchema)
