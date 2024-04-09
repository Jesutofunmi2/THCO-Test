import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from '../src/router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
  credentials: true
}))

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

async function start() {
    mongoose.Promise = Promise;
    mongoose.connect("mongodb://root:root@localhost:27017/test-thco?&authSource=admin")
    mongoose.connection.on('error', (error: Error) => console.log(error))
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
}

start()

app.use('/api/v1', router())