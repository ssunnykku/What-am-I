import express from 'express';
import db from './src/models/index';
import dotenv from 'dotenv';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import sequelize from './src/config/sequelize';
import errorMiddleware from './src/middlewares/error';
import { userAuthRouter } from './src/routes/userRouter';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log('sql connected');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get('/', (req, res, next) => {
  res.send('Team08 Backend');
});

app.use(userAuthRouter);

app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
