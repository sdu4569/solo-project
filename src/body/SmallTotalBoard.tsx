import styled from 'styled-components';
import { BoardTitle } from './SmallNoticeBoard';

const SmallTotalBoard = () => {
  return (
    <Board>
      <BoardTitle>
        <p>전체글보기</p>
        <button type="button">더보기 &gt;</button>
      </BoardTitle>
      <Body>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
        <List>
          <div>1</div>
          <p>1.4천</p>
          <p>2023.01.15</p>
          <p>닉네임</p>
        </List>
      </Body>
    </Board>
  );
};

const Board = styled.div`
  width: 840px;
  height: 500px;
  position: absolute;
  top: 450px;
  left: 240px;
`;

const Body = styled.ul`
  width: 100%;
  height: 100% - 43px;
  padding-left: 20px;
  margin: 0;
  margin-top: 15px;
`;

const List = styled.li`
  margin-bottom: 10px;

  & div {
    display: inline-block;
    width: 450px;
  }

  & p {
    display: inline-block;
    margin: 0;
    margin-left: 50px;
    float: right;
  }
`;

export default SmallTotalBoard;
