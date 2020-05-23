import express from 'express'
import createError from 'http-errors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import candidatesRouter from './routes/candidates'

const app: any = express()

app.use(helmet())

app.use((_req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', candidatesRouter)

// catch 404 and forward to error handler
app.use(function (_req: any, _res: any, next: any) {
  next(createError(404))
})

// error handler
app.use(function (err: any, req: any, res: any) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

export default app