import {
  CreateCommuInitialType,
  CreateCurrentCommunityPostType,
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

// 커뮤니티 내 게시물 쓰기
export async function CreateCurrentCommunityPostRequest(
  endpoint: string,
  { images, description }: CreateCurrentCommunityPostType,
) {
  const formData = new FormData();
  formData.append('images', images);
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

// 현재 커뮤니티 게시글 받기
export async function getCurrentCommunityRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint);
  return res.data;
}

// 커뮤니티 수정
export async function editCommunityRequest(
  endpoint: string,
  { name, introduction, communityImage }: CreateCommuInitialType,
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

// like fetcher
export async function postCommuLikeRequest(endpoint: string) {
  const res = await axiosInstance.post(endpoint);
  return res.data;
}
