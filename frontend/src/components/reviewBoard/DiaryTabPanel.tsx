import { Tabs, Tab } from '@mui/material';
import { DIARYVALUE } from '../../pages/ReviewBoardPage';

interface TabPanelProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<DIARYVALUE>>;
}

export default function DiaryPanel({ value, setValue }: TabPanelProps) {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newVal: React.SetStateAction<DIARYVALUE>,
  ) => {
    setValue(newVal);
  };

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab value={DIARYVALUE.MYDIARY} label="my diary" />
      <Tab value={DIARYVALUE.YOURDIARY} label="buddy diary" />
    </Tabs>
  );
}
