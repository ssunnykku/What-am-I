export interface ReviewInitialType {
  description: string;
  images: string;
}

export interface ReviewCommentType {
  description: string;
  id: number;
  reviewId: number;
  userId: string;
  nickname: string;
  profileImg: string;
}

export interface ReviewType {
  id: number;
  description: string;
  userId: string;
  images: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  likeStatus: number;
}

export interface OneReviewType {
  description: string;
  id: number;
  nickname: string;
  profileImg: string;
  userId: string;
}

export interface LikeGetType {
  myLikeInformation: {
    createdAt: string;
    id: number;
    reviewId: string;
    userId: string;
  };
  totalLikes: number;
}
