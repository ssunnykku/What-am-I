import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import { getUserLiked, getUserLikedPosts } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';
import { EntryBtn } from '../../assets/styles/common/commonComponentStyle';
import { Modal } from '@mui/material';
import CommunityMyList from './CommunityMyList';
import PaginateButton from '../pagination/PaginateButton';
import { CommunityType } from '../../types/community/communityType';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

export interface CommunityProps {
  Community: CommunityType;
  id: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  name?: string;
  introduction?: string;
  communityImage?: string;
}

function Community() {
  const [userLikedList, setUserLikedList] = useState<CommunityProps[]>([]);
  const [communityInfo, setCommunityInfo] = useState<CommunityType>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      const response = await getUserLiked(page);
      setUserLikedList(response.rows);
      setTotalPages(Math.ceil(response.count / 10)); // 10개씩 나눈 리스트 페이지네이션 토탈페이지 갯수
    }
    getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);
  useEffect(() => console.log(page), [page]);

  async function getMyPost(value: CommunityProps) {
    handleOpen();
    setCommunityInfo(value.Community);
  }

  return (
    <Div>
      {open ? (
        <CommunityMyList commuInfo={communityInfo} setOpen={setOpen} />
      ) : userLikedList.length ? (
        userLikedList.map((value) => (
          <CommunityCard value={value.Community} key={value.Community.id}>
            <ButtonContainer>
              <EntryBtn
                onClick={() =>
                  (location.href = `${VITE_PUBLIC_URL}likedcommunity?id=${value.Community.id}`)
                }
              >
                입장하기
              </EntryBtn>
              <EntryBtn onClick={() => getMyPost(value)}>내가 쓴 글</EntryBtn>
            </ButtonContainer>
          </CommunityCard>
        ))
      ) : (
        <div style={{ fontFamily: font.bold }}>
          내가 좋아요 한 커뮤니티가 없습니다
        </div>
      )}
      <PaginateButton page={page} setPage={setPage} totalPages={totalPages} />
    </Div>
  );
}
const Div = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  justify-items: center;
  grid-gap: 20px;
`;

const ListContainer = styled.div`
  border: 1px solid red;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Community;
