import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import {
  updateDoc,
  collection,
  getDocs,
  query,
  doc,
} from '@firebase/firestore';
import { useParams } from 'react-router-dom';

const UpdatePage = () => {
  let number = useParams();
  const user = auth.currentUser;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [value, setValue] = useState<String>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [contents, setContents] = useState<any[]>([]);

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
      const qBoard = query(collection(db, 'board'));
      const dbContents = await getDocs(qBoard);
      dbContents.forEach((doc) => {
        const contentObject = {
          ...doc.data(),
          id: doc.id,
        };
        setContents((prev) =>
          [contentObject, ...prev].filter((content) => content.no == number.id),
        );
      });
      console.log(contents);
    };
    getContents();
  }, []);
  useEffect(() => {
    if (contents.length !== 0) {
      setCategory(contents[0].category);
      setTitle(contents[0].title);
      setContent(contents[0].content);
    }
  }, [contents]);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (category !== 'default' && user !== null) {
      const docRef = doc(db, 'board', contents[0].id);
      await updateDoc(docRef, {
        title: title,
        category: category,
        content: content,
      });
      alert('수정되었습니다');
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
      <h2>글수정</h2>
      <form method="post" onSubmit={onSubmit}>
        <Top>
          <Select name="cateogry" value={category} onChange={onChangeCategory}>
            <option value="default" disabled>
              게시판을 선택해 주세요.
            </option>
            <option value="공지사항">공지사항</option>
            <option value="오늘의 혼술 자랑">오늘의 혼술 자랑</option>
            <option value="나만의 술 정보">나만의 술 정보</option>
            <option value="나만의 안주 정보">나만의 안주 정보</option>
            <option value="나만의 해장 정보">나만의 해장 정보</option>
            <option value="건의게시판">건의게시판</option>
          </Select>
          <span className="button">추가</span>
          <input type="submit" className="button" value="수정"></input>
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
            cols={20}
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
    cursor: pointer;
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

export default UpdatePage;
