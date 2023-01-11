import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import CommuLikeBtn from './CommuLikeBtn';
import { CommuCardBox, CommuImage, CommuName } from './CommuRankingCard';

const CommuPinCard = () => {
  return (
    <Link
      style={{ textDecoration: 'none', color: 'black' }}
      to={'/likedcommunity'}
    >
      <CommuCardBox>
        <CommuImage>
          <img />
        </CommuImage>
        <CommuName></CommuName>
      </CommuCardBox>
    </Link>
  );
};

export default CommuPinCard;
