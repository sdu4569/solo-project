import styled from 'styled-components';
import { BoardTitle } from './SmallNoticeBoard';
import { Link } from 'react-router-dom';
import { useDbContext } from '../context/AuthContext';

const SmallBoastBoard = () => {
  const contents = useDbContext().filter(
    (content) => content.category == '오늘의 혼술 자랑',
  );

  return (
    <Board>
      <BoardTitle>
        <p>오늘의 혼술 자랑</p>
        <Link to={'/board/boast'}>
          <button type="button">더보기 &gt;</button>
        </Link>
      </BoardTitle>
      <Body>
        {contents.slice(0, 6).map((item, idx) => {
          const date = new Date(item.time);
          let dateFormat =
            date.getFullYear() -
            2000 +
            '.' +
            (date.getMonth() + 1 <= 9
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            '.' +
            (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
          return (
            <List key={idx}>
              <Link to={`/board/${item.no}`} className="link">
                <img src={item.image} alt="첨부이미지" />
                <div key={idx} className="title">
                  {item.title}
                </div>
              </Link>
              <p className="nickname">{item.username}</p>
              <p className="date">{dateFormat}</p>
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

  & img {
    width: 100px;
    height: 100px;
  }

  & .link {
    text-decoration: none;
  }

  & .title {
    margin: 0;
    font-size: 13px;
    color: black;
    :hover {
      text-decoration: underline;
    }
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
