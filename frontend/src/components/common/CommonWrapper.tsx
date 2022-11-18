import styled from 'styled-components';
import { CommonComponentType } from '../../types/commonComponentType';

const CommonWrapper = ({ children }: CommonComponentType) => {
  return <CommonWrapperContainer>{children}</CommonWrapperContainer>;
};

const CommonWrapperContainer = styled.div`
  width: 100%;
  height: 100vh;
  text-align: center;
`;

export default CommonWrapper;
