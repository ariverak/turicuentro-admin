import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const prepaidApi = createApi({
  reducerPath: 'prepaidApi',
  baseQuery,
  endpoints: (builder) => ({
    prepaids: builder.query({
      query: (params) => {
        return {
          url: '/prepaids',
          method: "GET",
          params,
        }
      },
    }),
    
    getPrepaid: builder.query({
      query: (id) => {
        return {
          url: `/prepaids/${id}`,
          method: "GET",
        }
      },
    }),
    createPrepaid: builder.mutation({
      query(body) {
        return {
          url: '/prepaids',
          method: 'POST',
          body,
        }
      },
    }),
    updatePrepaid: builder.mutation({
      query(body) {
        return {
          url: `/prepaids/${body.id}`,
          method: 'PUT',
          body,
        }
      },
    }),
    deletePrepaid: builder.mutation({
      query(id) {
        return {
          url: `/prepaids/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),

});

export const {
  usePrepaidsQuery,
  useGetPrepaidQuery,
  useCreatePrepaidMutation,
  useUpdatePrepaidMutation,
  useDeletePrepaidMutation
} = prepaidApi;
