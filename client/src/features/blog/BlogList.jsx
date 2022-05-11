import React from 'react';

// Components
import Blog from './Blog';

// Redux
import { useSelector } from 'react-redux';
import { useGetAllBlogQuery, selectBlogIds } from './blogSlice';

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
