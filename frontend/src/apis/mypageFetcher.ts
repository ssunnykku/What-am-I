import Storage from '../storage/storage';
import { axiosInstance } from '../utils/axiosInstance';

// 프로필
// 내 프로필 정보
export const getUserData = async () => {
  const response = await axiosInstance.get(`/users/current`);
  return response.data;
};
// 유져 이미지 수정
// TODO 폼데이터 이미지는 어떤 타입을 명시해줘야되는거지?
export async function EditUserImg(profileImg: File) {
  const formData = new FormData();
  formData.append('profileImg', profileImg);

  const res = await axiosInstance.patch(
    `/users/${Storage.getUserIdItem()}/image`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return res.data;
}
// 유저 닉네임 수정
export async function EditUserData(nickname: string, password: string) {
  const response = await axiosInstance.put(
    `/users/${Storage.getUserIdItem()}`,
    {
      nickname,
      password,
    },
  );
  console.log(response);
  return response;
}

// 리뷰
// 사용자 리뷰 가져오기
export async function getUserReviews() {
  const response = await axiosInstance.get(`/review/my`);
  return response.data;
}
// 리뷰하나 상세
export async function getUserReview(reviewId: number) {
  const response = await axiosInstance.get(`/review/show/${reviewId}`);
  return response.data;
}
// 리뷰 수정
export async function editUserReview(reviewId: number) {
  const response = await axiosInstance.put(`/review/show/${reviewId}`);
  return response.data;
}
// 리뷰 삭제
export async function deleteUserReview(reviewId: number) {
  const response = await axiosInstance.delete(`/review/${reviewId}`);
  return response.data;
}

// 좋아요 한 커뮤니티
export async function getUserLiked() {
  const response = await axiosInstance.get(`/mycommunities/liked?page=1`);
  return response.data;
}

// 좋아요 한 커뮤니티에서 내가쓴글
export async function getUserLikedPosts(communityId: number) {
  const response = await axiosInstance.get(`/mycommunities/${communityId}`);
  return response.data;
}

// 내 커뮤니티
export async function getUserCommunites() {
  const response = await axiosInstance.get(`/mycommunities?page=1`);
  return response.data;
}

// 내 커뮤니티 삭제
export async function deleteUserCommunites(communityId: number) {
  const response = await axiosInstance.delete(`/communities/${communityId}`);
  return response.data;
}
