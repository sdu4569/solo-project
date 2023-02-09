import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WriteAndSearch = () => {
  const [value, setValue] = useState('');
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <WriteSearch>
      <Link to={'/write'}>
        <Write type="button">글쓰기</Write>
      </Link>
      <SearchForm onSubmit={onSubmit}>
        <Search value={value} onChange={onChange} type="text" />
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
