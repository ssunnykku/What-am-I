import { reviewService } from '../services/review.service';
// import Joi from 'joi';

const reviewController = {
  register: async (req, res) => {
    try {
      const { description, images, userId } = req.body;

      const newReview = await reviewService.addReview({
        description,
        images,
        userId,
      });
      if (newReview.errorMessage) {
        throw new Error(newReview, errorMessage);
        // console.log(newUser.errorMessage);
      }
      res.status(201).json(newReview);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  myReviews: async (req, res) => {
    try {
      const { userId } = req.body;

      const myReviews = await reviewService.showMyReviews({
        userId,
      });
      if (myReviews.errorMessage) {
        throw new Error(myReviews, errorMessage);
      }
      res.status(201).json(myReviews);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  reviewComments: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { description } = req.body;

      const comments = await reviewService.showReviewComments({
        reviewId,
      });
      if (comments.errorMessage) {
        throw new Error(comments, errorMessage);
      }
      res.status(201).json(comments);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
};

export { reviewController };
