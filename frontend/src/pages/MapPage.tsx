import { Container } from '@mui/material';
import { useState } from 'react';
import Community from '../components/mypage/Community';
import MyCommunity from '../components/mypage/MyCommunity';
import Profile from '../components/mypage/Profile';
import Result from '../components/mypage/Result';
import TabPanel from '../components/map/TabPanel';

export const enum PAGEVALUE {
  PROFILE = 'Profile',
  RESULT = 'Result',
  COMMUNITY = 'Community',
  MYCOMMUNITY = 'Mycommunity',
}

function MapPage() {
  const [value, setValue] = useState<PAGEVALUE>(PAGEVALUE.PROFILE);

  const PageHandler = () => {
    switch (value) {
      case PAGEVALUE.PROFILE:
        return <Profile />;

      case PAGEVALUE.RESULT:
        return <Result />;

      case PAGEVALUE.COMMUNITY:
        return <Community />;

      case PAGEVALUE.MYCOMMUNITY:
        return <MyCommunity />;
    }
  };

  return (
    <Container>
      <TabPanel value={value} setValue={setValue} />
      {/* <Contents>{PageHandler()}</Contents> */}
    </Container>
  );
}

export default MapPage;
