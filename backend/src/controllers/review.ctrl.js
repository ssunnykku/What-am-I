import { reviewService } from '../services/reviewService';
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
};

export { reviewController };
