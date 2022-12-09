import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    user: builder.query({
      query: (params) => {
        return {
          url: '/auth/user',
          method: "GET",
          params,
        };
      },
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: `/auth/register/`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useUserQuery, useCreateUserMutation } = authApi;
