import { Dna } from 'react-loader-spinner';

const CustomSpinner = () => {
  return (
    <Dna
      visible={true}
      height="100"
      width="100"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};

export default CustomSpinner;
