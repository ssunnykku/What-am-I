import ApiError from '../utils/ApiError';
import { logger } from '../config/logger.js';
import axios from 'axios';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export default async (err, req, res, next) => {
  if (err instanceof ApiError) {
    // console.log(
    //   '\x1b[31m',
    //   '-----------------------------------------------------------------------------------------------------------------------------------------',
    // );
    // console.log('\x1b[33m%s\x1b[0m', err);
    logger.error({
      status: err.status,
      message: err.message,
      url: req.originalUrl,
      method: req.method,
      header: req.rawHeaders,
      body: JSON.stringify(req.body),
      params: JSON.stringify(req.params),
      query: JSON.stringify(req.query),
    });
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
    // console.error(err);
    return;
  }
  // console.log(
  //   '\x1b[31m',
  //   '-----------------------------------------------------------------------------------------------------------------------------------------',
  // );
  // console.log('\x1b[33m%s\x1b[0m', err);

  const payload = {
    content: `🔥 Error ${err.status}: ${err.message} on ${req.method} ${req.originalUrl}`,
  };
  await axios.post(DISCORD_WEBHOOK_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  logger.error({
    status: 500,
    message: err.message,
    url: req.originalUrl,
    method: req.method,
    header: req.rawHeaders,
    body: JSON.stringify(req.body),
    params: JSON.stringify(req.params),
    query: JSON.stringify(req.query),
  });
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
  });
};
