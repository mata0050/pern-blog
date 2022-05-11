import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GiNotebook } from 'react-icons/gi';

function Logo() {
  const styledLogo = {
    background: 'white',
    width: '30px',
    borderRadius: '5px',
    padding: ' 2px',
    marginRight: ' 10px',
    fontSize: '2rem',
    color: 'black',
  };
  return (
    <StyledLogo>
      <Link to='/'>
        <GiNotebook style={styledLogo} />
        <h4>Medium</h4>
      </Link>
    </StyledLogo>
  );
}

const StyledLogo = styled.div`
  display: block;
  padding-top: 10px;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;

    img {
      background: white;
      width: 30px;
      border-radius: 5px;
      padding: 2px;
      margin-right: 10px;
    }

    h4 {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export default Logo;
