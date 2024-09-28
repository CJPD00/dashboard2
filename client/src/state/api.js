import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "../config";
//import { Update } from "@mui/icons-material";

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
    "Avatar",
    "EventosG",
    "Publicaciones",
    "Premios",
    "Tareas",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    activeUser: build.mutation({
      query: ({ id, departamento }) => ({
        url: `user/activateUser/${id}`,
        method: "PUT",
        body: {
          departamento,
        },
      }),
      invalidatesTags: ["User", "Users"],
    }),
    desactiveUser: build.mutation({
      query: (id) => ({
        url: `user/desactivateUser/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["User", "Users"],
    }),
    deleteUser: build.mutation({
      query: ({ id }) => ({
        url: `user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Users"],
    }),
    getDepartments: build.query({
      query: () => "departamento",
      providesTags: ["Departments"],
    }),
    createDepartment: build.mutation({
      query: (department) => ({
        url: "departamento",
        method: "POST",
        body: department,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: build.mutation({
      query: ({ nombre }) => ({
        url: `departamento/${nombre}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Departments", "Careers"],
    }),
    updateDepartment: build.mutation({
      query: ({ id, nombre, cantidadProfesores, description }) => ({
        url: `departamento/${id}`,
        method: "PUT",
        body: {
          nombre,
          cantidadProfesores,
          description,
        },
      }),
      invalidatesTags: ["Departments"],
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
    createProject: build.mutation({
      query: (project) => ({
        url: "projecto",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: build.mutation({
      query: ({ id }) => ({
        url: `projecto/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    getCareers: build.query({
      query: () => "carrera",
      providesTags: ["Careers"],
    }),
    getCareerById: build.query({
      query: (id) => `carrera/byId/${id}`,
      providesTags: ["Careers"],
    }),
    postCareer: build.mutation({
      query: (career) => ({
        url: "carrera",
        method: "POST",
        body: career,
      }),
      invalidatesTags: ["Careers"],
    }),
    updateCareer: build.mutation({
      query: ({ id, nombre, description, idDepartamento }) => ({
        url: `carrera/${id}`,
        method: "PUT",
        body: {
          nombre,
          description,
          idDepartamento,
        },
      }),
      invalidatesTags: ["Careers"],
    }),
    deleteCareer: build.mutation({
      query: ({ id }) => ({
        url: `carrera/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Careers"],
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
    getAvatar: build.query({
      query: (avatarName) => ({
        url: `user/getAvatar/${avatarName}`,
        method: "GET",
        responseHandler: (response) => response,
      }),
      providesTags: ["Avatar"],
    }),
    updateAvatar: build.mutation({
      query: ({ id, avatar, token }) => ({
        url: `user/uploadAvatar/${id}`,
        method: "PUT",
        headers: {
          authorization: token,
        },
        body: avatar,
      }),
      invalidatesTags: ["Avatar"],
    }),
    getEventosG: build.query({
      query: () => ({
        url: "eventog",
        method: "GET",
      }),
      providesTags: ["EventosG"],
    }),
    createEventoG: build.mutation({
      query: ({ title, day, type, description }) => ({
        url: "eventog",
        method: "POST",
        body: {
          title,
          day,
          type,
          description,
        },
      }),
      invalidatesTags: ["EventosG"],
    }),
    getEventoById: build.query({
      query: (id) => `eventog/byId/${id}`,
      providesTags: ["EventosG"],
    }),
    updateEventoG: build.mutation({
      query: ({ id, title, day, type, description }) => ({
        url: `eventog/${id}`,
        method: "PUT",
        body: {
          title,
          day,
          type,
          description,
        },
      }),
      invalidatesTags: ["EventosG"],
    }),
    deleteEventoG: build.mutation({
      query: ({ id }) => ({
        url: `eventog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EventosG"],
    }),
    getPublicaciones: build.query({
      query: () => ({
        url: "publicacion",
        method: "GET",
      }),
      providesTags: ["Publicaciones"],
    }),
    getPublicacionById: build.query({
      query: (id) => `publicacion/byId/${id}`,
      providesTags: ["Publicaciones"],
    }),
    createPublicaciones: build.mutation({
      query: ({ title, autor, link }) => ({
        url: "publicacion",
        method: "POST",
        body: {
          title,
          autor,
          link,
        },
      }),
      invalidatesTags: ["Publicaciones"],
    }),
    updatePublicaciones: build.mutation({
      query: ({ id, title, autor, link }) => ({
        url: `publicacion/${id}`,
        method: "PUT",
        body: {
          title,
          autor,
          link,
        },
      }),
      invalidatesTags: ["Publicaciones"],
    }),
    deletePublicaciones: build.mutation({
      query: ({ id }) => ({
        url: `publicacion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Publicaciones"],
    }),
    getPremios: build.query({
      query: () => ({
        url: "premio",
        method: "GET",
      }),
      providesTags: ["Premios"],
    }),
    createPremio: build.mutation({
      query: (premio) => ({
        url: "premio",
        method: "POST",
        body: premio,
      }),
      invalidatesTags: ["Premios"],
    }),
    updatePremio: build.mutation({
      query: (premio) => ({
        url: `premio/${premio._id}`,
        method: "PUT",
        body: premio,
      }),
      invalidatesTags: ["Premios"],
    }),
    deletePremio: build.mutation({
      query: (id) => ({
        url: `premio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Premios"],
    }),
    getTareas: build.query({
      query: () => ({
        url: "tarea",
        method: "GET",
      }),
      providesTags: ["Tareas"],
    }),
    getTareaById: build.query({
      query: (id) => ({ url: `tarea/byId/${id}`, method: "GET" }),
      providesTags: ["Tareas"],
    }),
    createTarea: build.mutation({
      query: (tarea) => ({
        url: "tarea",
        method: "POST",
        body: tarea,
      }),
      invalidatesTags: ["Tareas"],
    }),
    updateTarea: build.mutation({
      query: ({ id, title, fecha, responsable, description, lugar }) => ({
        url: `tarea/${id}`,
        method: "PUT",
        body: {
          title,
          fecha,
          responsable,
          description,
          lugar,
        },
      }),
      invalidatesTags: ["Tareas"],
    }),
    deleteTarea: build.mutation({
      query: ({ id }) => ({
        url: `tarea/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tareas"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useActiveUserMutation,
  useDesactiveUserMutation,
  useDeleteUserMutation,
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateDepartmentMutation,
  useGetUsersQuery,
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetCareersQuery,
  useGetCareerByIdQuery,
  usePostCareerMutation,
  useUpdateCareerMutation,
  useDeleteCareerMutation,
  useGetGeographyQuery,
  useGetBreakdownQuery,
  useGetTotalsQuery,
  useGetTotalsRecentQuery,
  useGetAvatarQuery,
  useUpdateAvatarMutation,
  useGetEventosGQuery,
  useCreateEventoGMutation,
  useGetEventoByIdQuery,
  useUpdateEventoGMutation,
  useDeleteEventoGMutation,
  useGetPublicacionesQuery,
  useCreatePublicacionesMutation,
  useGetPublicacionByIdQuery,
  useUpdatePublicacionesMutation,
  useDeletePublicacionesMutation,
  useGetPremiosQuery,
  useCreatePremioMutation,
  useUpdatePremioMutation,
  useDeletePremioMutation,
  useGetTareasQuery,
  useGetTareaByIdQuery,
  useCreateTareaMutation,
  useUpdateTareaMutation,
  useDeleteTareaMutation,
} = api;
