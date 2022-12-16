import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPuppiesData } from '../apis/mypageFetcher';
import { AIresultType } from '../types/reviewboard/reviewType';
import ReviewWritingModal from '../components/modal/ReviewWritingModal';
import PaginateButton from '../components/pagination/PaginateButton';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';

const AIResultCardPage = () => {
  const [data, setData] = useState<AIresultType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAiTestResult = async () => {
    const res = await getPuppiesData();
    setData(res.data.rows);
    setTotalPages(Math.ceil(res.data.rows.length / 10));
  };
  useEffect(() => {
    getAiTestResult();
  }, []);
  return (
    <>
      <BigBox>
        <header>AI 종 분석 결과 : 카드를 눌러 글을 작성해 보세요.</header>
        <ResultCardBox>
          {data &&
            data.map((value) => (
              <ReviewWritingModal id={value.id} key={value.id} />
            ))}
        </ResultCardBox>
        <PaginateButton page={page} setPage={setPage} totalPages={totalPages} />
      </BigBox>
    </>
  );
};

export default AIResultCardPage;

const BigBox = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    font-family: ${font.bold};
    color: ${theme.mainColor};
    font-size: 19px;
    margin-top: 3rem;
  }
`;

const ResultCardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 78rem;
  height: 37rem;
  place-items: center;
  margin-top: 15px;
  margin-bottom: 20px;
`;
