import { CreateCommuInitialType } from '../types/community/communityType';
import { axiosInstance } from '../utils/axiosInstance';

export async function createCommunityRequest(
  endpoint: string,
  { name, introduction, communityImage }: CreateCommuInitialType,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('introduction', introduction);
  formData.append('communityImage', communityImage as File);

  const res = await axiosInstance.post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

export async function currentCommuListRequest(endpoint: string) {
  const res = await axiosInstance.get(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
}
