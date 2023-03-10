import styled from 'styled-components';
import Title from './header/Title';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter } from 'react-router-dom';
import PageNavigator from './PageNavigator';
import { ContextProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <GlobalStyle />
        <PageBody>
          <Title />
          <PageNavigator />
        </PageBody>
      </ContextProvider>
    </BrowserRouter>
  );
}

const PageBody = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

export default App;
