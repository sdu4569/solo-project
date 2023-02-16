import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = () => {
  return (
    <StyledTitle>
      <Link to={'/'}>
        <Image src="/image/Title.jpg" alt="타이틀 이미지"></Image>
      </Link>
    </StyledTitle>
  );
};

const StyledTitle = styled.div`
  position: relative;
  width: 1080px;
  height: 340px;
  margin: 0 auto 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

export default Title;
