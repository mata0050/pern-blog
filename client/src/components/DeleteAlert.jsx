import React from 'react';
import styled from 'styled-components';

const DeleteAlert = ({ deleteMsg, hideDeleteMsg, onDelete }) => {
  return (
    <StyledDeleteAlert>
      <p>Are you sure you want to delete this {deleteMsg} </p>

      <div className='button'>
        <button onClick={() => hideDeleteMsg(null)}>No</button>
        <button onClick={onDelete}>Yes</button>
      </div>
    </StyledDeleteAlert>
  );
};

const StyledDeleteAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 55%;
  transform: translate(-50%, -50%);
  width: 500px;
  min-height: 200px;
  border-radius: 30px;
  padding: 25px;
  text-align: center;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 0px 2px 20px 3px rgba(0, 0, 0, 0.13);
  .button {
    margin-top: 40px;

    button {
      font-size: 1rem;
      padding: 10px 25px;
      border-radius: 8px;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.darkBlue};
      border: 1px solid ${({ theme }) => theme.colors.darkBlue};
      color: ${({ theme }) => theme.colors.white};
      :last-child {
        margin-left: 25px;
        background-color: ${({ theme }) => theme.colors.red};
        border: 1px solid ${({ theme }) => theme.colors.red};
      }

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export default DeleteAlert;
