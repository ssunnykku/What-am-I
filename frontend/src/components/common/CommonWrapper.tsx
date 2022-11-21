import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';

const CommonWrapper = ({ children }: CommonComponentType) => {
  return <CommonWrapperContainer>{children}</CommonWrapperContainer>;
};

const CommonWrapperContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default CommonWrapper;
