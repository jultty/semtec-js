import * as dotenv from 'dotenv'
import express, { Application, Response, Request } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'

dotenv.config()

// Configure logging
const app_log_stream = fs.createWriteStream(
  path.join(__dirname, '..', 'app.log'),
  { flags: 'a' }
)

function debugLogger(message: string): void {
  if (parseInt(process.env.DEBUG || '')) {
    const timestamp = new Date().toISOString()
    app_log_stream.write(`${timestamp} [  debug  ] ${message} \n`)
  }
}

debugLogger('Debug logger is up and DEBUG is set')

// prettier-ignore
const requestLogger = morgan((tokens, req, res) => {
  return [
    tokens.date(req, res, 'iso'),
    '[ request ]',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res), '::',
    tokens.res(req, res, 'content-length'), 'bytes in',
    tokens['response-time'](req, res), 'ms',
    'of', tokens['total-time'](req, res), 'ms'
  ].join(' ')
}, { stream: app_log_stream })

// Configure database
const conn_string: string = process.env.MONGO_CONNSTRING ?? ''
const db_name: string = process.env.MONGO_DBNAME ?? ''

async function setupDatabaseConnection(): Promise<void> {
  try {
    await mongoose.connect(conn_string, {
      autoIndex: true,
      dbName: db_name,
    })
    debugLogger(`Connected to ${db_name}`)
  } catch (error) {
    debugLogger(`Failed to connect to ${db_name}: ${String(error)}`)
  }

  const db = mongoose.connection
  db.on('error', (error) => debugLogger(`Connection error: ${String(error)}`))
  db.once('open', () => debugLogger('Connection opened'))
}

void setupDatabaseConnection()

// Configure Express
const app: Application = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(requestLogger)

// Setup routes
app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('OK')
})

export default app
