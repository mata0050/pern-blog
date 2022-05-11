import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import { Button } from '../../css/Button.styled';
import DeleteAlert from '../../components/DeleteAlert';
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineEdit } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { selectBlogById, useDeleteBlogMutation } from './blogSlice';
import { selectCurrentUser } from '../auth/authSlice';

function Blog({ blogId }) {
  const navigate = useNavigate();
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const user = useSelector(selectCurrentUser);
  const [readBlog, setReadBlog] = useState({});
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deleteBlog] = useDeleteBlogMutation();

  const toggleBlog = (id) => {
    setReadBlog((prev) =>
      !prev[id] ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  const hideDeleteMsg = () => setDeleteMsg((preState) => !preState);

  const onDeleteBlog = async () => {
    try {
      await deleteBlog({ id: blogId }).unwrap();
    } catch (error) {
      toast.error('Failed to delete the Blog');
    }
    hideDeleteMsg();
  };

  const editBlog = () => navigate(`/edit-blog/${blogId}`);
  return (
    <>
      <StyledBlog
        style={readBlog[blog.id] ? { minHeight: '150px' } : { height: '150px' }}
      >
        {user !== null && user.id === blog.author_id && (
          <>
            <StyledEdit onClick={editBlog} />
            <StyledDelete onClick={hideDeleteMsg} />
          </>
        )}

        {parse(blog.blog)}

        <Button onClick={() => toggleBlog(blog.id)}>Read</Button>
      </StyledBlog>

      {deleteMsg && (
        <DeleteAlert
          deleteMsg={'Post?'}
          hideDeleteMsg={hideDeleteMsg}
          onDelete={onDeleteBlog}
        />
      )}
    </>
  );
}

const StyledEdit = styled(MdOutlineEdit)`
  position: absolute;
  right: 80px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledDelete = styled(AiFillDelete)`
  position: absolute;
  right: 20px;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.red};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const StyledBlog = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 20px;
  padding: 20px;
  overflow: hidden;
  margin: 30px 0;
  position: relative;

  button {
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
`;
export default Blog;
