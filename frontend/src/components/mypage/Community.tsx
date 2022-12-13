import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLiked } from '../../apis/mypageFetcher';
import CommunityCard from './CommunityCard';
import {
  deleteUserCommunites,
  getUserCommunites,
} from '../../apis/mypageFetcher';
import {
  EntryBtn,
  CreateBtn,
} from '../../assets/styles/common/commonComponentStyle';
import { postCommuLikeRequest } from '../../apis/communityFetcher';
import { useConfirm } from '../../hooks/confirm/useConfirm';

export interface CommunityProps {
  Community: CommunityProps;
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

  useEffect(() => {
    async function getData() {
      const response = await getUserLiked();
      setUserLikedList(response.rows);
      console.log(response);
    }
    getData();
  }, []);

  async function cancelLike(id: number) {
    await postCommuLikeRequest(`communitieslikes/${id}`);
    const response = await getUserLiked();
    setUserLikedList(response.rows);
    window.alert('좋아요가 취소되었습니다.');
  }

  // TODO useConfirm으로 props전달이 어렵다(삭제를위한id값 전달)
  // const deleteConfirm = () => (cancelLike(), window.alert('좋아요가 취소되었습니다.'));
  // const cancelConfirm = () => window.alert('취소했습니다.');

  // const confirmDelete = useConfirm(
  //   '좋아요를 취소하시겠습니까?',
  //   deleteConfirm,
  //   cancelConfirm,
  // );

  return (
    <Div>
      {userLikedList.length ? (
        userLikedList.map((value) => (
          <CommunityCard value={value.Community} key={value.Community.id}>
            <ButtonContainer>
              <EntryBtn>내가 쓴 글</EntryBtn>
              <CreateBtn onClick={() => cancelLike(value.Community.id)}>
                좋아요 취소
              </CreateBtn>
            </ButtonContainer>
          </CommunityCard>
        ))
      ) : (
        <div>내가 좋아요 한 커뮤니티가 없습니다</div>
      )}
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

export default Community;
