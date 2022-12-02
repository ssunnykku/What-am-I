import React, { useCallback, useMemo } from 'react';

// 현재 페이지가 < 10 1~10까지 보여준다

const usePaginate = (
  currPage: number,
  setCurrPage: React.Dispatch<React.SetStateAction<number>>,
  totalPage: number,
  limit: number,
) => {
  const isFirst = useMemo(() => currPage === 1, [currPage]);
  const isLast = useMemo(() => currPage === totalPage, [currPage, totalPage]);
  const startPageNum = (Math.ceil(currPage / limit) - 1) * limit + 1;
  const pageIdxList = Array(limit)
    .fill(0)
    .map((_, idx) =>
      startPageNum + idx <= totalPage ? startPageNum + idx : null,
    );
  const pages = pageIdxList.filter((idx) => Number.isInteger(idx));

  const handleNextBtnClick = useCallback(() => {
    setCurrPage(currPage + 1);
  }, [currPage, setCurrPage]);

  const handlePrevBtnClick = useCallback(() => {
    setCurrPage(currPage - 1);
  }, [currPage, setCurrPage]);

  const handlePageBtnClick = useCallback(
    (page: number) => {
      setCurrPage(page);
    },
    [setCurrPage],
  );

  return {
    isFirst,
    isLast,
    pages,
    handleNextBtnClick,
    handlePageBtnClick,
    handlePrevBtnClick,
  };
};

export default usePaginate;
