import styled, { keyframes } from 'styled-components';

interface PuppyCardProps {
  onCardModalClickEvent: () => void;
}

const PuppyCard = ({ onCardModalClickEvent }: PuppyCardProps) => {
  return <PuppyCardBox onClick={onCardModalClickEvent}></PuppyCardBox>;
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
  margin: 0.5rem 0.5rem;
  :hover {
    background-color: rgba(0, 0, 0, 0.3);
    animation-duration: 0.25s;
    animation-timing-function: ease-in-out;
    animation-name: ${popup};
    animation-fill-mode: forwards;
    cursor: pointer;
  }
`;
