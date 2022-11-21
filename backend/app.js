import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import errorMiddleware from './src/middlewares/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });

app.get('/', (req, res, next) => {
  res.send('Team08 Backend');
});

app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);
