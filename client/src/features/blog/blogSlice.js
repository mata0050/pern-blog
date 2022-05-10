import { createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const blogAdapter = createEntityAdapter();

const initialState = blogAdapter.getInitialState();

const API_URL = 'api/blog/';

export const cohortApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (builder) => ({
    getAllBlog: builder.query({
      query: () => API_URL,
      transformResponse: (responseData) => {
        return blogAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: 'Blog', id: 'LIST' },
        ...result.ids.map((id) => ({ type: 'Blog', id })),
      ],
    }),
    // getAllCohort: builder.query({
    //   query: (id) => 'api/admin/all-cohorts',
    //   transformResponse: (responseData) => {
    //     return blogAdapter.setAll(initialState, responseData);
    //   },
    //   // providesTags: (result, error, arg) => [{ type: 'Cohort', id: arg }],

    //   providesTags: (result, error, arg) => [
    //     { type: 'Cohort', id: 'LIST' },
    //     ...result.ids.map((id) => ({ type: 'Cohort', id })),
    //   ],
    // }),
    addBlog: builder.mutation({
      query: (formData) => ({
        url: API_URL,
        method: 'POST',
        body: formData,
        invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
      }),
    }),
    updateBlog: builder.mutation({
      query: (formData) => ({
        url: API_URL,
        method: 'PUT',
        body: formData,
        invalidatesTags: (result, error, arg) => [{ type: 'Blog', id: arg.id }],
      }),
    }),
    deleteBlog: builder.mutation({
      query: (formData) => ({
        url: API_URL,
        method: 'DELETE',
        body: formData,
        invalidatesTags: (result, error, arg) => [{ type: 'Blog', id: arg.id }],
      }),
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  // useGetAllCohortQuery,
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = cohortApiSlice;

// returns the query result object
export const selectBlogResult = cohortApiSlice.endpoints.getAllBlog.select();

// Creates memoized selector
const selectBlogData = createSelector(
  selectBlogResult,
  (cohortResult) => cohortResult.data // normalized state object with ids & entities
);
// console.log(selectBlogData);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllBlogs,
  selectById: selectBlogById,
  selectIds: selectBlogIds,
  // Pass in a selector that returns the posts slice of state
} = blogAdapter.getSelectors(
  (state) => selectBlogData(state) ?? initialState
);
