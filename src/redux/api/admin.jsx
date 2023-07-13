import { api } from "./api";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: () => ({
        url: "/global-vendors",
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
  useGetAllVendorsQuery,
  useGetAllCategoriesQuery,
  useCreateVendorMutation,
  useDeleteAvendorMutation,
  useActivateOrDeactivateVendorMutation,
  useGetCategoryQuery,
  useChangeBirthdayMutation,
  useDeleteCategoryMutation,
  useGetAllUsersQuery,
  useGetMainVendorsQuery,
  useCreateCategoryMutation,
  useToggleVendorMutation,
  useDeleteUserAccountMutation,
  useUpdateCategoryMutation,
  useGetDashboardAnalyticsQuery,
  useBlockUserMutation,
} = adminSlice;
