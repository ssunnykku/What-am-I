import { reviewCommentService } from '../services/reviewComment.service';
// import Joi from 'joi';

class reviewCommentController {
  static async newReviewComments(req, res, next) {
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
        throw new Error(reviewComment);
      }
      return res.status(201).json(reviewComment);
    } catch (error) {
      next(error);
    }
  }

  static async showReviewComments(req, res, next) {
    try {
      const _reviewId = req.params.reviewId;

      const reviewComments = await reviewCommentService.showAllReviewComments({
        _reviewId,
      });

      if (reviewComments.errorMessage) {
        throw new Error(reviewComments);
      }
      return res.status(200).json(reviewComments);
    } catch (error) {
      next(error);
    }
  }

  static async showOneReviewComments(req, res, next) {
    try {
      const userId = req.currentUserId;
      const reviewId = req.params.reviewId;

      const id = req.params.reviewCommentId;

      const oneReviewComment = await reviewCommentService.showOneReviewComments(
        {
          id,
          reviewId,
        },
      );
      if (oneReviewComment.errorMessage) {
        throw new Error(oneReviewComment);
      }
      return res.status(200).json(oneReviewComment);
    } catch (error) {
      next(error);
    }
  }

  static async updateComment(req, res, next) {
    try {
      const userId = req.currentUserId;
      const id = req.params.reviewCommentId;
      const { description } = req.body;

      const reviewComment = await reviewCommentService.updateComment({
        description,
        id,
        userId,
      });

      if (reviewComment.errorMessage) {
        throw new Error(reviewComment);
      }

      const message = await reviewCommentService.findMessage({
        id,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const userId = req.currentUserId;

      const id = req.params.reviewCommentId;

      const deleteComment = await reviewCommentService.deleteComment({
        id,
        userId,
      });
      if (deleteComment.errorMessage) {
        throw new Error(deleteComment);
      }
      return res.status(200).json(deleteComment);
    } catch (error) {
      next(error);
    }
  }
}

export { reviewCommentController };
