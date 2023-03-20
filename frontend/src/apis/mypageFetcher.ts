import Storage from '../storage/storage';
import { axiosInstance } from '../utils/axiosInstance';

// 프로필
// 내 프로필 정보
export const getUserData = async () => {
  const response = await axiosInstance.get(`/users/current`);
  return response.data;
};
// 유져 이미지 수정
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
  return response;
}
// 유저 삭제
export const deleteUserData = async () => {
  const response = await axiosInstance.delete(`/users`);
  return response.data;
};

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
export async function getUserLiked(page: number) {
  const response = await axiosInstance.get(`/mycommunities/liked?page=${page}`);
  return response.data;
}

// 좋아요 한 커뮤니티에서 내가쓴글
export async function getUserLikedPosts(communityId: number) {
  const response = await axiosInstance.get(`/mycommunities/${communityId}`);
  return response.data;
}

// 내 커뮤니티
export async function getUserCommunites(page: number) {
  const response = await axiosInstance.get(`/mycommunities?page=${page}`);
  return response.data;
}

// 내 커뮤니티 삭제
export async function deleteUserCommunites(communityId: number) {
  const response = await axiosInstance.delete(`/communities/${communityId}`);
  return response.data;
}

// 강아지 종 분석
// 종 분석 이미지 업로드
export async function postPuppyData(dogName: string, aiImage: string) {
  const formData = new FormData();
  formData.append('aiImage', aiImage);
  formData.append('dogName', dogName);

  const response = await axiosInstance.post(
    `/aisearch/${
      Storage.getUserIdItem() ? Storage.getUserIdItem() : 'notUser/test'
    }`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response;
}

// 모든 종 분석 결과
export async function getPuppiesData() {
  const response = await axiosInstance.get(`/airesult`);
  return response;
}

// 종 분석 결과
export async function getPuppyData(id: number) {
  const response = await axiosInstance.get(`/airesult/${id}`);
  return response.data;
}

// 내가 추가한 친구
export async function getFollowingBuddyData(page: number) {
  const res = await axiosInstance.get(`friends/followings?page=${page}`);
  return res.data;
}

// 나를 추가한 친구
export async function getFollowerBuddyData(page: number) {
  const res = await axiosInstance.get(`friends/followers?page=${page}`);
  return res.data;
}

// 나를 추가한 친구 삭제
export async function deleteFollowingBuddy(friendId: string) {
  const res = await axiosInstance.delete(`friends/${friendId}`);
  return res.data;
}
