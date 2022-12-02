import styled from 'styled-components';
import { CommonComponentType } from '../../types/common/commonComponentType';

const CommonErrorText = ({ children }: CommonComponentType) => {
  return <CommonErrorTextWrapper>{children}</CommonErrorTextWrapper>;
};

const CommonErrorTextWrapper = styled.div`
  background-color: transperent;
  color: red;
  font-size: 0.875rem;
`;

export default CommonErrorText;
