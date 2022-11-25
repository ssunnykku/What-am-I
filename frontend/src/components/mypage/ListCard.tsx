import styled from 'styled-components';

function ListCard() {
  return (
    <Card>
      <img alt="room_img"></img>
      <div>방 이름</div>
      <button>수정</button>
      <button>삭제</button>
    </Card>
  );
}

const Card = styled.div`
  width: 80%;
  height: 100px;
  border: 1px solid black;
`;
export default ListCard;
