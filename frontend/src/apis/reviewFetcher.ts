import {
  ReviewCommentType,
  ReviewInitialType,
} from '../types/reviewboard/reviewType';
import axiosInstance from '../utils/axiosInstance';

// 글쓰기
export async function createReviewRequest(
  endpoint: string,
  { description, images }: ReviewInitialType,
) {
  const formData = new FormData();
  formData.append('description', description);
  formData.append('images', images as File);
  const res = await axiosInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// 댓글 달기
export async function createReviewCommentRequest(
  endpoint: string,
  description: ReviewCommentType,
) {
  const res = await axiosInstance.post(endpoint, {
    description: description,
  });
  return res.data;
}

// 정보 불러오기

export async function getReviewsListRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(res);
  return res.data;
}
