import { reviewCommentService } from '../services/revComment.service';
// import Joi from 'joi';

class reviewCommentController {
  static async reviewComments(req, res) {
    try {
      const userId = req.currentUserId;
      const reviewId = req.params.reviewId;
      const { description } = req.body;

      const reviewComment = await reviewCommentService.addReviewComment({
        description,
        reviewId,
        userId,
      });
      if (reviewComment.errorMessage) {
        throw new Error(reviewComment, errorMessage);
      }
      return res.status(201).json(reviewComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  static async showComments(req, res) {
    try {
      const _reviewId = req.params.reviewId;
      console.log(_reviewId);

      const reviewComments = await reviewCommentService.showAllReviewComments({
        _reviewId,
      });
      if (reviewComments.errorMessage) {
        throw new Error(reviewComments, errorMessage);
      }
      return res.status(200).json(reviewComments);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
  static async updateComment(req, res) {
    try {
      const userId = req.currentUserId;

      const reviewCommentId = req.params.reviewCommentId;
      const { description } = req.body;

      const reviewComment = await reviewCommentService.updateComment({
        description,
        reviewCommentId,
        userId,
      });

      if (reviewComment.errorMessage) {
        throw new Error(reviewComment, errorMessage);
      }

      const message = await reviewCommentService.findMessage({
        reviewCommentId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  static async deleteComment(req, res) {
    try {
      const userId = req.currentUserId;

      const reviewCommentId = req.params.reviewCommentId;

      const deleteComment = await reviewCommentService.deleteComment({
        reviewCommentId,
        userId,
      });
      if (deleteComment.errorMessage) {
        throw new Error(deleteComment, errorMessage);
      }
      return res.status(200).json(deleteComment);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
}

export { reviewCommentController };
