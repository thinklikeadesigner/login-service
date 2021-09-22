/* eslint-disable linebreak-style */
const cors = require('cors');
require('dotenv').config();
// const Redis = require('redis');
// const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const limiter = require('./utils/rate-limiter');
const NotFoundError = require('./errors/NotFoundError');
const { requestLogger, errorLogger } = require('./middleware/logger');
const thrownErrorHandler = require('./errors/thrown-error-handler');
const { notFoundErrorMessage } = require('./utils/constants');

const rootRouter = require('./routes/index');
/*
COMPLETE The rate limiter is configured in a separate file and imported into app.js.
https://snipboard.io/B5CXGw.jpg

*/

const app = express();

/* COMPLETE https://snipboard.io/i1zMXm.jpg limiter is connected before the request logger.
Requests rejected by the limiter will not be added to the request.log.
It is necessary to connect the logger first in the chain, and then the limiter
*/
let port = process.env.PORT;
if (port == null || port === '') {
  port = 3000;
}

const { NODE_ENV, MONGODB_URI } = process.env;
//  apply to all requests

// const DEFAULT_EXPIRATION = 3600;

// const redisClient = Redis.createClient();

// app.get('/photos', async (req, res) => {
//   const { albumId } = req.query;
//   redisClient.get('photos', async (error, photos) => {
//     if (photos != null) {
//       console.log('cache hit');
//       return res.json(JSON.parse(photos));
//     }
//     const { data } = await axios.get('https://jsonplaceholder.typicode.com/photos', {
//       params: { albumId },
//     });
//     console.log('cache miss');
//     redisClient.setex('articles', DEFAULT_EXPIRATION, JSON.stringify(data));
//     res.send(data);
//   });
// });

app.use(requestLogger);
app.use(cors());
app.use(helmet());
app.use(express.json());

/*
COMPLETE All routes are connected to the index.js file, which is located
in the routes folder, and app.js contains one main route handled by routes.
https://snipboard.io/hLTQyB.jpg
*/

app.use(rootRouter);
app.use(limiter);
app.use(errorLogger);
app.use('/', () => {
  throw new NotFoundError(notFoundErrorMessage);
});

app.use(errors());

/* COMPLETE https://snipboard.io/1W3hpQ.jpg
Centralized error handling is described inside a separate module.
*/

app.use(thrownErrorHandler);

/*
COMPLETE In production mode, the database address is taken from process.env.
https://snipboard.io/1FywqR.jpg
*/

mongoose.connect(
  NODE_ENV === 'production' ? MONGODB_URI : 'mongodb://localhost:27017/newsexplorer',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
);

app.listen(port);
