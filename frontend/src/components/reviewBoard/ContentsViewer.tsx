import React from 'react';
import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';
import { font } from '../../assets/styles/common/fonts';

const ContentsViewer = ({ children }: CommonComponentType) => {
  return (
    <React.Fragment>
      <ContentsModalWrapper>
        <AddImage>{children}</AddImage>
        <AddWriting>
          <div className="user-name">유저 프로필 사진 + 닉네임</div>
          <div className="user-contents">글 보이는 창</div>
          <BottomDiv>
            <div className="like">🤍10</div>
            <div className="date">12월 17일</div>
            <form className="comment">
              댓글 달기
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log(e);
                }}
              >
                게시
              </button>
            </form>
          </BottomDiv>
        </AddWriting>
      </ContentsModalWrapper>
    </React.Fragment>
  );
};

export default ContentsViewer;

const ContentsModalWrapper = styled.div`
  width: 65%;
  height: 80%;
  max-width: 56rem;
  min-width: 30rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 2%;
  font-family: ${font.normal};
`;

const AddImage = styled.div`
  border-right: solid 1px lightgray;
`;

const AddWriting = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .user-name {
    height: 4.3rem;
    line-height: 5rem;
    padding-left: 3%;
  }

  .user-contents {
    border: solid 1px lightgray;
    padding-left: 3%;
    padding-top: 3%;
    height: 70%;
  }
`;

const BottomDiv = styled.div`
  .like {
    float: left;
    margin: 0 1%;
    font-size: 1rem;
  }
  .date {
    font-size: 1rem;
    float: right;
    margin: 1% 2%;
  }
  .comment {
    border-top: solid 1px lightgray;
    position: absolute;
    bottom: 0;
    width: 97%;
    height: 3rem;
    line-height: 3rem;
    padding-left: 3%;
    button {
      float: right;
      background: none;
      border: none;
      cursor: pointer;
      height: 3rem;
      line-height: 3rem;
      font-family: ${font.bold};
      padding: 0 2rem;
      border-left: 1px solid lightgray;
    }
  }
`;
