import ApiError from "../utils/ApiError";

export default (err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    success: false,
    status: 500,
    message: err.message,
  });
};
