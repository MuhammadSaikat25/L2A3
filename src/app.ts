import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { userRoute } from './modules/users/user.route'
import { globalError } from './middelware/globalError'
const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api',userRoute)

app.use(globalError)

export default app