import { useState } from 'react';
import styled from 'styled-components';
import BlockBuddy from '../components/mypage/BlockBuddy';
import Community from '../components/mypage/Community';
import MyCommunity from '../components/mypage/MyCommunity';
import Profile from '../components/mypage/Profile';
import Result from '../components/mypage/Result';
import TabPanel from '../components/mypage/TabPanel';

export const enum PAGEVALUE {
  PROFILE = 'Profile',
  RESULT = 'Result',
  COMMUNITY = 'Community',
  MYCOMMUNITY = 'Mycommunity',
  BLOCKBUDDY = 'Blockbuddy',
}

function MyPage() {
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

      case PAGEVALUE.BLOCKBUDDY:
        return <BlockBuddy />;
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

export default MyPage;
