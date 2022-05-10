import styled, { createGlobalStyle } from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 80px;
  padding: 60px;

  @media only screen and (max-width: ${({ theme }) => theme.mobile.medium}) {
    top: 70px;
    padding: 20px;
  }

  @media only screen and (max-width: ${({ theme }) => theme.mobile.xSmall}) {
    padding: 30px;
  }
`;

const GlobalStyles = createGlobalStyle`

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    margin: 0;
  }

  p {
    opacity: 1;
    line-height: 1.5;
  }

`;

export default GlobalStyles;
