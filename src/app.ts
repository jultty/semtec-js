import express, { Application, Response, Request } from 'express'
import cors from 'cors'
import helmet from 'helmet'

const app: Application = express()

// Configure middleware
app.use(express.json())
app.use(cors())
app.use(helmet())

// Define a route handler
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('OK')
})

export default app
