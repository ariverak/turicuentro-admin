import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../config/constants";

export const settingApi = createApi({
  reducerPath: 'settingApi',
  baseQuery,
  endpoints: (builder) => ({
    settings: builder.query({
      query: (params) => {
        return {
          url: '/settings',
          method: "GET",
          params,
        }
      },
    }),
    
    getSetting: builder.query({
      query: (id) => {
        return {
          url: `/settings/${id}`,
          method: "GET",
        }
      },
    }),
    createSetting: builder.mutation({
      query(body) {
        return {
          url: '/settings',
          method: 'POST',
          body,
        }
      },
    }),
    updateSetting: builder.mutation({
      query(body) {
        return {
          url: `/settings/${body.id}`,
          method: 'PUT',
          body,
        }
      },
    }),
    deleteSetting: builder.mutation({
      query(id) {
        return {
          url: `/settings/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),

});

export const {
  useSettingsQuery,
  useGetSettingQuery,
  useCreateSettingMutation,
  useUpdateSettingMutation,
  useDeleteSettingMutation
} = settingApi;
