import {
  CreateCommuInitialType,
  CreateCurrentCommunityPostType,
  EditCommuInitialType,
} from '../types/community/communityType';
import { axiosInstance } from '../utils/axiosInstance';

// 커뮤니티 만들기
export async function createCommunityRequest({
  name,
  introduction,
  communityImage,
}: CreateCommuInitialType) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('introduction', introduction);
  formData.append('communityImage', communityImage);

  const res = await axiosInstance.post(`communities`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// 커뮤니티 수정
export async function editCommunityRequest(
  endpoint: string,
  { name, introduction, communityImage }: EditCommuInitialType,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('introduction', introduction);
  formData.append('communityImage', communityImage);

  const res = await axiosInstance.put(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// 커뮤니티 내 게시물 쓰기
export async function CreateCurrentCommunityPostRequest(
  endpoint: string,
  { images, description }: CreateCurrentCommunityPostType,
) {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append(`images`, images[i]);
  }
  formData.append('description', description);

  const res = await axiosInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

// 베스트 커뮤니티 받기
export async function getRankingCommunityRequest() {
  const res = await axiosInstance.get(`communities/best`);
  return res.data;
}

// 커뮤니티 전체 목록 받기
export async function getCommunitiesRequest(pages: number) {
  const res = await axiosInstance.get(`communities?page=${pages}`);
  return res.data;
}

// 현재 커뮤니티 게시글/댓글 받기
export async function getCurrentCommunityRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint);
  return res.data;
}

// 현재 커뮤니티 댓글 쓰기
export async function postCurrCommuCommentsRequest(
  communityPostId: number,
  description: string,
) {
  const res = await axiosInstance.post(`communityComment/${communityPostId}`, {
    description,
  });
  return res.data;
}

// 포스팅 수정
export async function editCommuPostRequest(
  endpoint: string,
  description: string,
) {
  const res = await axiosInstance.put(endpoint, {
    description,
  });
  return res.data;
}

// 포스팅 삭제
export async function deleteCommuPostRequest(id: number) {
  const res = await axiosInstance.delete(`communitypost/${id}`);
  return res.data;
}

// 댓글 수정
export async function editCurrCommuCommentsRequest(
  communityCommentId: number,
  description: string,
) {
  const res = await axiosInstance.put(
    `communityComment/${communityCommentId}`,
    { description },
  );
  return res.data;
}

// 댓글 삭제
export async function deleteCurrCommuRequest(endpoint: string) {
  const res = await axiosInstance.delete(endpoint);
  return res.data;
}

// like fetcher
export async function postCommuLikeRequest(endpoint: string) {
  const res = await axiosInstance.post(endpoint);
  return res.data;
}
