import { Tabs, Tab } from '@mui/material';

interface TabPanelProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export default function TabPanel({ value, setValue }: TabPanelProps) {
  const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab value={0} label="프로필" />
      <Tab value={1} label="DNA결과" />
      <Tab value={2} label="들어간 모임" />
      <Tab value={3} label="내가 만든 커뮤니티" />
    </Tabs>
  );
}
