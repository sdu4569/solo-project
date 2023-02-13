import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BoardMenu from '../body/BoardMenu';
import UserInfoArea from '../body/UserInfoArea';
import WriteAndSearch from '../body/WriteAndSearch';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from '@firebase/firestore';

const NoticeBoardPage = () => {
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
        setContents((prev) =>
          [contentObject, ...prev].filter(
            (content) => content.category == '공지사항',
          ),
        );
      });
    };
    getContents();
  }, []);

  return (
    <Content>
      <SideArea>
        <UserInfoArea />
        <WriteAndSearch />
        <BoardMenu />
      </SideArea>
      <MainArea>
        <Board>
          <h2>공지사항</h2>
          <Body>
            {contents.map<any>((item, idx) => {
              const date = new Date(item.time);
              let dateFormat =
                date.getFullYear() +
                '.' +
                (date.getMonth() + 1 <= 9
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1) +
                '.' +
                (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()) +
                '.' +
                date.getHours() +
                ':' +
                date.getMinutes();
              return (
                <List key={idx}>
                  <ContentArea>
                    <div className="con-top">
                      <Link to={`/board/${item.no}`} className="title">
                        {item.title}
                      </Link>
                      <Link to="/" className="content">
                        {item.content}
                      </Link>
                    </div>
                    <div className="con-bottom">
                      <div>{item.username}</div>
                      <span className="date">{dateFormat}</span>
                      <span>조회 수</span>
                    </div>
                  </ContentArea>
                  <div className="con-img">
                    <Link to="/">
                      <img
                        src="https://via.placeholder.com/120"
                        alt="첨부이미지"
                      />
                    </Link>
                  </div>
                </List>
              );
            })}
          </Body>
        </Board>
      </MainArea>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 1080px;
  height: 100%;
  margin: 0 auto;
`;

const SideArea = styled.div`
  display: inline-block;
  width: 200px;
  height: 100%;
`;

const MainArea = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 30px;
`;

const Board = styled.div`
  width: 840px;
  height: auto;
  position: absolute;
  top: 0;
  left: 240px;

  & h2 {
    margin: 0;
    font-size: 22px;
    padding-bottom: 20px;
    border-bottom: 1px solid black;
  }
`;

const Body = styled.ul`
  width: 100%;
  height: auto;
  margin: 0;
  padding-left: 0;
  margin-top: 15px;
`;

const List = styled.li`
  width: 100%;
  height: auto;
  display: block;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeef;
  position: relative;

  & .board-name {
    color: #666666;
    text-decoration: none;
    font-size: 13px;
    margin: 0;
    :hover {
      text-decoration: underline;
    }
  }

  & .con-img {
    position: absolute;
    top: 28px;
    right: 0;
  }
`;

const ContentArea = styled.div`
  width: 700px;
  height: 120px;
  position: relative;

  margin-top: 12px;
  & .title {
    display: black;
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    margin: 0;

    :hover {
      text-decoration: underline;
    }
  }

  & .content {
    display: block;
    max-height: 44px;
    margin-top: 6px;
    font-size: 14px;
    line-height: 22px;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    word-wrap: break-word;
    word-break: break-word;
    text-decoration: none;
    color: #666;
    :hover {
      text-decoration: underline;
    }
  }

  & .con-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-top: 35px;
    font-size: 13px;

    div {
      display: inline;
      color: #222;
    }

    span {
      margin-left: 20px;
      color: #999;
    }
  }
`;

export default NoticeBoardPage;
