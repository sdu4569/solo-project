import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    font-family:  "Arial", sans-serif;
    line-height: 1.5;
  }
`;

export default GlobalStyle;
