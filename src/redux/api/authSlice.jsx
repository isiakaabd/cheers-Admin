import { api } from "./api";

export const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/sign-in",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data,
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/create-account",
        method: "POST",
        body: JSON.stringify(body),
      }),
      transformErrorResponse: (error) => error.data.errors,
      transformResponse: (data) => data.message,
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "/verify",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data.message,
    }),
    resendToken: builder.mutation({
      query: (body) => ({
        url: "/verify/resend-token",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
      transformResponse: (data) => data.message,
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/forgot-password",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.errors,
      transformResponse: (data) => data.message,
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.message,
      transformResponse: (data) => data.data,
    }),
    getAdminProfile: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      // transformErrorResponse: (error: any) => error.data.message,
      transformResponse: (response) => response.data.admin,
    }),
  }),
});

export const {
  useLoginMutation,
  useResendTokenMutation,
  useVerifyEmailMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAdminProfileQuery,
} = authSlice;
