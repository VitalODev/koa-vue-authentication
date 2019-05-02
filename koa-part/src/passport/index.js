import passport from 'passport'
import LocalStrategy from 'passport-local'
import jwt from 'passport-jwt'
import User from '../mongoose'

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
(email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(
          null,
          false,
          { message: 'User doesn\'t exist' }
        )
      }

      if (!user.checkPassword(password)) {
        return done(
          null,
          false,
          { message: 'Password is incorrect' }
        )
      }

      return done(null, user)
    }, err => done(err))
}))

passport.use(new jwt.Strategy({
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret key'
},
(payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    }, err => done(err))
}))
