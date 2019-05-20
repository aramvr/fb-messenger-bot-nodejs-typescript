import express from 'express';
import webHook from './webHook';
import authorize from './authorize'

export default (app: express.Application) => {
  const router = express.Router();
  app.use(express.json());

  app.use('/webhook', webHook);
  app.use('/authorize', authorize);

};
