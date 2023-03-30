import react, { useState, useEffect } from 'react';
import useModal from '../../hooks/modal/useModal';
import MyModal from './MyModal';
import styled from 'styled-components';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import { WritingProfile } from '../../assets/styles/common/commonComponentStyle';
import { SearchBuddy } from '../../pages/MyBuddyPage';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { getFollowingBuddyData } from '../../apis/mypageFetcher';
import { BuddyType } from '../../types/community/communityType';

const SearchMsgModal = () => {
  const [isOpen, modalHandler] = useModal();
  const [nickname, setNickname] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [followingInfo, setFollowingInfo] = useState<BuddyType[]>();

  const getFollowingInfo = async () => {
    const res = await getFollowingBuddyData(page);
    setFollowingInfo(res);
  };

  useEffect(() => {
    getFollowingInfo();
  }, [isOpen]);

  return (
    <>
      <MyModal isOpen={isOpen} onModalStateChangeEvent={modalHandler}>
        <ModalContainer>
          <header style={{ border: 0 }}>새로운 메시지</header>
          <ListBox>
            <SearchBox>
              <input
                placeholder="닉네임 검색..."
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button disabled={nickname.length === 0}>
                <SendOutlinedIcon />
              </button>
            </SearchBox>
            <RecList>
              <p>추천</p>
              {followingInfo?.map((buddy) => (
                <BuddyBox key={buddy.id}>
                  <WritingProfile>
                    <div className="profile">
                      <img src={buddy.FriendList.profileImg} />
                    </div>
                    <div style={{ fontSize: '14px', marginLeft: '3px' }}>
                      {buddy.FriendList.nickname}
                    </div>
                  </WritingProfile>
                </BuddyBox>
              ))}
            </RecList>
          </ListBox>
        </ModalContainer>
      </MyModal>
      <div onClick={modalHandler}>
        <EmojiPeopleIcon style={{ cursor: 'pointer', fontSize: '32px' }} />
      </div>
    </>
  );
};

export default SearchMsgModal;

const ModalContainer = styled.div`
  width: 50%;
  height: 50%;
  max-width: 25rem;
  min-width: 20rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ListBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchBox = styled(SearchBuddy)`
  height: 3.5rem;
  border-radius: 10px;

  input {
    height: 3rem;
    width: 80%;
    font-size: 15px;
  }

  button {
    font-family: ${font.bold};
    height: 3rem;
    text-align: center;
    padding-left: 20px;

    &[disabled] {
      color: gray;
      cursor: revert;
    }
  }
`;

const RecList = styled.div`
  height: 100%;
  overflow-y: scroll;

  p {
    text-align: start;
    font-family: ${font.normal};
    font-size: 14px;
    padding: 10px 15px;
  }
`;

const BuddyBox = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  padding: 0 10px;

  :hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
