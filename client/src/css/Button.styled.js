import styled from 'styled-components';

export const Button = styled.button`
  max-width: 100%;
  border: none;
  padding: 10px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  max-height: 45px;

  &:hover {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;
