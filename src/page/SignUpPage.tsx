import styled from 'styled-components';

const SignUpPage = () => {
  return (
    <Content>
      <h2>SignUp</h2>
      <Form method="post" id="signUpForm">
        아이디 :
        <input
          type="email"
          name="userEmail"
          placeholder="이메일"
          id="signUpEmail"
          defaultValue={''}
        ></input>
        닉네임 :
        <input
          type="text"
          name="userNickName"
          placeholder="2~8글자(특수문자 불가)"
          id="signUpNickname"
          defaultValue={''}
        ></input>
        비밀번호 :
        <input
          type="password"
          name="userPassword"
          placeholder="6~12글자"
          id="signUpPassword"
          minLength={6}
          maxLength={12}
          defaultValue={''}
        ></input>
        <SignUp type="submit" id="signUpButton">
          회원가입
        </SignUp>
      </Form>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 400px;
  height: 350px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 25px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    margin: 0;
  }

  & input {
    padding-left: 5px;
    height: 35px;
  }
`;

const Form = styled.form`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SignUp = styled.button`
  height: 35px;
  padding: 0;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

export default SignUpPage;
