import express from 'express';
import http from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connect, set } from 'mongoose';
import { dbConnection } from './database';



import { getEnv, Response, logger } from './utils';
import customAPI from './api';

const app = express();
const server = http.createServer(app);
const port = getEnv('PORT', 9000);

connectToDatabase();

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


async function connectToDatabase() {
  try {

  if (process.env !== 'production') {
    set('debug', true);
  }
   const dbcon = await connect(dbConnection.url, dbConnection.options);
   console.log(`${dbcon && ' successfully connected to database'}`)
  } catch(error) {
    console.log('Unable to connect to database', `${error}`)
  }
}

app.get('/', (req, res) => {
  Response(res, { status: 200, message: 'Welcome to Workflow package delivery' });
});

customAPI(app);

server.listen(getEnv('PORT', port), () => {
  logger(`Server Running at:
    http://localhost:${getEnv('PORT', port)}`);
});
export default app;
