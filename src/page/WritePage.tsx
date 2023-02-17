import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from '@firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const WritePage = () => {
  const user = auth.currentUser;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('default');
  const [content, setContent] = useState('');
  const [num, setNum] = useState(0);
  const [value, setValue] = useState<String>('');
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
      const q = query(collection(db, 'board'), orderBy('no', 'asc'));
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

  useEffect(() => {
    if (contents.length !== 0) {
      setNum(contents[0].no + 1);
    }
  }, [contents]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (category === 'default') {
      return alert('게시판을 선택해 주세요');
    }

    const file: any = document.getElementById('file');
    const fileInput = file.files[0];
    console.log(fileInput);
    if (fileInput === undefined && user !== null) {
      await addDoc(collection(db, 'board'), {
        no: num,
        title: title,
        category: category,
        content: content,
        time: Date.now(),
        username: user.displayName,
        thumbnail: user.photoURL,
        userid: user.uid,
        image: '',
      });
      alert('글이 작성되었습니다.');
      setTitle('');
      setCategory('');
      setContent('');
      window.location.href = '/';
    } else {
      const storageRef = ref(storage, 'image/' + fileInput.name);
      const uploadTask = uploadBytesResumable(storageRef, fileInput);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            if (category !== 'default' && user !== null) {
              await addDoc(collection(db, 'board'), {
                no: num,
                title: title,
                category: category,
                content: content,
                time: Date.now(),
                username: user.displayName,
                thumbnail: user.photoURL,
                userid: user.uid,
                image: downloadURL,
                imagename: fileInput.name,
              });
              alert('글이 작성되었습니다.');
              setTitle('');
              setCategory('');
              setContent('');
              window.location.href = '/';
            } else {
              alert('게시판을 선택해 주세요.');
            }
          });
        },
      );
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
            <option value="공지사항">공지사항</option>
            <option value="오늘의 혼술 자랑">오늘의 혼술 자랑</option>
            <option value="나만의 술 정보">나만의 술 정보</option>
            <option value="나만의 안주 정보">나만의 안주 정보</option>
            <option value="나만의 해장 정보">나만의 해장 정보</option>
            <option value="건의게시판">건의게시판</option>
          </Select>
          <label htmlFor="file" className="button">
            파일 추가
          </label>
          <input type="file" name="file" id="file"></input>
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

  & #file {
    display: none;
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
