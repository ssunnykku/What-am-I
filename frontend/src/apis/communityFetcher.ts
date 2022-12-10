import {
  CommuLikePostType,
  CreateCommuInitialType,
  CreateCurrentCommunityPostType,
} from '../types/community/communityType';
import { axiosInstance } from '../utils/axiosInstance';

export async function createCommunityRequest(
  endpoint: string,
  { name, introduction, communityImage }: CreateCommuInitialType,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('introduction', introduction);
  formData.append('communityImage', communityImage);

  const res = await axiosInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

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

export async function getCurrentCommunityRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint);
  return res.data;
}

export async function getRankingCommunityRequest() {
  const res = await axiosInstance.get(`communities/best`);
  return res.data;
}

export async function getCommunitiesRequest(pages: number) {
  const res = await axiosInstance.get(`communities?page=${pages}`);
  return res.data;
}

// 커뮤니티 내 게시물 수정
// export async function editCurrentPostRequest() {
//   const res = await axiosInstance.put()
//   return res.data
// }

// like fetcher
export async function postCommuLikeRequest(
  endpoint: string,
  { id, userId }: CommuLikePostType,
) {
  const res = await axiosInstance.post(endpoint, { id, userId });
  return res.data;
}
