import Review from '../models/Review.model.js';

class reviewService {
  static async addReview({ description, images, userId }) {
    // const user = await UserController.findByUserEmail({ email });

    // if (user) {
    //   const errorMessage = '사용중인 이메일입니다.';
    //   return { errorMessage };
    // }

    // db에 저장
    const createdNewReview = await Review.create({
      description,
      images,
      userId,
    });
    createdNewReview.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewReview;
  }
}

export { reviewService };
