export interface CreateCommuInitialType {
  name: string;
  introduction: string;
  communityImage: File;
}

export interface CreateCurrentCommunityPostType {
  images: File[];
  description: string;
}

export interface EditCommuInitialType {
  name: string;
  introduction: string;
  communityImage: File | string;
}

export interface CommunityType {
  id: number;
  userId: string;
  name: string;
  introduction: string;
  likeCount: number;
  likeStatus: number;
  communityImage: string;
  createdAt: string;
  updatedAt: string;
  pinStatus: number;
}

export interface CommunityRankingType {
  likeStatus: number | boolean;
  communityId: number;
  likeCount: number;
  Community: {
    id: number;
    userId: string;
    name: string;
    introduction: string;
    communityImage: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface PinnedCommunityType {
  Community: {
    communityImage: string;
    createdAt: string;
    id: number;
    introduction: string;
    name: string;
    updatedAt: string;
    userId: string;
  };
  communityId: number;
  id: number;
  userId: string;
}

export interface CommunityListType {
  communityCount: number;
  getCommunities: Array<CommunityType>;
}

export interface CurrentCommuPostsType {
  communityId: number;
  createdAt: string;
  deletedAt: string | null;
  description: string;
  id: number;
  images: string;
  updatedAt: string;
  userId: string;
  friendId: string;
  nickname: string;
  profileImg: string;
  likeCount: number;
  likeStatus: number;
}

export interface CurrCommuCommentsType {
  id: number;
  description: string;
  communityPostId: number;
  userId: string;
  nickname: string;
  profileImg: string;
  friendId: string;
}

export interface CommuNumType {
  communityPostCount: number;
  countAllPosts: number;
  countCommunityLike: number;
  myCommunityLikeStatus: number;
}

export interface BuddyType {
  userId: string;
  nickname: string;
  profileImg: string;
  Friend: {
    id: number;
    friendId: string;
    userId: string;
  };
}

export interface FriendType {
  id: number;
  friendId: string;
  userId: string;
  message: string;
}
