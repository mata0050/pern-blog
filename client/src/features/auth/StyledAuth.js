import styled from 'styled-components';

export const Form = styled.form`
  width: 350px;
  margin-inline: auto;
  background: ${({ theme }) => theme.colors.white};
  padding: 20px;
  border-radius: 5px;
  max-height: 720px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  box-shadow: -1px 3px 8px 5px rgba(0, 0, 0, 0.16);

  h1 {
    font-weight: 400;
    font-size: 1.3rem;
    margin: 10px 0 20px;
  }

  label {
    display: none;
  }

  input {
    margin-bottom: 10px;
  }

  button {
    margin: 10px 0;
  }

  span {
    font-size: 0.8rem;
    margin-bottom: 20px;
  }

  a {
    display: block;
    text-align: center;
    text-decoration: none;
    font-size: 0.9rem;
    width: 100%;
    border: none;
    padding: 8px 10px;
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.darkBlue};

    &:hover {
      opacity: 0.9;
      transform: scale(0.98);
    }
  }
`;

export const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;
