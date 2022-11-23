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
        <Link to="/login">
          <li className="my-page">프로필</li>
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

  text-align: center;
  width: 85%;
  height: 70px;
  line-height: 70px;
  font-family: 'ONE-Mobile-Title';
  font-size: 20px;
  padding-top: 60px;
  padding-bottom: 20px;
`;

export default Nav;
