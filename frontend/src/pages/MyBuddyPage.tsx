import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../assets/styles/common/palette';
import { font } from '../assets/styles/common/fonts';
import {
  BigBox,
  WritingProfile,
} from '../assets/styles/common/commonComponentStyle';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import {
  getFollowerBuddyData,
  getFollowingBuddyData,
  deleteFollowingBuddy,
} from '../apis/mypageFetcher';
import { BuddyType, FollowerType } from '../types/community/communityType';
import { postAddOrBlockRequest } from '../apis/communityFetcher';

const MyBuddyPage = () => {
  const [page, setPage] = useState<number>(1);
  const [followingInfo, setFollowingInfo] = useState<BuddyType[]>();
  const [followerInfo, setFollowerInfo] = useState<FollowerType[]>();

  // 내가 추가한 친구
  const getFollowingData = async () => {
    const res = await getFollowingBuddyData(page);
    setFollowingInfo(res);
  };

  // 나를 추가한 친구
  const getFollowerData = async () => {
    const res = await getFollowerBuddyData(page);
    console.log(res);
    function nonBlockBuddy(el: FollowerType) {
      if (el.blockStatus === 0) {
        return true;
      }
    }
    const result = res.filter(nonBlockBuddy);
    setFollowerInfo(result);
  };

  // 내가 추가한 친구 삭제
  const handleDeleteBuddy = async (followingInfo: BuddyType) => {
    await deleteFollowingBuddy(followingInfo.friendId);
    const res = await getFollowingBuddyData(page);
    setFollowingInfo(res);
  };

  // 친구 차단
  const handleBlockBuddy = async (followerInfo: FollowerType) => {
    await postAddOrBlockRequest(followerInfo.userId, 0);
    const res = await getFollowerBuddyData(page);
    setFollowerInfo(res);
  };

  useEffect(() => {
    getFollowingData();
    getFollowerData();
  }, []);
  return (
    <BigBox>
      <ListBox>
        <BoxHeader>
          <div>my buddies🐶</div>
          <SearchBuddy>
            <input placeholder="닉네임을 검색하세요..." />
            <button>
              <SearchOutlinedIcon style={{ fontSize: '20px' }} />
            </button>
          </SearchBuddy>
        </BoxHeader>
        <ListContainer>
          <MyList>
            <header className="list-header">내가 추가한 친구</header>
            <div className="list-body">
              {followingInfo?.map((buddy) => (
                <div className="list-buddy">
                  <NicknamePlace>
                    <div key={buddy.friendId} className="profile">
                      <img src={buddy.User.profileImg} />
                    </div>
                    <div>{buddy.User.nickname}</div>
                  </NicknamePlace>
                  <button
                    className="list-btn"
                    onClick={() => handleDeleteBuddy(buddy)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>
          </MyList>
          <YourList>
            <header className="list-header">나를 추가한 친구</header>
            <div className="list-body">
              {followerInfo?.map((follower) => (
                <div className="list-buddy">
                  <NicknamePlace key={follower.userId}>
                    <div className="profile">
                      <img src={follower.profileImg} />
                    </div>
                    <div>{follower.nickname}</div>
                  </NicknamePlace>
                  <button
                    className="list-btn"
                    onClick={() => handleBlockBuddy(follower)}
                  >
                    차단
                  </button>
                </div>
              ))}
            </div>
          </YourList>
        </ListContainer>
      </ListBox>
    </BigBox>
  );
};

export default MyBuddyPage;

const ListBox = styled.div`
  height: 70%;
  width: 40vw;
  min-width: 600px;
  border-radius: 10px;
  background-color: ${theme.backColor};
  box-shadow: 7px 7px 7px rgba(0, 0, 0, 0.2);
  font-family: ${font.normal};

  .list-header {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: solid 1px lightgray;
    height: 40px;
    font-size: 15px;
    letter-spacing: 3px;
    margin: 0 20px;
  }

  .list-body {
    margin-top: 5px;
    height: 90%;
    -ms-overflow-style: none;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .list-buddy {
    height: 60px;
    display: flex;
    align-items: center;
    position: relative;
    margin-left: 20px;
    /* margin-top: 3px; */
    cursor: pointer;

    .list-btn {
      position: absolute;
      right: 25px;
      background-color: white;
      border-radius: 20px;
      border: solid 0.1px lightgray;
      height: 27px;
      width: 50px;
      cursor: pointer;
    }
  }
`;

export const SearchBuddy = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: white;
  border: 0.1px solid lightgray;

  input {
    height: 28px;
    width: 230px;
    margin-left: 10px;
    border: 0;

    :focus {
      outline: 0;
    }
  }

  button {
    margin-right: 8px;
    padding-left: 10px;
    border: 0;
    border-left: solid 0.1px lightgray;
    background-color: white;
    cursor: pointer;
  }
`;

const BoxHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  margin: 0 20px 0 30px;
  letter-spacing: 3px;
  border-bottom: solid 1px lightgray;
`;

const ListContainer = styled.div`
  height: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const MyList = styled.div`
  border-right: solid 0.05px lightgray;
`;

const YourList = styled.div`
  border-left: solid 0.05px lightgray;
`;

const NicknamePlace = styled(WritingProfile)`
  font-size: 15px;
  display: flex;

  .profile {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
`;
