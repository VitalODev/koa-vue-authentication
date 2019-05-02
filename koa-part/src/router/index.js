import Router from 'koa-router'
import passport from 'passport'
import jsonwebtoken from 'jsonwebtoken'
import passportStrategies from '../passport'
import User from '../mongoose'

const router = new Router()

router.post('/login', async ctx => {
  await passport.authenticate(
    'local',
    (err, user, info, status) => {
      if (err) {
        ctx.throw(err.status)
      } else if (!user) {
        ctx.body = { info }
      } else {
        const payload = {
          id: user.id
        }

        const token = jsonwebtoken.sign(
          payload,
          'secret key'
        )

        ctx.body = {
          token: token,
          email: user.email,
          defense: user.cookieSalt
        }
      }
    }
  )(ctx)
})

router.post('/registration', async ctx => {
  try {
    await User.create(ctx.request.body)

    await passport.authenticate(
      'local',
      (err, user, info, status) => {
        if (err) {
          ctx.throw(err.status)
        } else if (!user) {
          ctx.body = { info }
        } else {
          const payload = {
            id: user.id
          }

          const token = jsonwebtoken.sign(
            payload,
            'secret key'
          )

          ctx.body = {
            token: token,
            email: user.email,
            defense: user.cookieSalt
          }
        }
      }
    )(ctx)
  } catch (err) {
    if (err.name == 'MongoError' && err.code == 11000) {
      ctx.body = {
        info: { message: 'This email is already used' }
      }
      return
    }

    ctx.throw(err.status)
  }
})

router.post('/guard', async (ctx) => {
  await passport.authenticate('jwt', (err, user) => {
    if (user) {
      if (user.cookieSalt == ctx.request.body.defense) {
        ctx.body = user.email
      } else {
        ctx.body = {
          info: { message: 'Something wrong with cookie' }
        }
      }
    } else if (!user) {
      ctx.body = { info: { message: 'Please, log in!' }}
    } else if (err) {
      ctx.status = err.status
    }
  })(ctx)
})

export default router.routes()
