import styled from 'styled-components';
import { useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

const SignUpPage = () => {
  useEffect(() => {
    const signUpForm = document.getElementById('signUpForm') as HTMLElement;
    signUpForm.addEventListener('submit', async (event: any) => {
      event.preventDefault();
      const email = event.target['signUpEmail'].value;
      const nickname = event.target['signUpNickname'].value;
      const password = event.target['signUpPassword'].value;

      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await updateProfile(user, {
            displayName: nickname,
            photoURL:
              'https://as2.ftcdn.net/v2/jpg/02/29/75/83/1000_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
          });
          alert('회원가입이 완료됐습니다.');
          history.back();
        })
        .catch(() => {
          alert('이미 존재하는 계정입니다.');
          // ..
        });
    });
  }, []);

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
