import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BoardTitle } from './SmallNoticeBoard';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from '@firebase/firestore';
import { Link } from 'react-router-dom';

const SmallTotalBoard = () => {
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    const getContents = async () => {
      const q = query(collection(db, 'board'), orderBy('time', 'asc'));
      const dbContents = await getDocs(q);
      dbContents.forEach((doc) => {
        const contentObject = {
          ...doc.data(),
          id: doc.id,
        };
        setContents((prev) => [contentObject, ...prev]);
      });
    };
    getContents();
  }, []);
  return (
    <Board>
      <BoardTitle>
        <p>전체글보기</p>
        <Link to={'/board'}>
          <button type="button">더보기 &gt;</button>
        </Link>
      </BoardTitle>
      <Body>
        {contents.slice(0, 9).map((item, idx) => {
          const date = new Date(item.time);
          let dateFormat =
            date.getFullYear() +
            '.' +
            (date.getMonth() + 1 <= 9
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1) +
            '.' +
            (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate());
          return (
            <List key={idx}>
              <Link to={`/board/${item.no}`}>
                <div key={idx}>{item.title}</div>
              </Link>
              <p>{dateFormat}</p>
              <p>{item.username}</p>
            </List>
          );
        })}
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
  margin-bottom: 15px;

  & div {
    display: inline-block;
    width: 450px;
    color: black;
    :hover {
      text-decoration: underline;
    }
  }

  & p {
    display: inline-block;
    margin: 0;
    margin-left: 50px;
    float: right;
    color: black;
  }
`;

export default SmallTotalBoard;
