import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPuppiesData, postPuppyData } from '../apis/mypageFetcher';
import { CustomSpinner } from '../components/loader/CustomSpinner';
import { AIresultType } from '../types/reviewboard/reviewType';
import styled from 'styled-components';
import { font } from '../assets/styles/common/fonts';
import Storage from '../storage/storage';

const AILoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const aiImage = location.state.aiImage;
  const dogName = location.state.dogName;

  useEffect(() => {
    async function getDataUser() {
      const response = await postPuppyData(dogName, aiImage);
      navigate('/dnaresult', {
        state: {
          result: response.data,
          aiImage,
          dogName,
        },
      });
    }
    async function getDataNotUser() {
      const response = await postPuppyData(dogName, aiImage);
      navigate('/dnaresult', {
        state: {
          result: response.data.result,
          aiImage,
          dogName,
        },
      });
    }
    Storage.getUserIdItem() ? getDataUser() : getDataNotUser();
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ${font.normal};
`;
