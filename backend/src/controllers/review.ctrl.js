import { reviewService } from '../services/review.service';

class reviewController {
  //모든 글들 다 보기
  static async allReviews(req, res, next) {
    try {
      const _userId = req.currentUserId;
      // GET /review
      const { page } = req.query;
      // 방어코드
      const defaultPage = page || 1;

      const reviewCount = await reviewService.countReviewpage();

      const selectedReviews = await reviewService.selectReviews(
        defaultPage,
        _userId,
      );

      if (selectedReviews.errorMessage) {
        throw new Error(selectedReviews);
      }
      return res.status(200).json({ result: { reviewCount, selectedReviews } });
    } catch (error) {
      return next(error);
    }
  }

  //새로운 리뷰 등록
  static async register(req, res, next) {
    try {
      const aiResultId = req.params.aiResultId;
      const userId = req.currentUserId;

      const { description } = req.body;

      const newReview = await reviewService.addReview({
        description,
        userId,
        aiResultId,
      });
      if (newReview.errorMessage) {
        throw new Error(newReview);
      }
      return res.status(201).json(newReview);
    } catch (error) {
      return next(error);
    }
  }

  //내가쓴 글들 모두 가지고 오기
  static async myReviews(req, res, next) {
    try {
      const userId = req.currentUserId;

      const myReviews = await reviewService.showMyReviews({
        userId,
      });
      if (myReviews.errorMessage) {
        throw new Error(myReviews);
      }
      return res.status(200).send(myReviews);
    } catch (error) {
      return next(error);
    }
  }

  //한개의 리뷰글 보기
  static async review(req, res, next) {
    try {
      const _id = req.params.reviewId;

      const getOne = await reviewService.showReview({
        _id,
      });
      if (getOne.errorMessage) {
        throw new Error(getOne);
      }
      return res.status(200).json(getOne);
    } catch (error) {
      next(error);
    }
  }

  //작성한 리뷰 수정하기
  static async updateReview(req, res, next) {
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
        throw new Error(updateReview);
      }

      const message = await reviewService.findMessage({
        reviewId,
        userId,
      });
      return res.status(200).json(message);
    } catch (error) {
      return next(error);
    }
  }

  static async deleteReview(req, res, next) {
    try {
      const userId = req.currentUserId;
      const reviewId = req.params.reviewId;

      const deleteReview = await reviewService.deleteReview({
        reviewId,
        userId,
      });
      if (deleteReview.errorMessage) {
        throw new Error(deleteReview);
      }
      return res.status(200).json(deleteReview);
    } catch (error) {
      return next(error);
    }
  }

  static async getFoundReviews(req, res, next) {
    try {
      const userId = req.currentUserId;
      const search = req.query.data;
      const foundReviews = await reviewService.searchReviews({
        search,
      });
      if (foundReviews.errorMessage) {
        throw new Error(foundReviews, errorMessage);
      }
      res.status(200).json(foundReviews);
    } catch (error) {
      next(error);
    }
  }
}

export { reviewController };
