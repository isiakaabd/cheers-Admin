import { api } from "./api";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllVendors: builder.query({
      query: () => ({
        url: "/global-vendors",
        method: "GET",
      }),
      providesTags: ["vendors"],
      transformResponse: (response) => response.data,
      transformErrorResponse: (error) => error.message,
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
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
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["categories"],
    }),
    getMainVendors: builder.query({
      query: () => ({
        url: `/get-vendors`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["vendor"],
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
      query: ({ categoryId, name }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["categories"],
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
  useDeleteCategoryMutation,
  useGetMainVendorsQuery,
  useCreateCategoryMutation,
  useToggleVendorMutation,
  useUpdateCategoryMutation,
} = adminSlice;
