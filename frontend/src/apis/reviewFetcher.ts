import {
  ReviewCommentType,
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
  //   },
  // });
  return res.data;
}

// 리뷰 창에서 댓글 달기
export async function createReviewCommentRequest(
  endpoint: string,
  description: ReviewCommentType,
) {
  const res = await axiosInstance.post(endpoint, {
    description: description,
  });
  return res.data;
}

// 리뷰 전체 불러오기
export async function getReviewsListRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${Storage.getTokenItem()}`,
    },
  });
  return res.data;
}

// // 리뷰 하나 클릭하면 하나 가져오기
export async function getOneReviewRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

// 리뷰 댓글 불러오기
export async function getReviewCommentsRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
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

// 댓글 삭제
export async function deleteReviewRequest(endpoint: string) {
  const res = await axiosInstance.delete(endpoint, {
    headers: {
      Authorization: `Bearer ${Storage.getTokenItem()}`,
    },
  });
  return res.data;
}
