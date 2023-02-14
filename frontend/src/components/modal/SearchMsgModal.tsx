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

const SearchMsgModal = () => {
  const [isOpen, modalHandler] = useModal();
  const [nickname, setNickname] = useState<string>('');

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
              <BuddyBox>
                <WritingProfile>
                  <div className="profile">
                    <img src="img/강아지.png" />
                  </div>
                  <div style={{ fontSize: '15px', marginLeft: '3px' }}>
                    친구 닉네임
                  </div>
                </WritingProfile>
              </BuddyBox>
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
