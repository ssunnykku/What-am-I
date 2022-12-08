export interface CreateCommuInitialType {
  name: string;
  introduction: string;
  communityImage: File;
}

export interface CommunityType {
  id: number;
  userId: string;
  name: string;
  introduction: string;
  communityImage: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityRankingType {
  communityId: number;
  countLike: number;
  Community?: {
    id: number;
    userId: string;
    name: string;
    introduction: string;
    communityImage: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CommunityListType {
  result: {
    communityCount: number;
    selectedCommunity: Array<CommunityType>;
  };
}
