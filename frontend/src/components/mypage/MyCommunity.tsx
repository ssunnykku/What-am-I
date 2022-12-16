import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';
import {
  deleteUserCommunites,
  getUserCommunites,
} from '../../apis/mypageFetcher';
import { CommunityProps } from './Community';
import CommunityCard from './CommunityCard';
import {
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';
import PaginateButton from '../pagination/PaginateButton';
import { CommunityType } from '../../types/community/communityType';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

function MyCommunity() {
  const [communityLists, setCommunityLists] = useState<CommunityType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    async function getData() {
      const response = await getUserCommunites(page);
      setCommunityLists(response.rows);
      setTotalPages(Math.ceil(response.count / 10));
    }
    getData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  async function deleteConfirm(id: number) {
    await deleteUserCommunites(id);
    const getResponse = await getUserCommunites(page);
    setCommunityLists(getResponse.rows);
    window.alert('삭제되었습니다.');
  }

  // TODO useConfirm으로 props전달이 어렵다(삭제를위한id값 전달)
  // const deleteConfirm = () => (deleteConfirm(), window.alert('삭제했습니다.'));
  // const cancelConfirm = () => window.alert('취소했습니다.');

  // const confirmDelete = useConfirm(
  //   '삭제하시겠습니까?',
  //   deleteConfirm,
  //   cancelConfirm,
  // );

  return (
    <Div>
      {communityLists.length ? (
        communityLists.map((value) => (
          <CommunityCard value={value} key={value.id}>
            <ButtonContainer>
              <EntryBtn
                onClick={() =>
                  (location.href = `${VITE_PUBLIC_URL}likedcommunity?id=${value.id}`)
                }
              >
                입장하기
              </EntryBtn>
              <CreateBtn onClick={() => deleteConfirm(value.id)}>
                삭제
              </CreateBtn>
            </ButtonContainer>
          </CommunityCard>
        ))
      ) : (
        <div style={{ fontFamily: font.bold }}>
          내가 생성한 커뮤니티가 없습니다
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default MyCommunity;
