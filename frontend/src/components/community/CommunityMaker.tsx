import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';

const CommunityMaker = () => {
  return (
    <CommuMakeModalWrapper>
      <ModalHeader>커뮤니티 만들기</ModalHeader>
      <ModalMiddle>
        <AddImage>
          커뮤니티 대표 이미지
          <button>사진 등록</button>
          <div></div>
        </AddImage>
        <AddName>
          커뮤니티 명<div></div>
        </AddName>
        <AddIntro>
          커뮤니티 소개글
          <div></div>
        </AddIntro>
      </ModalMiddle>
      <ModalBottom>
        <button>완료</button>
      </ModalBottom>
    </CommuMakeModalWrapper>
  );
};

export default CommunityMaker;

const CommuMakeModalWrapper = styled.div`
  width: 50%;
  height: 80%;
  max-width: 40rem;
  min-width: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 3%;
  font-family: ${font.bold};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 15rem;
  height: 3.5rem;
  margin-top: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.12rem;
`;

const ModalMiddle = styled.div`
  width: 28rem;
  height: 27rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const AddImage = styled.div`
  width: 28rem;
  height: 7rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  button {
    margin: 0 1rem;
  }
  div {
    height: 6.5rem;
    width: 6.5rem;
    border: solid 1px black;
    border-radius: 50%;
  }
`;
const AddName = styled.div`
  width: 28rem;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  div {
    border: solid 1px black;
    width: 15rem;
    height: 2rem;
    margin-left: 2.5rem;
  }
`;

const AddIntro = styled.div`
  width: 28rem;
  height: 8.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  div {
    border: solid 1px black;
    width: 15rem;
    height: 6rem;
    margin-left: 1rem;
  }
`;

const ModalBottom = styled.div`
  width: 15rem;
  height: 3rem;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  button {
    border: 0;
    width: 10rem;
    height: 2.7rem;
    cursor: pointer;
  }
`;
