import { Paper } from '@mui/material';
import styled from 'styled-components';

interface dataProps {
  img: string;
}

function ImgItems({ img }: dataProps) {
  return (
    <ImagePlace>
      <Paper>
        <img src={img} alt={img} style={{ width: '100%', height: '100%' }} />
      </Paper>
    </ImagePlace>
  );
}

export default ImgItems;

const ImagePlace = styled.div`
  height: 85%;
  max-height: 50rem;
  position: relative;
  overflow: hidden;
`;
