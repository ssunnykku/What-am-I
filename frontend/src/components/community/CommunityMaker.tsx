import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';

const CommunityMaker = () => {
  return (
    <CommuMakeModalWrapper>
      <ModalHeader>커뮤니티 만들기</ModalHeader>
      <ModalContent>
        <AddImage>
          커뮤니티 대표 이미지
          <button>사진 등록</button>
          <div></div>
        </AddImage>
        <AddName>
          커뮤니티 명
          <input type="text" />
        </AddName>
        <AddIntro>
          커뮤니티 소개글
          <input type="text" />
        </AddIntro>
      </ModalContent>
      <ModalBottom>
        <button>완료</button>
      </ModalBottom>
    </CommuMakeModalWrapper>
  );
};

export default CommunityMaker;

const CommuMakeModalWrapper = styled.div`
  width: 50%;
  height: 75%;
  max-width: 35rem;
  min-width: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border-radius: 3%;
  font-family: ${font.bold};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  width: 15rem;
  height: 3rem;
  margin-top: 3rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ModalContent = styled.div`
  width: 28rem;
  height: 25rem;
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
  input {
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
  input {
    border: solid 1px black;
    width: 15rem;
    height: 6rem;
    margin-left: 1rem;
  }
`;

const ModalBottom = styled.div`
  width: 15rem;
  height: 3rem;
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
  button {
    width: 12rem;
    height: 2.7rem;
    cursor: pointer;
    border: 0;
    color: white;
    background-color: ${theme.mainColor};
    border-radius: 20px;
    font-family: ${font.bold};
    font-size: 15px;
  }
`;
