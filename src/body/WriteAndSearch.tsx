import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const WriteAndSearch = () => {
  const [value, setValue] = useState('');
  const user = auth.currentUser;
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleClick = () => {
    if (user == null) {
      alert('회원만이 글을 쓸 수 있습니다.');
      window.location.href = '/login';
    } else {
      window.location.href = '/write';
    }
  };

  return (
    <WriteSearch>
      <Write type="button" onClick={handleClick}>
        글쓰기
      </Write>
      <SearchForm onSubmit={onSubmit}>
        <Search
          value={value}
          onChange={onChange}
          type="text"
          placeholder="검색"
        />
        <SearchButton type="button">검색</SearchButton>
      </SearchForm>
    </WriteSearch>
  );
};

const WriteSearch = styled.div`
  position: relative;
  width: 200px;
  height: 100px;
  border-bottom: 2px solid black;
  font-size: 13px;
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

const SearchForm = styled.form`
  display: flex;
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

const SearchButton = styled.button`
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
`;

export default WriteAndSearch;
