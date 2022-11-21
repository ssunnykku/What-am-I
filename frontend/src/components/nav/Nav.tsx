import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Nav() {
  return (
    <Div>
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

        <Link to="/login">
          <li>프로필</li>
        </Link>
      </ul>
    </Div>
  );
}

const Div = styled.div`
  #logo {
    float: left;
    padding: 0 30px;
  }

  ul {
    float: right;
  }

  ul a {
    padding: 0 30px;
    text-decoration: none;
  }

  li {
    display: inline; /* a태그는 글자성격 = inline */
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
