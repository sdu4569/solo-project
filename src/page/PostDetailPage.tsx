import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardMenu from '../body/BoardMenu';
import UserInfoArea from '../body/UserInfoArea';
import WriteAndSearch from '../body/WriteAndSearch';
import { auth } from '../firebase';

const PostDetailPage = () => {
  const user = auth.currentUser;

  let date = new Date();
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

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<String>();

  const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  return (
    <Content>
      <SideArea>
        <UserInfoArea />
        <WriteAndSearch />
        <BoardMenu />
      </SideArea>
      <MainArea>
        <AirtlcleContent>
          <ArticleHeader>
            <ArticleTitle>
              <p className="category">공지사항 &gt;</p>
              <div className="title">
                <h3>글 제목</h3>
              </div>
            </ArticleTitle>
            <WriterInfo>
              <div className="thumbArea">
                <img
                  src={`${user?.photoURL}`}
                  alt="프로필 사진"
                  className="userThumb"
                />
              </div>
              <div className="profile">{user?.displayName}</div>
              <div className="date">{dateFormat}</div>
            </WriterInfo>
          </ArticleHeader>
          <ArticleBody>
            <img
              src="https://via.placeholder.com/200"
              alt="첨부된 사진"
              className="photo"
            />
            <div className="content">글 내용</div>
          </ArticleBody>
          <CommentBox>
            <div className="commentTitle">댓글 3</div>
            <ul className="commentList">
              <li className="commentItem">
                <div className="commentArea">
                  <img
                    src={`${user?.photoURL}`}
                    alt="프로필 사진"
                    className="userThumb"
                  />
                  <div className="commentBox">
                    <div className="commentNickname">댓글 닉네임</div>
                    <div className="commentTextbox">
                      <p className="commentTextView">
                        <span className="textComment">댓글 내용</span>
                      </p>
                    </div>
                  </div>
                  <div className="commentInfoBox">
                    <span className="commentInfoDate">{dateFormat}</span>
                    <a href="#" role="button" className="commentInfoButton">
                      답글쓰기
                    </a>
                  </div>
                </div>
              </li>
              <li className="commentItem">
                <div className="commentArea">
                  <img
                    src={`${user?.photoURL}`}
                    alt="프로필 사진"
                    className="userThumb"
                  />
                  <div className="commentBox">
                    <div className="commentNickname">댓글 닉네임</div>
                    <div className="commentTextbox">
                      <p className="commentTextView">
                        <span className="textComment">댓글 내용</span>
                      </p>
                    </div>
                  </div>
                  <div className="commentInfoBox">
                    <span className="commentInfoDate">{dateFormat}</span>
                    <a href="#" role="button" className="commentInfoButton">
                      답글쓰기
                    </a>
                  </div>
                </div>
              </li>
              <li className="commentItem">
                <div className="commentArea">
                  <img
                    src={`${user?.photoURL}`}
                    alt="프로필 사진"
                    className="userThumb"
                  />
                  <div className="commentBox">
                    <div className="commentNickname">댓글 닉네임</div>
                    <div className="commentTextbox">
                      <p className="commentTextView">
                        <span className="textComment">댓글 내용</span>
                      </p>
                    </div>
                  </div>
                  <div className="commentInfoBox">
                    <span className="commentInfoDate">{dateFormat}</span>
                    <a href="#" role="button" className="commentInfoButton">
                      답글쓰기
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <CommentWriter>
              <div className="commentInbox">
                <p className="commentInboxName">댓글 닉네임</p>
                <textarea
                  ref={textareaRef}
                  className="commentInboxText"
                  placeholder="댓글을 남겨보세요"
                  onChange={textAreaChange}
                ></textarea>
              </div>
              <div className="commentAttach">
                <a href="#" role="button" className="registerButton">
                  등록
                </a>
              </div>
            </CommentWriter>
          </CommentBox>
        </AirtlcleContent>
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

const AirtlcleContent = styled.div`
  width: 840px;
  height: auto;
  position: absolute;
  top: 0;
  left: 240px;
  border: 1px solid #ebecef;
  padding: 30px 30px 0;
  border-radius: 6px;

  & .category {
    margin: 0;
    font-size: 13px;
    color: green;
  }

  & h3 {
    font-size: 26px;
    margin: 0;
  }
`;

const ArticleHeader = styled.div`
  position: relative;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebecef;
`;

const ArticleTitle = styled.div`
  margin-bottom: 10px;
  font-size: 13px;

  & .title {
    margin-top: 7px;
  }
`;

const WriterInfo = styled.div`
  & .thumbArea {
    float: left;
    margin-right: 10px;
  }

  & .userThumb {
    border-radius: 50%;
    width: 36px;
    height: 36px;
  }

  & .profile {
    font-size: 13px;
    font-weight: 700;
  }

  & .date {
    font-size: 12px;
    color: #979797;
  }
`;

const ArticleBody = styled.div`
  margin-top: 30px;

  & .photo {
    width: 100%;
  }

  & .content {
    margin-top: 10px;
  }
`;

const CommentBox = styled.div`
  border-top: 1px solid #ebecef;
  position: relative;
  padding-top: 16px;
  margin-top: 16px;

  & .commentTitle {
    margin-top: 3px;
    margin-right: 12px;
    font-size: 17px;
  }

  & .commentList {
    padding: 0;
    margin: 0;
    margin-top: 10px;
    list-style: none;

    & .commentItem:first-child {
      border-top: 0;
    }

    & .commentItem {
      position: relative;
      border-top: 1px solid #f2f2f2;
    }
    & .commentArea {
      position: relative;
      padding: 12px 23px 10px 0;
    }

    & .userThumb {
      position: absolute;
      top: 12px;
      left: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      vertical-align: top;
    }

    & .commentBox {
      padding-left: 46px;
    }

    & .commentNickname {
      display: inline-block;
      position: relative;
      font-size: 13px;
      font-weight: 700;
      vertical-align: top;
      margin-bottom: 4px;
    }

    & .commentTextbox {
      position: relative;
      font-size: 13px;
      word-break: break-all;
      word-wrap: break-word;
    }

    & .commentTextView {
      margin: 0;
      overflow: hidden;
    }

    & .textComment {
      line-height: 17px;
      word-break: break-all;
      word-wrap: break-word;
      vertical-align: top;
    }

    & .commentInfoBox {
      margin-top: 7px;
      font-size: 12px;
      color: #979797;
    }

    & .commentInfoDate {
      margin-right: 8px;
    }

    & .commentInfoButton {
      color: inherit;
      text-decoration: none;
    }
  }
`;

const CommentWriter = styled.div`
  margin: 12px 0 29px;
  padding: 16px 10px 10px 18px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  box-sizing: border-box;
  background: #ffffff;

  & .commentInbox {
    position: relative;
    margin-bottom: 10px;
  }

  & .commentInboxName {
    display: block;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 13px;
  }

  & .commentInboxText {
    overflow: hidden;
    overflow-wrap: break-word;
    display: block;
    width: 100%;
    min-height: 17px;
    padding-right: 1px;
    border: 0;
    font-size: 13px;
    -webkit-appearance: none;
    resize: none;
    box-sizing: border-box;
    background: transparent;
    color: #000000;
    outline: 0;
  }

  & .commentAttach {
    display: flex;
    flex-direction: row-reverse;
  }

  & .registerButton {
    text-decoration: none;
    display: inline-block;
    min-width: 46px;
    height: 34px;
    line-height: 36px;
    font-size: 13px;
    color: #b7b7b7;
    border-radius: 6px;
    box-sizing: border-box;
    font-weight: 700;
    text-align: center;
    vertical-align: top;
  }
`;

export default PostDetailPage;
