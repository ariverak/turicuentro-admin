import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const reservationApi = createApi({
  reducerPath: 'reservationApi',
  baseQuery,
  endpoints: (builder) => ({
    reservations: builder.query({
      query: (params) => {
        return {
          url: `/reservations`,
          method: "GET",
          params,
        }
      },
    }),
    
    getReservation: builder.query({
      query: (id) => {
        return {
          url: `/reservations/${id}`,
          method: "GET",
        }
      },
    }),
    createReservation: builder.mutation({
      query(body) {
        return {
          url: '/reservations',
          method: 'POST',
          body,
        }
      },
    }),
    updateReservation: builder.mutation({
      query(body) {
        return {
          url: `/reservations/${body.id}`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteReservation: builder.mutation({
      query(id) {
        return {
          url: `/reservations/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),

});

export const {
  useReservationsQuery,
  useGetReservationQuery,
  useCreateReservationMutation,
  useUpdateReservationMutation,
  useDeleteReservationMutation
} = reservationApi;
