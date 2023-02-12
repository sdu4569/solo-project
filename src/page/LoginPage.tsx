import styled from 'styled-components';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

const LoginPage = () => {
  useEffect(() => {
    const signInForm = document.getElementById('signInForm') as HTMLElement;
    signInForm.addEventListener('submit', async (event: any) => {
      event.preventDefault();
      const email = event.target['userEmail'].value;
      const password = event.target['userPassword'].value;

      await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert('로그인 성공');
          history.back();
        })
        .catch(() => {
          alert('로그인 실패');
          // ..
        });
    });
  }, []);

  const onSocialLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    alert('로그인 성공');
    history.back();
  };

  return (
    <Content>
      <h2>Login</h2>
      <Form method="post" id="signInForm">
        아이디 :
        <input
          type="email"
          name="userEmail"
          placeholder="이메일"
          id="userEmail"
          defaultValue={''}
        ></input>
        비밀번호 :
        <input
          type="password"
          name="userPassword"
          placeholder="비밀번호"
          id="userPassword"
          minLength={6}
          maxLength={12}
          defaultValue={''}
        ></input>
        <Login type="submit">로그인</Login>
      </Form>
      <Google onClick={onSocialLogin}>
        <GoogleLogo src="https://mblogthumb-phinf.pstatic.net/MjAxNzA3MTJfMjQ1/MDAxNDk5ODYzMDU3MjU0.ZkiNLFOy5L1OLLmcQknBL9rBDExUS3eQ27cxrDni4Ewg.yO8w9yrCzmLsp1EXcf9eDbHO914vKBG_3pP7CNQas-Mg.PNG.krazymouse/%EA%B5%AC%EA%B8%80.png?type=w800"></GoogleLogo>
        구글 로그인
      </Google>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 400px;
  height: 350px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 30px 15px;
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
  height: 190px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Login = styled.button`
  height: 35px;
  padding: 0;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Google = styled.button`
  height: 35px;
  padding: 0;
  background-color: white;
  border: 1px solid #666;
  cursor: pointer;
  font-size: 13px;
  position: relative;
`;

const GoogleLogo = styled.img`
  width: 13px;
  height: 13px;
  margin-right: 5px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export default LoginPage;
