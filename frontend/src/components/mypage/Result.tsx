import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ResultCard from './ResultCard';

interface dnaListProps {
  img: string;
  name: string;
  dna: string;
}

function Result() {
  const [dnaList, setDnaList] = useState<dnaListProps[]>([]);
  useEffect(() => {
    async function getDNA() {
      try {
        const response = await axios.get('./mockdata/MyDNA.json');
        setDnaList(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDNA();
  }, []);
  return (
    <ResultContainer>
      {dnaList?.map((value: any) => (
        <ResultCard img={value.img} />
      ))}
    </ResultContainer>
  );
}

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 50px;
  place-items: center; // grid 시 가로 가운데정렬
  margin-top: 50px;
`;
export default Result;
