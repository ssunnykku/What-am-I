import express from 'express';
import db from './src/models/index';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/sequelize';
import { logger } from './src/config/logger';
import http from 'http';
import { socketConfig } from './src/config/socket.js';
import { client } from './src/config/discord.js';
// import { REST, Routes } from 'discord.js';

// const commands = [
//   {
//     name: 'ping',
//     description: 'Replies with Pong!',
//   },
// ];

// const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

// try {
//   console.log('Started refreshing application (/) commands.');

//   rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
//     body: commands,
//   });

//   console.log('Successfully reloaded application (/) commands.');
// } catch (error) {
//   console.error(error);
// }

// import { Client, GatewayIntentBits } from 'discord.js';
// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.on('ready', () => {
//   console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async (interaction) => {
//   console.log(interaction);
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === 'ping') {
//     await interaction.reply('Pong!');
//   }
// });

// client.login(process.env.DISCORD_TOKEN);

//**Router */
import { communityRouter } from './src/routes/community.route';
import { communityPostRouter } from './src/routes/communityPost.route';
import { communityCommentRouter } from './src/routes/communityComment.route';
import { communityPostLikeRouter } from './src/routes/communityPostLike.route';
import { pinnedCommunityRouter } from './src/routes/pinnedCommunity.route';

import { userRouter } from './src/routes/user.router';
import { reviewRouter } from './src/routes/review.route';
import { reviewCommentRouter } from './src/routes/reviewComment.route';
import { reviewLikeRouter } from './src/routes/reviewLike.route.js';

import { myPageRouter } from './src/routes/myPage.route';
import { communityLikeRouter } from './src/routes/communityLike.route';

import { friendRouter } from './src/routes/friend.route';

//**middleware */
import errorMiddleware from './src/middlewares/error';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: '*', credentials: true }));

sequelize.sync({ force: false });

// app.use(morgan('combined'));

app.use(userRouter);
app.use(communityPostRouter);
app.use(reviewRouter);
app.use(reviewCommentRouter);
app.use(reviewLikeRouter);

app.use(communityRouter);
app.use(myPageRouter);
app.use(communityLikeRouter);
app.use(communityCommentRouter);
app.use(communityPostLikeRouter);
app.use(pinnedCommunityRouter);
app.use(friendRouter);

client;

// app.use(index);
app.use(errorMiddleware);

app.listen(process.env.SEVER_PORT, () =>
  console.log(`✅ Listening to port 5001`),
);

const httpServer = http
  .createServer(app)
  .listen(process.env.SOCKETIO_SERVER_PORT);

socketConfig(httpServer);
