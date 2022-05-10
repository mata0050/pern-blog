import React from 'react';

import { useSelector } from 'react-redux';
import { useGetAllBlogQuery, selectBlogIds } from './blogSlice';
import Blog from './Blog';

function BlogList() {
  const { isLoading, isSuccess } = useGetAllBlogQuery();
  const orderedBlogIds = useSelector(selectBlogIds);

  return (
    <>
      {isLoading && <p>loading....</p>}

      {isSuccess &&
        orderedBlogIds.map((blogId) => <Blog key={blogId} blogId={blogId} />)}
    </>
  );
}

export default BlogList;
