import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RichTextEditor } from '@mantine/rte';
import { toast } from 'react-toastify';

// Styles
import { Button } from '../../css/Button.styled';
import StyledHeader from './StyledHeader';

// Redux
import { useSelector } from 'react-redux';
import { useUpdateBlogMutation, selectBlogById } from './blogSlice';

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [updateBlog, { isLoading }] = useUpdateBlogMutation();
  const blog = useSelector((state) => selectBlogById(state, Number(id)));
  const [value, onChange] = useState(blog?.blog);

  const onSave = async () => {
    try {
      await updateBlog({ id: blog.id, blog: value }).unwrap();
      if (!isLoading) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Failed to save the blog');
    }
  };

  useEffect(() => {
    if (!blog) navigate('/');
  }, [blog, navigate]);

  return (
    <>
      <StyledHeader>
        <h1>Edit Blog</h1>
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

export default EditBlog;
