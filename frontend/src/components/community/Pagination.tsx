import React, { useState } from 'react';
import styled, { css } from 'styled-components';

interface PropsT {
  setCurPage: React.Dispatch<React.SetStateAction<number>>;
  curPage: number; //현재페이지 번호
  totalPage: number;
  totalCount: number;
  size: number; //페이지 당 게시물 수
  pageCount: number; //화면에 나타날 페이지 갯수
}

interface activeT {
  i: number;
  curPage: number;
}
const Pagination = ({
  setCurPage,
  curPage,
  totalPage,
  totalCount,
  size,
  pageCount,
}: PropsT) => {
  const [pageGroup, setPageGroup] = useState(Math.ceil(curPage / pageCount)); //몇번째 페이지그룹

  let lastNum = pageGroup * pageCount;
  if (lastNum > totalPage) {
    lastNum = totalPage;
  }
  let firstNum = lastNum - (pageCount - 1);
  if (pageCount > lastNum) {
    firstNum = 1;
  }

  const pagination = () => {
    let arr = [];
    for (let i = firstNum; i <= lastNum; i++) {
      arr.push(
        <PgBtn key={i} onClick={() => setCurPage(i)} i={i} curPage={curPage}>
          {i}
        </PgBtn>,
      );
    }
    return arr;
  };

  return (
    <Nav>
      <SideBtn
        onClick={() => setPageGroup(pageGroup - 1)}
        disabled={firstNum === 1}
      >
        &lt;
      </SideBtn>
      {pagination()}
      <SideBtn
        onClick={() => {
          setPageGroup(pageGroup + 1);
        }}
        disabled={lastNum === totalPage}
      >
        &gt;
      </SideBtn>
    </Nav>
  );
};

export default Pagination;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
  padding-top: 2em;
  @media screen and (max-width: 1024px) {
    padding-top: 1.5em;
  } ;
`;

// 기본
const Btn = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #a1a1a1;
  color: white;
  font-size: 1rem;
  &:hover {
    background: skyblue;
    cursor: pointer;
    transform: translateY(-2px);
  }
  @media screen and (max-width: 480px) {
    padding: 6px;
    font-size: 0.8rem;
  } ;
`;

// 좌우
const SideBtn = styled(Btn)`
  &[disabled] {
    background: #e7e5e5;
    cursor: revert;
    transform: revert;
  }
`;

// 메인
const PgBtn = styled(Btn)<activeT>`
  ${(props) =>
    props.i === props.curPage &&
    css`
      background-color: skyblue;
      font-weight: bold;
      cursor: revert;
      transform: revert;
    `}
`;
