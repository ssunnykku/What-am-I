import { CreateCommuInitialType } from '../types/community/communityType';
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

export async function getCurrentCommuListRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function getRankingCommunityRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

export async function getCommunitiesRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}

// like fetcher
export async function postLikeBtnRequest(
  endpoint: string,
  // { 커뮤니티 아이디, 내 유저 아이디 } : 타입
) {
  const res = await axiosInstance.post(endpoint);
}
