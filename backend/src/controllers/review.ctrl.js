import { reviewService } from '../services/review.service';
// import Joi from 'joi';

class reviewController {
  //모든 글들 다 보기
  static async allReviews(req, res, next) {
    try {
      // GET /review
      const { page } = req.query;
      // 방어코드
      const defaultPage = page || 1;

      const reviewCount = await reviewService.countReviewpage();
      // console.log(reviewCount);

      const selectedReviews = await reviewService.selectReviews(defaultPage);
      // console.log();

      if (selectedReviews.errorMessage) {
        throw new Error(selectedReviews, errorMessage);
      }
      return res.status(200).json({ result: { reviewCount, selectedReviews } });
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  //새로운 리뷰 등록
  static async register(req, res) {
    try {
      const userId = req.currentUserId;
      const { description, images } = req.body;

      const newReview = await reviewService.addReview({
        description,
        images,
        userId,
      });
      if (newReview.errorMessage) {
        throw new Error(newReview, errorMessage);
        // console.log(newUser.errorMessage);
      }
      return res.status(201).json(newReview);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  //내가쓴 글들 모두 가지고 오기
  static async myReviews(req, res) {
    try {
      const userId = req.currentUserId;

      const myReviews = await reviewService.showMyReviews({
        userId,
      });
      if (myReviews.errorMessage) {
        throw new Error(myReviews, errorMessage);
      }
      return res.status(200).json(myReviews);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  //한개의 리뷰글 보기
  static async review(req, res) {
    try {
      const _id = req.params.reviewId;

      const comments = await reviewService.showReview({
        _id,
      });
      if (comments.errorMessage) {
        throw new Error(comments, errorMessage);
      }
      return res.status(200).json(comments);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  //작성한 리뷰 수정하기
  static async updateReview(req, res) {
    try {
      const userId = req.currentUserId;

      const reviewId = req.params.reviewId;
      const { description } = req.body;

      const updateReview = await reviewService.updateReview({
        description,
        reviewId,
        userId,
      });

      if (updateReview.errorMessage) {
        throw new Error(updateReview, errorMessage);
      }

      const message = await reviewService.findMessage({
        reviewId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      const userId = req.currentUserId;
      const reviewId = req.params.reviewId;

      const deleteReview = await reviewService.deleteReview({
        reviewId,
        userId,
      });
      if (deleteReview.errorMessage) {
        throw new Error(deleteReview, errorMessage);
      }
      return res.status(200).json(deleteReview);
    } catch (error) {
      return res.status(400).json({ code: 400, message: error.message });
    }
  }
}

export { reviewController };
