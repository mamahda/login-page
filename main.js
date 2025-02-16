import express from 'express';
import cors from 'cors';

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());

export { app, port };
