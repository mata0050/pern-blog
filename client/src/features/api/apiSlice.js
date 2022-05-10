import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = JSON.parse(localStorage.getItem('user') || null);
      if (token) {
        headers.set('x-auth-token', token.token);
      }
      return headers;
    },
  }),
  tagTypes: ['Auth', 'Blog'],
  endpoints: (builder) => ({}),
});
