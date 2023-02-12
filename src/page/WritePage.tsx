import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { addDoc, collection, getDocs, query } from '@firebase/firestore';

const WritePage = () => {
  const user = auth.currentUser;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('default');
  const [content, setContent] = useState('');
  const [num, setNum] = useState(0);
  const [value, setValue] = useState<String>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setTitle(value);
  };

  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    setCategory(value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = e;
    setContent(value);
    setValue(value);
  };

  useEffect(() => {
    const getContents = async () => {
      const q = query(collection(db, 'board'));
      const dbContents = await getDocs(q);
      setNum(dbContents.docs.length + 1);
    };
    getContents();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category !== 'default' && user !== null) {
      await addDoc(collection(db, 'board'), {
        no: num,
        title: title,
        category: category,
        content: content,
        time: Date.now(),
        username: user.displayName,
        thumbnail: user.photoURL,
      });
      alert('글이 작성되었습니다.');
      setTitle('');
      setCategory('');
      setContent('');
      window.location.href = '/';
    } else {
      alert('게시판을 선택해 주세요.');
    }
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
      <h2>글쓰기</h2>
      <form method="post" onSubmit={onSubmit}>
        <Top>
          <Select
            name="cateogry"
            defaultValue={category}
            onChange={onChangeCategory}
          >
            <option value="default" disabled>
              게시판을 선택해 주세요.
            </option>
            <option value="notice">공지사항</option>
            <option value="boast">오늘의 혼술 자랑</option>
            <option value="drink">나만의 술 정보</option>
            <option value="snack">나만의 안주 정보</option>
            <option value="solution">나만의 해장 정보</option>
            <option value="suggest">건의게시판</option>
          </Select>
          <span className="button">추가</span>
          <input type="submit" className="button" value="등록"></input>
        </Top>
        <Body>
          <input
            type="text"
            className="title"
            placeholder="제목을 입력해 주세요."
            maxLength={50}
            onChange={onChangeTitle}
            value={title}
            required
          />
          <textarea
            ref={textareaRef}
            className="content"
            placeholder="내용을 입력하세요."
            maxLength={2048}
            onChange={onChangeContent}
            value={content}
            required
          />
        </Body>
      </form>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 1080px;
  height: auto;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 0 15px;
  & h2 {
    margin: 15px 0;
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 1px solid black;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;

  & .button {
    width: 200px;
    height: 35px;
    border: 1px solid black;
    padding: 5px;
    font-size: 15px;
    text-align: center;
    background-color: white;
  }
`;

const Select = styled.select`
  display: inline-block;
  width: 600px;
  height: 35px;
  padding-left: 5px;

  & option[value='default'][disabled] {
    display: none;
  }
`;

const Body = styled.div`
  width: 100%;
  height: auto;

  & .title {
    margin-top: 15px;
    width: 100%;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
  }

  & .content {
    margin-top: 15px;
    margin-bottom: 15px;
    min-height: 500px;
    width: 100%;
    padding: 10px;
    resize: none;
    box-sizing: border-box;
    overflow: hidden;
    overflow-wrap: break-word;
  }
`;

export default WritePage;
