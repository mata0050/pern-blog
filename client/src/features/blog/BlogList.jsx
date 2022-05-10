import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useGetAllBlogQuery, selectBlogIds } from './blogSlice';
import Blog from './Blog';

function BlogList() {
  const { isLoading, isSuccess, isError, error, refetch } =
    useGetAllBlogQuery();

  const orderedBlogIds = useSelector(selectBlogIds);

  // console.log(orderedBlogIds);

  // useEffect(() => {
  //   refetch()
  // },[])

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedBlogIds.map((blogId) => (
      <Blog key={blogId} blogId={blogId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <div>{content}</div>;
}

export default BlogList;
