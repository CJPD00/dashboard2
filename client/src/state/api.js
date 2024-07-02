import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Departments",
    "Users",
    "Projects",
    "Careers",
    "Geography",
    "Breakdown",
    "Totals",
    "TotalsRecent",
    "Dashboard",
    "UserSignup",
    "RefreshToken",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    getDepartments: build.query({
      query: () => "departamento",
      providesTags: ["Departments"],
    }),
    getUsers: build.query({
      query: () => "user",
      providesTags: ["Users"],
    }),
    getProjects: build.query({
      query: ({ page, limit, sort, search }) => ({
        url: "projecto",
        method: "GET",
        params: {
          page,
          limit,
          sort: JSON.stringify(sort),
          search,
        },
      }),
      providesTags: ["Projects"],
    }),
    getCareers: build.query({
      query: () => "carrera",
      providesTags: ["Careers"],
    }),
    getGeography: build.query({
      query: () => "personal/geografia",
      providesTags: ["Geography"],
    }),
    getBreakdown: build.query({
      query: () => "overall/projectsByType",
      providesTags: ["Breakdown"],
    }),
    getTotals: build.query({
      query: () => "overall/total",
      providesTags: ["Totals"],
    }),
    getTotalsRecent: build.query({
      query: () => "overall/totalRecent",
      providesTags: ["TotalsRecent"],
    }),
    userSignup: build.mutation({
      query: (data) => ({
        url: "user/signUp",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserSignup"],
    }),
    //refresh token
    refreshToken: build.mutation({
      query: (data) => ({
        url: "auth/refresh",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RefreshToken"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDepartmentsQuery,
  useGetUsersQuery,
  useGetProjectsQuery,
  useGetCareersQuery,
  useGetGeographyQuery,
  useGetBreakdownQuery,
  useGetTotalsQuery,
  useGetTotalsRecentQuery,
  useUserSignupMutation,
} = api;
