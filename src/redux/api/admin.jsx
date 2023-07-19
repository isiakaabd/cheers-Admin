import { api } from "./api";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllGlobalVendors: builder.query({
      query: ({ search }) => ({
        url: `/global-vendors${search && `/search?search=${search}`}`,
      }),
      providesTags: ["vendors"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
      }),
      providesTags: ["categories"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    deleteAvendor: builder.mutation({
      query: (id) => ({
        url: `global-vendors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["vendors"],
      transformErrorResponse: (error) => error.message,
    }),
    createVendor: builder.mutation({
      query: (body) => ({
        url: `global-vendors`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["vendors"],
    }),
    resetUserPassword: builder.mutation({
      query: (body) => ({
        url: `/change-user-password`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["users"],
    }),
    getCategory: builder.query({
      query: (categoryId) => ({
        url: `/categories/${categoryId}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["categories"],
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/get-all-users`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["users"],
    }),
    getGlobalOrders: builder.query({
      query: () => ({
        url: `/get-global-orders`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["orders"],
    }),
    getLocalOrders: builder.query({
      query: () => ({
        url: `/get-local-orders`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["orders"],
    }),
    searchVendor: builder.query({
      query: ({ search }) => ({
        url: `/search-vendors?search=${search}`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["users"],
    }),

    deleteUserAccount: builder.mutation({
      query: (body) => ({
        url: `/delete-user`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.message,
      invalidatesTags: ["users", "user"],
    }),
    updateGlobalVendor: builder.mutation({
      query: ({ body, id }) => ({
        url: `global-vendors/update/${id}`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.message,
      invalidatesTags: ["vendors"],
    }),
    changeBirthday: builder.mutation({
      query: (body) => ({
        url: `/change-birthdate`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.message,
      invalidatesTags: ["users", "user"],
    }),
    blockUser: builder.mutation({
      query: (body) => ({
        url: `/block-user`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
      transformErrorResponse: (response) => response.data.message,
      invalidatesTags: ["users", "user"],
    }),
    getMainVendors: builder.query({
      query: () => ({
        url: `/get-vendors`,
      }),
      transformResponse: (response) => response.data,
      providesTags: ["vendor"],
    }),
    getDashboardAnalytics: builder.query({
      query: () => ({
        url: `/dashboard-analytics`,
      }),
      transformResponse: (response) => response.data,
    }),
    toggleVendor: builder.mutation({
      query: (body) => ({
        url: `/vendors/toggle`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["vendor"],
    }),
    resetVendorPassword: builder.mutation({
      query: (body) => ({
        url: `/change-vendor-password`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["vendor"],
    }),
    updateCategory: builder.mutation({
      query: ({ categoryId, x }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: x,
      }),
      invalidatesTags: ["categories"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["categories"],
      //   transformErrorResponse: (error) => error.data.message,
    }),
    deleteCategory: builder.mutation({
      query: ({ categoryId }) => ({
        url: `/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
      transformResponse: (response) => response.message,
    }),
    activateOrDeactivateVendor: builder.mutation({
      query: (id) => ({
        url: `/vendors/toggle?vendor_id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["vendors"],
      //   transformErrorResponse: (error) => error.data.message,
    }),
  }),
});
export const {
  useResetVendorPasswordMutation,
  useUpdateGlobalVendorMutation,
  useResetUserPasswordMutation,
  useGetAllGlobalVendorsQuery,
  useLazyGetAllGlobalVendorsQuery,
  useGetAllCategoriesQuery,
  useCreateVendorMutation,
  useDeleteAvendorMutation,
  useSearchVendorQuery,
  useLazySearchVendorQuery,
  useActivateOrDeactivateVendorMutation,
  useGetCategoryQuery,
  useChangeBirthdayMutation,
  useDeleteCategoryMutation,
  useGetAllUsersQuery,
  useGetMainVendorsQuery,
  useLazyGetMainVendorsQuery,
  useCreateCategoryMutation,
  useGetGlobalOrdersQuery,
  useToggleVendorMutation,
  useDeleteUserAccountMutation,
  useUpdateCategoryMutation,
  useGetDashboardAnalyticsQuery,
  useBlockUserMutation,
  useGetLocalOrdersQuery,
} = adminSlice;
