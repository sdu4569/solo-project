import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardMenu = () => {
  return (
    <Menu>
      <Board>
        <Link to="/board" className="link">
          전체글보기
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/notice" className="link">
          공지사항
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/boast" className="link">
          오늘의 혼술 자랑
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/drink" className="link">
          나만의 술 정보
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/snack" className="link">
          나만의 안주 정보
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/solution" className="link">
          나만의 해장 정보
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
      <Board>
        <Link to="/board/suggest" className="link">
          건의게시판
          <img
            src="https://ssl.pstatic.net/static/cafe/cafe_pc/ico_new.png"
            width="12"
            height="12"
            className="ico_new"
            alt="새 게시글"
          />
        </Link>
      </Board>
    </Menu>
  );
};

const Menu = styled.div`
  width: 200px;
  height: 100%;
  position: relative;
  border-bottom: 2px solid black;
`;

const Board = styled.div`
  margin-top: 30px;
  padding-left: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
  & img {
    visibility: hidden;
    margin-left: 4px;
  }
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }

  & .link {
    display: block;
    color: black;
    text-decoration: none;
    margin: 0;
    :hover {
      text-decoration: underline;
    }
  }
`;
export default BoardMenu;
