import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { menus } from '../commonConst/NavConst';
import { font } from '../../assets/styles/common/fonts';
import { theme } from '../../assets/styles/common/palette';

function NavBar() {
  const [userImg, setUserImg] = useState<string>('/');
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavDiv>
      <ul>
        <li id="logo">
          <Link to="/">나는뭐개🐶</Link>
        </li>
        {menus.map((value, index) => {
          return (
            <li id={value.id} key={index}>
              <Link to={value.path} key={index}>
                {value.title}
              </Link>
            </li>
          );
        })}
        <li id="profile" onClick={handleMenu}>
          닉네임
        </li>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/mypage">마이페이지</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>로그아웃</MenuItem>
        </Menu>
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
    margin: 0 2.5rem;
    text-decoration: none;
    color: #0583b5;
  }

  li {
    display: inline; /* a태그는 글자성격 = inline */
  }

  #profile {
    float: right;
    margin-right: 40px;
    text-decoration: none;
    color: #0583b5;
  }

  text-align: center;
  width: 100%;
  height: 10vh;
  min-width: 50rem;
  line-height: 10vh;
  font-family: ${font.bold};
  font-size: 1.3rem;
  background-color: ${theme.backColor};
`;

export default NavBar;
