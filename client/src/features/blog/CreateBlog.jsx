import { useState } from 'react';
import { RichTextEditor } from '@mantine/rte';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import StyledHeader from './StyledHeader';
import { Button } from '../../css/Button.styled';

// Redux
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../auth/authSlice';
import { useAddBlogMutation } from './blogSlice';

const initialValue =
  '<p> <b>Welcome</b> Build your first Blog with Express, Postgres, React and Redux toolkit Query</p>';

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
      toast.error('Failed to save the blog');
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

export default CreateBlog;
