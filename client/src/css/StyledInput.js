import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: 5px;
  background-color: white;
  padding: 10px;
`;

export const Select = styled.select`
  border: 1px solid ${({ theme }) => theme.colors.silver};
  border-radius: 5px;
  background-color: white;
  padding: 10px;
`;
