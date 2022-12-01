import { axiosInstance } from '../utils/axiosInstance';
import Storage from '../storage/storage';

export interface CreateCommuInitialType {
  name: string;
  communityImage?: string | Blob;
  introduction: string;
}

export async function createCommuRequest(
  endpoint: string,
  { name, communityImage, introduction }: CreateCommuInitialType,
) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('communityImage', communityImage as File);
  formData.append('introduction', introduction);
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
