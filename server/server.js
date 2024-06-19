import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import connected from './database/database.js';

import Router from './router/route.js';
const app = express();
const PORT = 4057;

app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

/// Http GET Request -=======

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Home GET Request' });
});

app.use('/api', Router);

connected()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server connected to http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
