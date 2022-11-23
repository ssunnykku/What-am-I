import { Community } from '../models';
import ApiError from '../utils/ApiError';
import { COMMUNITY_PER_PAGE } from '../utils/Constant';

export default {
  async countCommunityPage() {
    const communityCount = await Community.count();
    if (communityCount % COMMUNITY_PER_PAGE === 0) {
      return communityCount / COMMUNITY_PER_PAGE;
    } else {
      return Math.floor(communityCount / COMMUNITY_PER_PAGE) + 1;
    }
  },

  async selectCommunities(page) {
    const selectedCommunities = await Community.findAll({
      offset: (page - 1) * COMMUNITY_PER_PAGE,
      limit: COMMUNITY_PER_PAGE,
    });

    if (!selectedCommunities) {
      throw ApiError.setBadRequest('No community available');
    }

    return selectedCommunities;
  },
};
