import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectBlogById } from './blogSlice';
import parse from 'html-react-parser';

function Blog({ blogId }) {
  const blog = useSelector((state) => selectBlogById(state, blogId));
  // console.log(blog);
  // console.log(blogId);

  

  return (
    <StyledBlog>
      <h2>hello</h2>
      {parse(blog.blog)}
    </StyledBlog>
  );
}

const StyledBlog = styled.article``;
export default Blog;
