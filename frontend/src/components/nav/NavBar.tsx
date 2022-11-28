import { Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { menus } from '../commonConst/NavConst';
import { font } from '../../assets/styles/common/fonts';

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
          <Link to="/">DogNA</Link>
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

  ul {
    /* display: inline-block; */
  }

  ul a {
    margin: 0 2.5rem;
    text-decoration: none;
    color: black;
  }

  li {
    display: inline; /* a태그는 글자성격 = inline */
  }
  #profile {
    float: right;
    margin-right: 40px;
    text-decoration: none;
    color: black;
  }

  text-align: center;
  width: 100%;
  height: 4rem;
  min-width: 50rem;
  line-height: 5rem;
  font-family: ${font.bold};
  font-size: 1.3rem;
  padding-top: 2.5rem;
`;

export default NavBar;
