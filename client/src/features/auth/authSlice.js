import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || null);

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? user : null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      console.log(payload);
      state.user = payload;
    },
    reset: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
});

export const apiAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: () => ({
        url: 'auth/',
        method: 'GET',
        providesTags: ['Auth'],
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/',
        method: 'POST',
        body: credentials,
        invalidatesTags: ['Auth'],
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: 'auth/register',
        method: 'POST',
        body: user,
        invalidatesTags: ['Auth'],
      }),
    }),
  }),
});

export const { useLoadUserQuery, useLoginMutation, useRegisterMutation } =
  apiAuth;

export const { setCredentials, reset } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
