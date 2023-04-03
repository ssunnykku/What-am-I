import { Link } from 'react-router-dom';
import {
  CommuCardBox,
  CommuImage,
  CommuName,
  CommunityTypeProps,
} from './CommuRankingCard';

const CommuPinCard = ({ listInfo }: CommunityTypeProps) => {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={`/likedcommunity?id=${listInfo?.id}`}
    >
      <CommuCardBox>
        <CommuImage>
          <img src={listInfo?.communityImage} />
        </CommuImage>
        <CommuName>{listInfo?.name}</CommuName>
      </CommuCardBox>
    </Link>
  );
};

export default CommuPinCard;
