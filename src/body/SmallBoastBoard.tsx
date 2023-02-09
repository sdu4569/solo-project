import styled from 'styled-components';
import { BoardTitle } from './SmallNoticeBoard';

const SmallBoastBoard = () => {
  return (
    <Board>
      <BoardTitle>
        <p>오늘의 혼술 자랑</p>
        <button type="button">더보기 &gt;</button>
      </BoardTitle>
      <Body>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
        <List>
          <img src="https://via.placeholder.com/100" alt="첨부이미지" />
          <p className="title">글제목</p>
          <p className="nickname">닉네임</p>
          <p className="date">날짜</p>
          <p className="views">조회</p>
        </List>
      </Body>
    </Board>
  );
};

const Board = styled.div`
  width: 400px;
  height: 420px;
  position: absolute;
  top: 0;
  left: 680px;
`;

const Body = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  height: 100% - 43px;
  padding: 0;
  margin: 0;
  margin-top: 15px;
`;

const List = styled.li`
  list-style: none;
  width: 30%;
  height: 40%;
  margin-bottom: 10px;
  & .title {
    margin: 0;
    font-size: 13px;
  }

  & .nickname {
    margin: 0;
    font-size: 11px;
  }

  & .date,
  .views {
    display: inline-block;
    margin: 0;
    margin-right: 5px;
    font-size: 11px;
  }
`;

export default SmallBoastBoard;
