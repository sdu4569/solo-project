import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import BoardMenu from '../body/BoardMenu';
import UserInfoArea from '../body/UserInfoArea';
import WriteAndSearch from '../body/WriteAndSearch';
import Pagination from '../body/Pagination';
import { useDbContext } from '../context/AuthContext';

const BoastBoardPage = () => {
  const contents = useDbContext().filter(
    (content) => content.category == '오늘의 혼술 자랑',
  );

  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  return (
    <Content>
      <SideArea>
        <UserInfoArea />
        <WriteAndSearch />
        <BoardMenu />
      </SideArea>
      <MainArea>
        <Board>
          <h2>오늘의 혼술 자랑</h2>
          <Body>
            {contents.slice(offset, offset + limit).map((item, idx) => {
              const date = new Date(item.time);
              let dateFormat =
                date.getFullYear() -
                2000 +
                '.' +
                (date.getMonth() + 1 <= 9
                  ? '0' + (date.getMonth() + 1)
                  : date.getMonth() + 1) +
                '.' +
                (date.getDate() <= 9 ? '0' + date.getDate() : date.getDate()) +
                '.' +
                (date.getHours() <= 9
                  ? '0' + date.getHours()
                  : date.getHours()) +
                ':' +
                (date.getMinutes() <= 9
                  ? '0' + date.getMinutes()
                  : date.getMinutes());
              if (item.image.length !== 0) {
                return (
                  <List key={idx}>
                    <ContentArea>
                      <div className="con-top">
                        <Link to={`/board/${item.no}`} className="title">
                          {item.title}
                        </Link>
                        <Link to={`/board/${item.no}`} className="content">
                          {item.content}
                        </Link>
                      </div>
                      <div className="con-bottom">
                        <div>{item.username}</div>
                        <span className="date">{dateFormat}</span>
                      </div>
                    </ContentArea>
                    <div className="con-img">
                      <Link to={`/board/${item.no}`}>
                        <img
                          src={item.image}
                          alt="첨부이미지"
                          className="img"
                        />
                      </Link>
                    </div>
                  </List>
                );
              } else {
                return (
                  <List key={idx}>
                    <ContentArea>
                      <div className="con-top">
                        <Link to={`/board/${item.no}`} className="title">
                          {item.title}
                        </Link>
                        <Link to={`/board/${item.no}`} className="content">
                          {item.content}
                        </Link>
                      </div>
                      <div className="con-bottom">
                        <div>{item.username}</div>
                        <span className="date">{dateFormat}</span>
                      </div>
                    </ContentArea>
                  </List>
                );
              }
            })}
          </Body>
          <footer>
            <Pagination
              total={contents.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </footer>
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

    & .img {
      width: 120px;
      height: 120px;
    }
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

export default BoastBoardPage;
