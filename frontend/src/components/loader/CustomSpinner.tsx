import { Dna, ThreeDots } from 'react-loader-spinner';
import styled from 'styled-components';

export const CustomSpinner = () => {
  return (
    <SpinnerBox>
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </SpinnerBox>
  );
};

export const CommuSpinner = () => {
  return (
    <ThreeDots
      height="10"
      width="40"
      radius="3"
      color="#74b9ff"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      visible={true}
    />
  );
};

export const SpinnerBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
