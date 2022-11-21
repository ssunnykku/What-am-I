import { useState } from 'react';
import TabPanel from '../components/mypage/TabPanel';

export default function Mypage() {
  const [value, setValue] = useState<number>(0);

  return (
    <>
      <TabPanel value={value} setValue={setValue} />
      {
        {
          0: <div>0</div>,
          1: <div>1</div>,
          2: <div>2</div>,
          3: <div>3</div>,
        }[value]
      }
    </>
  );
}
