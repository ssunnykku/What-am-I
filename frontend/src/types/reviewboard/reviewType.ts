export interface ReviewInitialType {
  description: string;
  images: string;
}

export interface ReviewCommentType {
  reviewCommentId: number;
  description: string;
  id: number;
  reviewId: number;
  userId: string;
}

export interface ReviewType {
  id: number;
  description: string;
  userId: string;
  images: string;
  createdAt: string;
  updatedAt: string;
}
