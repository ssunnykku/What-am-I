import { useState } from 'react';
import TabPanel from '../components/map/TabPanel';
import WalkMap from '../components/map/WalkMap';
import styled from 'styled-components';
import TrashMap from '../components/map/TrashMap';
import WaterMap from '../components/map/WaterMap';

export const enum PAGEVALUE {
  WALK_MAP = 'WalkMap',
  TRASH_MAP = 'TrashMap',
  WATER_MAP = 'WaterMap',
}

function MapPage() {
  const [value, setValue] = useState<PAGEVALUE>(PAGEVALUE.WALK_MAP);

  const PageHandler = () => {
    switch (value) {
      case PAGEVALUE.WALK_MAP:
        return <WalkMap />;

      case PAGEVALUE.TRASH_MAP:
        return <TrashMap />;

      case PAGEVALUE.WATER_MAP:
        return <WaterMap />;
    }
  };

  return (
    <Container>
      <TabPanel value={value} setValue={setValue} />
      <Contents>{PageHandler()}</Contents>
    </Container>
  );
}

const Container = styled.div`
  width: 960px;
  max-width: 80%;
  margin: 0 auto;
  margin-top: 10px;
`;

const Contents = styled.div`
  margin: 0 auto;
  margin-top: 50px;
`;

export default MapPage;
