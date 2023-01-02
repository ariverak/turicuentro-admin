import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api";

export const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  });

  export const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });