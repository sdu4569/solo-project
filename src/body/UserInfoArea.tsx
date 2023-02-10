import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useEffect } from 'react';

const UserInfoArea = () => {
  const user = auth.currentUser;

  if (user) {
    useEffect(() => {
      const LogOut = document.getElementById('LogOut') as HTMLElement;
      console.log(LogOut);
      if (LogOut) {
        LogOut.addEventListener('click', async (event: any) => {
          event.preventDefault();

          await signOut(auth).then(async () => {
            alert('로그아웃 되었습니다.');
            window.location.href = '/';
          });
        });
      }
    }, []);

    const photo = user.photoURL;
    let date = new Date(user.metadata.creationTime as string);

    let dateFormat =
      date.getFullYear() +
      '.' +
      (date.getMonth() + 1 < 9
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) +
      '.' +
      (date.getDate() < 9 ? '0' + date.getDate() : date.getDate());
    return (
      <LogInUserInfo>
        <img src={`${photo}`} className="userPhoto" alt="유저 이미지"></img>
        <div className="nickName">{user.displayName}</div>
        <div className="createDate">가입일 {dateFormat}</div>
        <Count>
          <div>
            <span>방문</span>
            <span>0회</span>
          </div>
          <div>
            <span>내가 쓴 글</span>
            <span>0개</span>
          </div>
          <div>
            <span>내가 쓴 댓글</span>
            <span>0개</span>
          </div>
        </Count>
        <LogOut id="LogOut">로그아웃</LogOut>
      </LogInUserInfo>
    );
  } else {
    return (
      <LogOutUserInfo>
        <Welcome>방문해주셔서 감사합니다</Welcome>
        <Link to="/login">
          <Login>로그인</Login>
        </Link>
        <Sign>
          <Link to="/signup" className="signUp">
            회원가입
          </Link>
          <p>비밀번호찾기</p>
        </Sign>
      </LogOutUserInfo>
    );
  }
};

const LogInUserInfo = styled.div`
  width: 200px;
  height: 240px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  font-size: 13px;

  & .userPhoto {
    float: left;
    margin-left: 10px;
    margin-top: 25px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
  }

  & .nickName {
    display: inline-block;
    margin: 0;
    margin-top: 30px;
    margin-left: 10px;
  }

  & .createDate {
    display: inline-block;
    margin: 0;
    margin-top: 10px;
    margin-left: 10px;
  }
`;

const LogOutUserInfo = styled.div`
  width: 200px;
  height: 240px;
  text-align: center;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  font-size: 13px;
`;

const Welcome = styled.p`
  width: 160px;
  display: inline-block;
  margin: 45px 0;
  margin-left: auto;
  margin-right: auto;
`;

const Login = styled.button`
  width: 160px;
  height: 30px;
  margin-bottom: 50px;
  padding: 0;
  background-color: black;
  font-weight: bold;
  color: white;
  cursor: pointer;
`;

const Sign = styled.div`
  display: flex;
  justify-content: space-between;
  width: 160px;
  border-top: 1px solid black;
  margin-left: auto;
  margin-right: auto;

  & .signUp,
  p {
    margin: 0;
    margin-top: 14px;
    text-decoration: none;
    color: black;
  }

  & .signUp:hover,
  p:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;

  & div {
    display: flex;
    justify-content: space-between;
  }
`;

const LogOut = styled.button`
  width: 70px;
  height: 30px;
  margin-top: 10px;
  float: right;
  margin-right: 20px;
  padding: 0;
  background-color: black;
  font-weight: bold;
  border: none;
  color: white;
  cursor: pointer;
`;

export default UserInfoArea;
