import styled from 'styled-components';
import { theme } from '../../assets/styles/common/palette';
import usePaginate from '../../hooks/usePaginate/usePaginate';

export interface PaginateButtonProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginateButton = ({ page, setPage, totalPages }: PaginateButtonProps) => {
  const {
    isFirst,
    isLast,
    pages,
    handleNextBtnClick,
    handlePageBtnClick,
    handlePrevBtnClick,
  } = usePaginate(page, setPage, totalPages, 10);

  return (
    <PaginateBox>
      <PaginateNav>
        <PaginateBtn disabled={isFirst} onClick={handlePrevBtnClick}>
          &lt;
        </PaginateBtn>
        {pages.map((p) => (
          <PaginateBtn
            key={p}
            onClick={() => handlePageBtnClick(p === null ? 1 : p)}
            aria-current="page"
          >
            {p}
          </PaginateBtn>
        ))}
        <PaginateBtn disabled={isLast} onClick={handleNextBtnClick}>
          &gt;
        </PaginateBtn>
      </PaginateNav>
    </PaginateBox>
  );
};

export default PaginateButton;

const PaginateBox = styled.div`
  height: 2rem;
  width: 35rem;
  margin-top: 0.7rem;
  position: absolute;
  bottom: 2.5%;
  display: flex;
  justify-content: center;
`;

const PaginateNav = styled.nav`
  display: flex;
  justify-content: center;
  height: 3rem;
  width: 30rem;
`;

const PaginateBtn = styled.button`
  display: flex;
  justify-content: center;
  color: ${theme.boldColor};
  background: aliceblue;
  width: 15px;
  height: 15px;
  padding: 16px;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  line-height: 2px;
  margin-left: 5px;

  &:hover {
    background: #fffcf1;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: rgba(0, 0, 0, 0.1);
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: #fff6bf;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
