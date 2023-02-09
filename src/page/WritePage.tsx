import styled from 'styled-components';

const WritePage = () => {
  return (
    <Content>
      <h2>글쓰기</h2>
      <form method="post" action="writeAction.tsx">
        <Top>
          <Select name="cateogry" defaultValue={'default'}>
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
          />
          <textarea
            className="content"
            placeholder="내용을 입력하세요."
            maxLength={2048}
          />
        </Body>
      </form>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 1080px;
  height: 800px;
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
    min-height: 610px;
    width: 100%;
    padding: 10px;
  }
`;

export default WritePage;
