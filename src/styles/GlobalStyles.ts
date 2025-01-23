import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #F8F9FA;
    color: #2C2C54;
  }

  button {
    font-family: inherit;
  }

  input {
    font-family: inherit;
  }

  /* Custom scrollbar styles */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: #F8F9FA;
  }

  ::-webkit-scrollbar-thumb {
    background: #E2E8F0;
    border-radius: 3px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #CBD5E0;
  }
`;

export default GlobalStyles; 