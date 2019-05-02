import Koa from 'koa'
import bodyparser from 'koa-bodyparser'
import cors from '@koa/cors'
import mongoose from 'mongoose'
import passport from 'koa-passport'
import router from './router'

mongoose.Promise = Promise
mongoose.connect('mongodb://localhost/db_name', { useNewUrlParser: true, useCreateIndex: true })

const app = new Koa()

app.use(bodyparser())

app.use(cors())

app.use(passport.initialize())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
  }
})

app.use(router)

app.listen(3000)
