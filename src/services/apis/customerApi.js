import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const customerApi = createApi({
  reducerPath: 'customerApi',
  baseQuery,
  endpoints: (builder) => ({
    customers: builder.query({
      query: (params) => {
        return {
          url: '/customers',
          method: "GET",
          params,
        }
      },
    }),
    
    getCustomer: builder.query({
      query: (id) => {
        return {
          url: `/customers/${id}`,
          method: "GET",
        }
      },
    }),
    createCustomer: builder.mutation({
      query(body) {
        return {
          url: '/customers',
          method: 'POST',
          body,
        }
      },
    }),
    updateCustomer: builder.mutation({
      query(body) {
        return {
          url: `/customers/${body.id}`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteCustomer: builder.mutation({
      query(id) {
        return {
          url: `/customers/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),

});

export const {
  useCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
