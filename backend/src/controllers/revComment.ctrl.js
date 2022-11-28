import { reviewCommentService } from '../services/revComment.service';
// import Joi from 'joi';

const reviewCommentController = {
  reviewComments: async (req, res) => {
    try {
      const reviewId = req.params.reviewId;
      const { description } = req.body;

      const reviewComment = await reviewCommentService.addReviewComment({
        description,
        reviewId,
      });
      if (reviewComment.errorMessage) {
        throw new Error(reviewComment, errorMessage);
      }
      res.status(201).json(reviewComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  showComments: async (req, res) => {
    try {
      const _reviewId = req.params.reviewId;
      console.log(_reviewId);

      const reviewComments = await reviewCommentService.showAllReviewComments({
        _reviewId,
      });
      if (reviewComments.errorMessage) {
        throw new Error(reviewComments, errorMessage);
      }
      res.status(201).json(reviewComments);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  updateComment: async (req, res) => {
    try {
      const id = req.params.id;
      const { description } = req.body;

      const reviewComment = await reviewCommentService.updateComment({
        description,
        id,
      });
      if (reviewComment.errorMessage) {
        throw new Error(reviewComment, errorMessage);
      }
      res.status(201).json(reviewComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const _id = req.params.id;

      const deleteComment = await reviewCommentService.deleteComment({
        _id,
      });
      if (deleteComment.errorMessage) {
        throw new Error(deleteComment, errorMessage);
      }
      res.status(201).json(deleteComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  },
};

export { reviewCommentController };
