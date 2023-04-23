import ApiError from '../utils/ApiError';
import { logger } from '../config/logger.js';

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    // console.log(
    //   '\x1b[31m',
    //   '-----------------------------------------------------------------------------------------------------------------------------------------',
    // );
    // console.log('\x1b[33m%s\x1b[0m', err);
    logger.error({ status: err.status, message: err.message });
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
  logger.error({ status: 500, message: err.message });
  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
  });
};
