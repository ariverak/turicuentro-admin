import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const cabinApi = createApi({
  reducerPath: 'cabinApi',
  baseQuery,
  endpoints: (builder) => ({
    cabins: builder.query({
      query: (params) => {
        return {
          url: '/cabins',
          method: "GET",
          params,
        }
      },
    }),
    
    getCabin: builder.query({
      query: (id) => {
        return {
          url: `/cabins/${id}`,
          method: "GET",
        }
      },
    }),
    createCabin: builder.mutation({
      query(body) {
        return {
          url: '/cabins',
          method: 'POST',
          body,
        }
      },
    }),
    deleteCabin: builder.mutation({
      query(id) {
        return {
          url: `/cabins/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),

});

export const {
  useCabinsQuery,
  useGetCabinQuery,
  useCreateCabinMutation,
  useDeleteCabinMutation
} = cabinApi;
