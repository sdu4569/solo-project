import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BoardMenu from '../body/BoardMenu';
import UserInfoArea from '../body/UserInfoArea';
import WriteAndSearch from '../body/WriteAndSearch';
import { auth, db, storage } from '../firebase';
import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  deleteDoc,
  doc,
} from '@firebase/firestore';
import { Link, useParams } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { useDbContext } from '../context/AuthContext';

const PostDetailPage = () => {
  const user = auth.currentUser;
  let number = useParams();
  const [contents, setContents] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = '0px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + 'px';
    }
  }, [value]);

  useEffect(() => {
    const getComments = async () => {
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
              (content) => content.no == number.id,
            ),
          );
        });
      };
      getContents();

      const qComment = query(
        collection(db, 'comment'),
        orderBy('time', 'desc'),
      );
      const dbComments = await getDocs(qComment);
      dbComments.forEach((doc) => {
        const commentObject = {
          ...doc.data(),
          id: doc.id,
        };
        setComments((prev) =>
          [commentObject, ...prev].filter((comment) => comment.no == number.id),
        );
      });
    };
    getComments();
  }, []);
  console.log(contents);
  const [comment, setComment] = useState('');
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user !== null) {
      await addDoc(collection(db, 'comment'), {
        no: number.id,
        content: comment,
        time: Date.now(),
        username: user.displayName,
        thumbnail: user.photoURL,
      });
      alert('댓글이 등록되었습니다.');
      setComment('');
      window.location.reload();
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setComment(value);
    setValue(value);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const delContent = confirm('글을 삭제하시겠습니까?');
    if (delContent) {
      const docRef = doc(db, 'board', contents[0].id);
      await deleteDoc(docRef);

      const imageRef = ref(storage, 'image/' + contents[0].imagename);
      await deleteObject(imageRef);

      const commentRef = doc(db, 'comment', contents[0].id);
      await deleteDoc(commentRef);

      alert('글이 삭제되었습니다.');
      window.location.href = '/';
    } else {
      alert('취소되었습니다.');
    }
  };

  if (contents.length !== 0 && user !== null) {
    // 유저가 로그인 한 상태로 글을 읽을때
    return (
      <Content>
        <SideArea>
          <UserInfoArea />
          <WriteAndSearch />
          <BoardMenu />
        </SideArea>
        <MainArea>
          {contents.map((item, idx) => {
            let date = new Date(item.time);
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
              (date.getHours() <= 9 ? '0' + date.getHours() : date.getHours()) +
              ':' +
              (date.getMinutes() <= 9
                ? '0' + date.getMinutes()
                : date.getMinutes());
            let category: string = '';
            switch (item.category) {
              case '공지사항':
                category = 'notice';
                break;
              case '오늘의 혼술 자랑':
                category = 'boast';
                break;
              case '나만의 술 정보':
                category = 'drink';
                break;
              case '나만의 안주 정보':
                category = 'snack';
                break;
              case '나만의 해장 정보':
                category = 'solution';
                break;
              case '건의게시판':
                category = 'suggest';
                break;
            }

            if (item.userid === user.uid && item.image == '') {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <CommentWriter>
                      <form method="post" onSubmit={onSubmit}>
                        <div className="commentInbox">
                          <p className="commentInboxName">{user.displayName}</p>
                          <textarea
                            ref={textareaRef}
                            className="commentInboxText"
                            placeholder="댓글을 남겨보세요"
                            onChange={onChangeComment}
                            required
                          ></textarea>
                        </div>
                        <div className="commentAttach">
                          <input
                            type="submit"
                            className="registerButton"
                            value="등록"
                          ></input>
                        </div>
                      </form>
                    </CommentWriter>
                  </CommentBox>
                  <UpdateAndDelete>
                    <Link to={`/update/${number.id}`}>
                      <button className="update">수정</button>
                    </Link>
                    <button className="delete" onClick={handleDelete}>
                      삭제
                    </button>
                  </UpdateAndDelete>
                </AirtlcleContent>
              );
            } else if (item.userid === user.uid && item.image !== '') {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <img src={item.image} alt="첨부된 사진" className="photo" />
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <CommentWriter>
                      <form method="post" onSubmit={onSubmit}>
                        <div className="commentInbox">
                          <p className="commentInboxName">{user.displayName}</p>
                          <textarea
                            ref={textareaRef}
                            className="commentInboxText"
                            placeholder="댓글을 남겨보세요"
                            onChange={onChangeComment}
                            required
                          ></textarea>
                        </div>
                        <div className="commentAttach">
                          <input
                            type="submit"
                            className="registerButton"
                            value="등록"
                          ></input>
                        </div>
                      </form>
                    </CommentWriter>
                  </CommentBox>
                  <UpdateAndDelete>
                    <Link to={`/update/${number.id}`}>
                      <button className="update">수정</button>
                    </Link>
                    <button className="delete" onClick={handleDelete}>
                      삭제
                    </button>
                  </UpdateAndDelete>
                </AirtlcleContent>
              );
            } else if (item.userid !== user.uid && item.image == '') {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <CommentWriter>
                      <form method="post" onSubmit={onSubmit}>
                        <div className="commentInbox">
                          <p className="commentInboxName">{user.displayName}</p>
                          <textarea
                            ref={textareaRef}
                            className="commentInboxText"
                            placeholder="댓글을 남겨보세요"
                            onChange={onChangeComment}
                            required
                          ></textarea>
                        </div>
                        <div className="commentAttach">
                          <input
                            type="submit"
                            className="registerButton"
                            value="등록"
                          ></input>
                        </div>
                      </form>
                    </CommentWriter>
                  </CommentBox>
                </AirtlcleContent>
              );
            } else if (item.userid !== user.uid && item.image !== '') {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <img src={item.image} alt="첨부된 사진" className="photo" />
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

                    <CommentWriter>
                      <form method="post" onSubmit={onSubmit}>
                        <div className="commentInbox">
                          <p className="commentInboxName">{user.displayName}</p>
                          <textarea
                            ref={textareaRef}
                            className="commentInboxText"
                            placeholder="댓글을 남겨보세요"
                            onChange={onChangeComment}
                            required
                          ></textarea>
                        </div>
                        <div className="commentAttach">
                          <input
                            type="submit"
                            className="registerButton"
                            value="등록"
                          ></input>
                        </div>
                      </form>
                    </CommentWriter>
                  </CommentBox>
                </AirtlcleContent>
              );
            }
          })}
        </MainArea>
      </Content>
    );
  } else {
    return (
      <Content>
        <SideArea>
          <UserInfoArea />
          <WriteAndSearch />
          <BoardMenu />
        </SideArea>
        <MainArea>
          {contents.map((item, idx) => {
            let date = new Date(item.time);
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
            let category: string = '';
            switch (item.category) {
              case '공지사항':
                category = 'notice';
                break;
              case '오늘의 혼술 자랑':
                category = 'boast';
                break;
              case '나만의 술 정보':
                category = 'drink';
                break;
              case '나만의 안주 정보':
                category = 'snack';
                break;
              case '나만의 해장 정보':
                category = 'solution';
                break;
              case '건의게시판':
                category = 'suggest';
                break;
            }

            if (item.image == '') {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CommentBox>
                </AirtlcleContent>
              );
            } else {
              return (
                <AirtlcleContent key={idx}>
                  <ArticleHeader>
                    <ArticleTitle>
                      <Link to={`/board/${category}`} className="category">
                        {item.category} &gt;
                      </Link>
                      <div className="title">
                        <h3>{item.title}</h3>
                      </div>
                    </ArticleTitle>
                    <WriterInfo>
                      <div className="thumbArea">
                        <img
                          src={`${item.thumbnail}`}
                          alt="프로필 사진"
                          className="userThumb"
                        />
                      </div>
                      <div className="profile">{item.username}</div>
                      <div className="date">{dateFormat}</div>
                    </WriterInfo>
                  </ArticleHeader>
                  <ArticleBody>
                    <img src={item.image} alt="첨부된 사진" className="photo" />
                    <div className="content">{item.content}</div>
                  </ArticleBody>
                  <CommentBox>
                    <div className="commentTitle">댓글 {comments.length}</div>
                    <ul className="commentList">
                      {comments.map<any>((item, idx) => {
                        let date = new Date(item.time);
                        let dateFormat =
                          date.getFullYear() +
                          '.' +
                          (date.getMonth() + 1 <= 9
                            ? '0' + (date.getMonth() + 1)
                            : date.getMonth() + 1) +
                          '.' +
                          (date.getDate() <= 9
                            ? '0' + date.getDate()
                            : date.getDate()) +
                          '.' +
                          date.getHours() +
                          ':' +
                          date.getMinutes();
                        return (
                          <li className="commentItem" key={idx}>
                            <div className="commentArea">
                              <img
                                src={item.thumbnail}
                                alt="프로필 사진"
                                className="userThumb"
                              />
                              <div className="commentBox">
                                <div className="commentNickname">
                                  {item.username}
                                </div>
                                <div className="commentTextbox">
                                  <p className="commentTextView">
                                    <span className="textComment">
                                      {item.content}
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div className="commentInfoBox">
                                <span className="commentInfoDate">
                                  {dateFormat}
                                </span>
                                <a
                                  href="#"
                                  role="button"
                                  className="commentInfoButton"
                                >
                                  답글쓰기
                                </a>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </CommentBox>
                </AirtlcleContent>
              );
            }
          })}
        </MainArea>
      </Content>
    );
  }
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

  & .category {
    color: green;
    text-decoration: none;
    font-size: 13px;
    margin: 0;
    :hover {
      text-decoration: underline;
    }
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
    font-weight: 400;
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
    wrap: hard;
    white-space: pre;
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
      font-weight: 400;
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
    font-weight: 400;
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
    font-size: 13px;
    color: #b7b7b7;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    background: white;
  }
`;

const UpdateAndDelete = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;

  & .update,
  .delete {
    text-decoration: none;
    display: inline-block;
    min-width: 46px;
    height: 34px;
    font-size: 13px;
    cursor: pointer;
    box-sizing: border-box;
    font-weight: 400;
    text-align: center;
    vertical-align: top;
    background: white;
  }
`;

export default PostDetailPage;
