import { revCommentService } from '../services/revComment.service';
// import Joi from 'joi';

const revCommentController = {
  reviewComments: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { description } = req.body;

      const revComment = await revCommentService.addRevComment({
        description,
        reviewId,
      });
      if (revComment.errorMessage) {
        throw new Error(revComment, errorMessage);
      }
      res.status(201).json(revComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  showComments: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      // const { reviewId } = req.body;

      const revComment = await revCommentService.showAllRevComments({
        reviewId,
      });
      if (revComment.errorMessage) {
        throw new Error(revComment, errorMessage);
      }
      res.status(201).json(revComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
};

export { revCommentController };
