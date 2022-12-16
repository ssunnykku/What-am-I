import styled, { keyframes } from 'styled-components';
import { CurrentCommuityProps } from '../modal/CommuContentsModal';
import CommuPostingLikeBtn from './CommuPostingLikeBtn';

const CommuPuppyCard = ({
  onCardModalClickEvent,
  commuPost,
}: CurrentCommuityProps) => {
  return (
    <PuppyCardBox onClick={onCardModalClickEvent}>
      <img src={commuPost?.images.split('최고')[0]} />
      <div className="like-icon">
        <CommuPostingLikeBtn commuPost={commuPost} />
      </div>
    </PuppyCardBox>
  );
};

export default CommuPuppyCard;

const popup = keyframes`
  from {
    transform: translateY(0.3rem);
  }
  to {
    transform: translateY(0rem);
  }
`;

const PuppyCardBox = styled.div`
  width: 14rem;
  height: 13rem;
  /* border: solid 1px black; */
  border-radius: 10px;
  margin: 10px 10px;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .like-icon {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 150%;
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.3);
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
    cursor: pointer;

    .like-icon {
      top: 45%;
    }
  }
`;
