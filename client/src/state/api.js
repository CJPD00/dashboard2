import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: config.baseUrl }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Departments",
    "Users",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
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
    // getTransactions: build.query({
    //   query: ({ page, pageSize, sort, search }) => ({
    //     url: "client/transactions",
    //     method: "GET",
    //     params: {
    //       page,
    //       pageSize,
    //       sort,
    //       search,
    //     },
    //   }),
    //   providesTags: ["Transactions"],
    // }),
    // getGeography: build.query({
    //   query: () => "client/geography",
    //   providesTags: ["Geography"],
    // }),
    // getSales: build.query({
    //   query: () => "sales/sales",
    //   providesTags: ["Sales"],
    // }),
    // getAdmins: build.query({
    //   query: () => "management/admins",
    //   providesTags: ["Admins"],
    // }),
    // getUserPerformance: build.query({
    //   query: (id) => `management/performance/${id}`,
    //   providesTags: ["Performance"],
    // }),
    // getDashboard: build.query({
    //   query: () => "general/dashboard",
    //   providesTags: ["Dashboard"],
    // }),
  }),
});

export const {
  useGetUserQuery,
  useGetDepartmentsQuery,
  useGetUsersQuery,
  // useGetTransactionsQuery,
  // useGetGeographyQuery,
  // useGetSalesQuery,
  // useGetAdminsQuery,
  // useGetUserPerformanceQuery,
  // useGetDashboardQuery,
} = api;
