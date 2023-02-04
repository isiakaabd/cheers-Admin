import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://api.cheers.global/api/admins",

  prepareHeaders: (headers, { getState }) => {
    //@ts-ignore
    const token = getState().auth.token;
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    if (token) {
      headers.append("AUTHORIZATION", `Bearer ${token}`);
    }
  },
});

export const api = createApi({
  // reducerPath: "api",
  baseQuery,
  tagTypes: ["vendor", "categories", "vendors"],
  endpoints: () => ({}),
});
