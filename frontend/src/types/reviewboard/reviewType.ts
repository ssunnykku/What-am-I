export interface ReviewInitialType {
  description: string;
  images: string;
}

export interface ReviewCommentType {
  reviewCommentId: number;
  description: string;
  reviewId: string;
  userId: string;
}

export interface ReviewType {
  reviewId: number;
  description: string;
  userId: string;
  images: string;
  createdAt: string;
  updatedAt: string;
}
