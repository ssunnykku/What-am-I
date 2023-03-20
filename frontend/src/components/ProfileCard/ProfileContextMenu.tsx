import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Storage from '../../storage/storage';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../assets/styles/common/palette';
import { font } from '../../assets/styles/common/fonts';
import DoneIcon from '@mui/icons-material/Done';
import { CurrentCommuityProps } from '../modal/CommuContentsModal';
import { ContentsProfile } from '../../assets/styles/common/commonComponentStyle';
import { postCommuRequest } from '../../apis/communityFetcher';
import { FriendType } from '../../types/community/communityType';
import { getFollowingBuddyData } from '../../apis/mypageFetcher';

export default function ProfileContextMenu(props: CurrentCommuityProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [checked, setChecked] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const [friend, setFriend] = React.useState<FriendType>();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClickCheckBtn = async () => {
    // const res = await postCommuRequest(`friends/${props.commuPost?.userId}`);
    console.log(props);
    // if (res.message) {
    //   setChecked(true);
    // }

    setChecked((prev) => !prev);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <ContentsProfile className="profile">
          <img src={props.commuPost?.profileImg} />
          <img src={props.comment?.profileImg} />
        </ContentsProfile>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <NameMenuItem onClick={handleClose} id="profile-name">
          <ProfileName>
            <div className="img">
              <img src={props.commuPost?.profileImg} />
              <img src={props.comment?.profileImg} />
            </div>
            <div className="nickname">{props.commuPost?.nickname}</div>
            <div className="nickname2">{props.comment?.nickname}</div>
          </ProfileName>
        </NameMenuItem>
        {props.commuPost?.userId === Storage.getUserIdItem() ||
        props.comment?.userId === Storage.getUserIdItem() ? (
          <div>
            <NewMenuItem onClick={handleClose}>
              <ProfileBtn onClick={() => navigate('/mybuddy')}>
                친구 목록으로 가기
              </ProfileBtn>
            </NewMenuItem>
            <NewMenuItem onClick={handleClose}>
              <ProfileBtn onClick={() => navigate('/chatroom')}>
                채팅 목록으로 가기
              </ProfileBtn>
            </NewMenuItem>
          </div>
        ) : (
          <div>
            <NewMenuItem>
              <ProfileBtn onClick={onClickCheckBtn}>
                {checked ? (
                  <DoneIcon style={{ color: '#2d98da' }} />
                ) : (
                  '친구 추가'
                )}
              </ProfileBtn>
            </NewMenuItem>
            <NewMenuItem>
              <ProfileBtn>1:1 메시지 보내기</ProfileBtn>
            </NewMenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
}

const NameMenuItem = styled(MenuItem)`
  pointer-events: none;
`;

const NewMenuItem = styled(MenuItem)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px 15px 5px;
  border-bottom: solid 0.1px ${theme.mainColor};

  .img {
    width: 55px;
    height: 55px;
    border: solid 1px gray;
    border-radius: 50%;
    display: flex;
    position: relative;
    overflow: hidden;

    img {
      position: absolute;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .nickname {
    margin-left: 15px;
    font-size: 16px;
    font-family: ${font.bold};
  }

  .nickname2 {
    font-size: 16px;
    font-family: ${font.bold};
  }
`;

const ProfileBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  margin-top: 5px;
  border-radius: 5px;
  font-size: 14px;
  font-family: ${font.normal};

  :hover {
    color: ${theme.pointColor};
    cursor: pointer;
  }
`;
