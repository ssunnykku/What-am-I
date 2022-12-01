import styled, { keyframes } from 'styled-components';
import LikeBtn from '../../components/common/LikeBtn';

interface PuppyCardProps {
  onCardModalClickEvent: () => void;
}

const PuppyCard = ({ onCardModalClickEvent }: PuppyCardProps) => {
  return (
    <PuppyCardBox onClick={onCardModalClickEvent}>
      <div className="like-icon">
        <LikeBtn />
      </div>
    </PuppyCardBox>
  );
};

export default PuppyCard;

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
  border: solid 1px black;
  border-radius: 10px;
  margin: 10px 10px;
  display: flex;
  justify-content: center;

  position: relative;
  overflow: hidden;
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
