import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectBlogById } from './blogSlice';
import parse from 'html-react-parser';
import { Button } from '../../css/Button.styled';

function Blog({ blogId }) {
  const blog = useSelector((state) => selectBlogById(state, blogId));
  const [readBlog, setReadBlog] = useState({});

  const toggleBlog = (id) => {
    setReadBlog((prev) =>
      Boolean(!prev[id]) ? { ...prev, [id]: true } : { ...prev, [id]: false }
    );
  };

  return (
    <StyledBlog
      style={readBlog[blog.id] ? { minHeight: '150px' } : { height: '150px' }}
    >
      {parse(blog.blog)}
      <Button onClick={() => toggleBlog(blog.id)}>Read</Button>
    </StyledBlog>
  );
}

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
