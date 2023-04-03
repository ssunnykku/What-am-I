import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  deleteFollowingBuddy,
  getBlockBuddyData,
} from '../../apis/mypageFetcher';
import { WritingProfile } from '../../assets/styles/common/commonComponentStyle';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import { BuddyType } from '../../types/community/communityType';

const BlockBuddy = () => {
  const [page, setPage] = useState<number>(1);
  const [blockPP, setBlockPP] = useState<BuddyType[]>();

  const getBlockList = async () => {
    const res = await getBlockBuddyData(page);
    setBlockPP(res);
  };
  useEffect(() => {
    getBlockList();
  }, []);

  const handleDeleteBlockBuddy = async (blockPP: BuddyType) => {
    if (
      confirm(
        `${blockPP.FriendList.nickname} 님을 차단 해제하시겠습니까? 해제 후 '내가 추가한 친구' 목록에는 추가되지 않습니다.`,
      ) == true
    ) {
      await deleteFollowingBuddy(blockPP.FriendList.userId);
      const res = await getBlockBuddyData(page);
      setBlockPP(res);
    }
  };

  return (
    <Container>
      <ListBox>
        {blockPP?.length !== 0 ? (
          <ListContentBox>
            {blockPP?.map((one) => (
              <ListContent key={one.id}>
                <div className="profile">
                  <img src={one.FriendList.profileImg} />
                </div>
                <div>{one.FriendList.nickname}</div>
                <button onClick={() => handleDeleteBlockBuddy(one)}>
                  차단 해제
                </button>
              </ListContent>
            ))}
          </ListContentBox>
        ) : (
          '차단한 친구가 없습니다.'
        )}
      </ListBox>
    </Container>
  );
};

export default BlockBuddy;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 50%; */
  min-width: 25rem;
  height: 35rem;
  font-family: ${font.bold};
`;

const ListContentBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px lightgray;
  border-radius: 10px;
`;

const ListContent = styled(WritingProfile)`
  border-bottom: solid 1px lightgray;
  width: 95%;
  height: 80px;
  position: relative;

  .profile {
    width: 40px;
    height: 40px;
    margin-left: 5px;
  }

  button {
    position: absolute;
    border-radius: 20px;
    border: solid 0.1px lightgray;
    width: 78px;
    height: 25px;
    right: 20px;
    font-family: ${font.normal};
    font-size: 12px;
    cursor: pointer;
  }
`;
