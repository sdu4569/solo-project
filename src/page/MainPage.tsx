import styled from 'styled-components';
import BoardMenu from '../body/BoardMenu';
import SmallBoastBoard from '../body/SmallBoastBoard';
import SmallNoticeBoard from '../body/SmallNoticeBoard';
import SmallTotalBoard from '../body/SmallTotalBoard';

import UserInfoArea from '../body/UserInfoArea';
import WriteAndSearch from '../body/WriteAndSearch';

const MainPage = () => {
  return (
    <Content>
      <SideArea>
        <UserInfoArea />
        <WriteAndSearch />
        <BoardMenu />
      </SideArea>
      <MainArea>
        <SmallNoticeBoard />
        <SmallBoastBoard />
        <SmallTotalBoard />
      </MainArea>
    </Content>
  );
};

const Content = styled.div`
  position: relative;
  width: 1080px;
  height: 100%;
  margin: 0 auto;
`;

const SideArea = styled.div`
  display: inline-block;
  width: 200px;
  height: 100%;
`;

const MainArea = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 30px;
`;

export default MainPage;
