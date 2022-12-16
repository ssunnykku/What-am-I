import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPuppiesData, postPuppyData } from '../apis/mypageFetcher';
import { CustomSpinner } from '../components/loader/CustomSpinner';
import { AIresultType } from '../types/reviewboard/reviewType';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';

const AILoadingPage = () => {
  //   const [data, setData] = useState<AIresultType[]>([]);
  //   const [result, setResult] = useState<any[]>([]);

  const navigate = useNavigate();
  const location = useLocation();
  const aiImage = location.state.aiImage;
  const dogName = location.state.dogName;

  useEffect(() => {
    async function getData() {
      const response = await postPuppyData(dogName, aiImage);
      // setResult(response.data);
      navigate('/dnaresult', {
        state: {
          result: response.data,
          aiImage,
          dogName,
        },
      });
    }
    getData();
  }, []);

  return (
    <Div>
      <div>🐕{dogName}의 엄마 아빠를 찾으러 가는 중 입니다...🐕</div>
      <CustomSpinner />
    </Div>
  );
};
export default AILoadingPage;

const Div = styled.div`
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ${font.normal};
`;
