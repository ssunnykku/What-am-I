export interface ReviewInitialType {
  description: string;
  // images: string;
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
  aiResultId: number;
  id: number;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  likeStatus: number;
}

export interface ReviewPostType {
  id: number;
  description: string;
  userId: string;
  aiResultId: number | string;
  updatedAt: string;
  createdAt: string;
}

export interface OneReviewType {
  AiSearchResult: {
    aiImage: string;
  };
  User: {
    nickname: string;
    profileImg: string;
  };
  description: string;
  id: number;
  userId: string;
}
