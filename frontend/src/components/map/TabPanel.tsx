import { Tabs, Tab } from '@mui/material';
import { PAGEVALUE } from '../../pages/MapPage';
interface TabPanelProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<PAGEVALUE>>;
}

export default function TabPanel({ value, setValue }: TabPanelProps) {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: React.SetStateAction<PAGEVALUE>,
  ) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab value={PAGEVALUE.PROFILE} label="산책로" />
      <Tab value={PAGEVALUE.RESULT} label="쓰레기통" />
      <Tab value={PAGEVALUE.COMMUNITY} label="음수대" />
    </Tabs>
  );
}
