import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
  return (
    <NavBigBox>
      <NavDiv>
        <Link to="/">
          <div id="logo">DogNA</div>
        </Link>
        <ul>
          <Link to="/dna">
            <li>DNA검사</li>
          </Link>

          <Link to="/board">
            <li>후기게시판</li>
          </Link>

          <Link to="/community">
            <li>커뮤니티</li>
          </Link>
        </ul>

        <Link to="/mypage">
          <li>마이페이지</li>
        </Link>
      </NavDiv>
    </NavBigBox>
  );
}

const NavBigBox = styled.div`
  display: flex;
  justify-content: center;
`;

const NavDiv = styled.div`
  #logo {
    float: left;
    text-decoration: none;
    color: black;
    font-size: 25px;
  }

  ul {
    display: inline-block;
  }

  ul a {
    padding: 0 40px;
    text-decoration: none;
    color: black;
  }

  li {
    display: inline; /* a태그는 글자성격 = inline */
  }
  .my-page {
    float: right;
    text-decoration: none;
    color: black;
  }

  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #aeaeae;
  box-shadow: 0px -5px 5px 5px black;
`;

export default Nav;
