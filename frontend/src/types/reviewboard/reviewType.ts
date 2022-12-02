export interface ReviewInitialType {
  description: string;
  images: string | Blob;
}

export interface ReviewCommentType {
  reviewCommentId: number;
  description: string;
  reviewId: string;
  userId: string;
}
export interface ReviewsListType {
  reviewId: number;
  description: string;
  userId: string;
  images: string;
  createdAt: string;
  updatedAt: string;
}
