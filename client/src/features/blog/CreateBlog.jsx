import { useState } from 'react';
import styled from 'styled-components';
import { RichTextEditor } from '@mantine/rte';
import { Button } from '../../css/Button.styled';

import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { selectAllBlogs, useAddBlogMutation } from './blogSlice';
import { useNavigate } from 'react-router-dom';

const initialValue =
  '<p>Your initial <b>html value</b> or an empty string to init editor without value</p>';

function CreateBlog() {
  const navigate = useNavigate();
  const { user } = useSelector(selectCurrentUser);
  const [addNewBlog, { isLoading }] = useAddBlogMutation();
  const [value, onChange] = useState(initialValue);

  const onSave = async () => {
    try {
      await addNewBlog({ author_id: user.id, blog: value }).unwrap();
      if (!isLoading) {
        navigate('/');
      }
    } catch (error) {
      console.error('Failed to save the post', error);
    }
  };
  return (
    <>
      <StyledHeader>
        <h1>Create a new blog</h1>
        <Button onClick={() => onSave()}>save</Button>
      </StyledHeader>

      <RichTextEditor
        value={value}
        onChange={onChange}
        style={{ height: '80vh' }}
      />
    </>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  h1 {
    width: 100%;
    font-weight: 500;
  }
`;

export default CreateBlog;
