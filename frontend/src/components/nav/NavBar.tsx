import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { menus } from '../commonConst/NavConst';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';
import useDetectClose from '../../hooks/dropdown/useDetectClose';
import Storage from '../../storage/storage';
import SpeechBubble from './SpeechBubble';
const VITE_PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL;

interface DropdownCssProps {
  isDropped: boolean;
}

function NavBar() {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

  function onLogout() {
    Storage.clearItemAll();
    location.href = `${VITE_PUBLIC_URL}`;
  }

  return (
    <NavDiv>
      <ul>
        <li id="logo">
          <Link to="/">나는뭐개🐶</Link>
        </li>
        {menus.map((value) => {
          return (
            <li id={value.id} key={value.id}>
              <Link to={value.path}>{value.title}</Link>
            </li>
          );
        })}
        <li id="profile">
          {Storage.getTokenItem() ? (
            <DropdownContainer>
              <SpeechBubble />
              <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                {Storage.getNicknameItem()} 님
              </DropdownButton>
              <Menu isDropped={myPageIsOpen}>
                <Ul>
                  <LinkWrapper to="/mybuddy">
                    <Li>친구 관리</Li>
                  </LinkWrapper>
                  <LinkWrapper to="/mypage">
                    <Li>마이페이지</Li>
                  </LinkWrapper>
                  <LinkWrapper onClick={onLogout} to="/">
                    <Li>로그아웃</Li>
                  </LinkWrapper>
                </Ul>
              </Menu>
            </DropdownContainer>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </li>
      </ul>
    </NavDiv>
  );
}

const NavDiv = styled.div`
  #logo {
    float: left;
    text-decoration: none;
    color: black;
    font-size: 2rem;
  }

  ul a {
    margin: 0 2rem;
    text-decoration: none;
    color: ${theme.boldColor};
  }

  li {
    display: inline; /* a태그는 글자성격 = inline */
  }

  #profile {
    float: right;
    margin-right: 40px;
    text-decoration: none;
    color: ${theme.boldColor};
  }

  text-align: center;
  width: 100%;
  height: 95px;
  min-width: 60rem;
  min-height: 95px;
  line-height: 95px;
  font-family: ${font.bold};
  font-size: 1.3rem;
  background-color: ${theme.backColor};
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  display: flex;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div<DropdownCssProps>`
  background: ${theme.backColor};
  position: absolute;
  top: 10vh;
  left: 50%;
  width: 150px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: '';
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: ${theme.backColor};
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled(Link)`
  width: 100%;
  font-size: 16px;
  text-decoration: none;
  color: white;
  border-bottom: 1px solid #ccc;
`;

export default NavBar;
