import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { font } from '../../assets/styles/common/fonts';

function Nav() {
  return (
    <>
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

          <Link to="/login">
            <li className="my-page">프로필</li>
          </Link>
        </NavDiv>
      </NavBigBox>
    </>
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
    font-size: 2rem;
  }
  ul {
    display: inline-block;
  }
  ul a {
    padding: 0 2.5rem;
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
  height: 4rem;
  line-height: 5rem;
  font-family: ${font.bold};
  font-size: 1.3rem;
  padding-top: 2.5rem;
  padding-bottom: 1.6rem;
`;

export default Nav;
