import { useState } from 'react';
import styled from 'styled-components';
import Profile from '../components/mypage/Profile';
import TabPanel from '../components/mypage/TabPanel';

export const enum PAGEVALUE {
  PROFILE = 'Profile',
  RESULT = 'Result',
  COMMUNITY = 'Community',
  MYCOMMUNITY = 'Mycommunity',
}

function MyPage() {
  const [value, setValue] = useState<PAGEVALUE>(PAGEVALUE.PROFILE);

  const PageHandler = () => {
    switch (value) {
      case PAGEVALUE.PROFILE:
        return <Profile />;

      case PAGEVALUE.RESULT:
        return <div>{PAGEVALUE.RESULT}</div>;

      case PAGEVALUE.COMMUNITY:
        return <div>{PAGEVALUE.COMMUNITY}</div>;

      case PAGEVALUE.MYCOMMUNITY:
        return <div>{PAGEVALUE.MYCOMMUNITY}</div>;
    }
  };

  return (
    <Div>
      <TabPanel value={value} setValue={setValue} />
      {PageHandler()}
    </Div>
  );
}

const Div = styled.div`
  width: 960px;
  max-width: 80%;
  margin: 0 auto;
`;

export default MyPage;
