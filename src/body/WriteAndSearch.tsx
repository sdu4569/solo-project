import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../firebase';
import { collection, getDocs, query, orderBy } from '@firebase/firestore';

const WriteAndSearch = () => {
  const [result, setResult] = useState<string>('');
  const [contents, setContents] = useState<any[]>([]);
  const user = auth.currentUser;
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchContents = contents.filter(
      (content) =>
        content.title.includes(event.target.value) ||
        content.content.includes(event.target.value),
    );
    if (searchContents.length !== 0) {
      const searchResult = JSON.stringify(searchContents);
      setResult(searchResult);
    }
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    window.localStorage.setItem('result', result);
    window.location.href = '/search';
  };

  const handleClick = () => {
    if (user == null) {
      alert('회원만이 글을 쓸 수 있습니다.');
      window.location.href = '/login';
    } else {
      window.location.href = '/write';
    }
  };

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
    <WriteSearch>
      <Write onClick={handleClick}>글쓰기</Write>
      <form method="post" onSubmit={onSubmit} className="searchForm">
        <Search onChange={onChange} type="text" placeholder="검색" required />
        <input type="submit" value="검색" className="search"></input>
      </form>
    </WriteSearch>
  );
};

const WriteSearch = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  border-bottom: 2px solid black;
  font-size: 13px;

  & .searchForm {
    display: flex;

    & .search {
      width: 40px;
      height: 29.5px;
      margin: 0;
      padding: 0;
      border: none;
      background-color: black;
      color: white;
      font-size: 13px;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const Write = styled.button`
  width: 160px;
  height: 30px;
  margin: 15px 20px;
  padding: 0;
  border: none;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Search = styled.input`
  width: 120px;
  height: 30px;
  margin: 0;
  margin-left: 20px;
  padding: 0;
  padding-left: 4px;
  :focus {
    outline: none;
  }
`;

export default WriteAndSearch;
