import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useDbContext } from '../context/AuthContext';

const SmallNoticeBoard = () => {
  const contents = useDbContext().filter(
    (content) => content.category == '공지사항',
  );

  return (
    <Board>
      <BoardTitle>
        <p>공지사항</p>
        <Link to={'/board/notice'}>
          <button type="button">더보기 &gt;</button>
        </Link>
      </BoardTitle>
      <Body>
        {contents.slice(0, 7).map((item, idx) => {
          return (
            <List key={idx}>
              <Link to={`/board/${item.no}`}>
                <div key={idx}>{item.title}</div>
              </Link>
              <p>{item.username}</p>
            </List>
          );
        })}
      </Body>
    </Board>
  );
};

const Board = styled.div`
  width: 400px;
  height: 420px;
  position: absolute;
  top: 0;
  left: 240px;
`;

export const BoardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid black;

  & p {
    font-size: 18px;
    display: inline-block;
    margin: 0;
  }

  & button {
    display: inline-block;
    width: 60px;
    height: 100%;
    border: none;
    padding: 0;
    margin: 0;
    font-size: 13px;
    background-color: white;
    :hover {
      cursor: pointer;
    }
  }
`;

const Body = styled.ul`
  width: 100%;
  height: 100% - 43px;
  padding-left: 20px;
  margin: 0;
  margin-top: 15px;
`;

const List = styled.li`
  list-style: square;
  margin-bottom: 15px;

  & div {
    display: inline-block;
    color: black;
    :hover {
      text-decoration: underline;
    }
  }

  & p {
    display: inline-block;
    margin: 0;
    float: right;
  }
`;

export default SmallNoticeBoard;
