import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user') || null);

const slice = createSlice({
  name: 'auth',
  initialState: {
    user: user ? user : null,
    userProfile: user ? user.user : null,
  },
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload;
      state.userProfile = payload.user;
    },
    reset: (state) => {
      state.user = null;
      state.userProfile = null;
      localStorage.removeItem('user');
    },
  },
});

export const apiAuth = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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

export const {useLoginMutation, useRegisterMutation } =
  apiAuth;

export const { setCredentials, reset } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.userProfile;
