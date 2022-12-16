import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { getPuppiesData } from '../apis/mypageFetcher';
import { AIresultType } from '../types/reviewboard/reviewType';
import ReviewWritingModal from '../components/modal/ReviewWritingModal';
import PaginateButton from '../components/pagination/PaginateButton';
import { font } from '../assets/styles/common/fonts';
import { theme } from '../assets/styles/common/palette';

const AIResultPage = () => {
  const [data, setData] = useState<AIresultType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getAiTestResult = async () => {
    const res = await getPuppiesData();
    setData(res.data);
  };
  useEffect(() => {
    getAiTestResult();
  }, []);
  return (
    <>
      <BigBox>
        <header>AI 종 분석 결과</header>
        <ResultCardBox>
          {data.map((value) => (
            <ReviewWritingModal id={value.id} key={value.id} />
          ))}
        </ResultCardBox>
        <PaginateButton page={page} setPage={setPage} totalPages={totalPages} />
      </BigBox>
    </>
  );
};

export default AIResultPage;

const BigBox = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    font-family: ${font.bold};
    color: ${theme.mainColor};
    font-size: 25px;
  }
`;

const ResultCardBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 80rem;
  height: 40rem;
  place-items: center;
  border: solid 1px purple;
`;
