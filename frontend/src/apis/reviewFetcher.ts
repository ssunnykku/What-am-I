import {
  LikePostType,
  ReviewInitialType,
} from '../types/reviewboard/reviewType';
import axiosInstance from '../utils/axiosInstance';
import Storage from '../storage/storage';

// 리뷰 게시판 글쓰기
export async function createReviewRequest(
  endpoint: string,
  { description, images }: ReviewInitialType,
) {
  // const formData = new FormData();
  // formData.append('description', description);
  // formData.append('images', images);
  // 이미지가 배열이라면 images as File[]로 써야 한다.

  const res = await axiosInstance.post(endpoint, {
    description: description,
    images: images,
  });

  // const res = await axiosInstance.post(endpoint, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     Authorization: `Bearer ${Storage.getTokenItem()}`,
  //   },
  // });
  return res.data;
}

// 리뷰 창에서 댓글 달기
export async function createReviewCommentRequest(
  endpoint: string,
  description: string,
) {
  const res = await axiosInstance.post(endpoint, {
    description,
  });
  return res.data;
}

// 리뷰 불러오기
export async function getReviewRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Storage.getTokenItem()}`,
    },
  });
  return res.data;
}

// 리뷰 수정
export async function editReviewRequest(endpoint: string, description: string) {
  const res = await axiosInstance.put(
    endpoint,
    {
      description: description,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Storage.getTokenItem()}`,
      },
    },
  );
  return res.data;
}

// 리뷰 삭제
export async function deleteReviewRequest(endpoint: string) {
  const res = await axiosInstance.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${Storage.getTokenItem()}`,
    },
  });
  return res.data;
}

// 좋아요 포스트
export async function likeRequest(
  endpoint: string,
  { userId, reviewId }: LikePostType,
) {
  const res = await axiosInstance.post(endpoint, {
    userId,
    reviewId,
  });
  return res.data;
}
