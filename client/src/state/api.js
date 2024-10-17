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
    "Personal",
    "DOCS",
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
      invalidatesTags: ["Departments", "Totals", "TotalsRecent"],
    }),
    deleteDepartment: build.mutation({
      query: ({ nombre }) => ({
        url: `departamento/${nombre}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Departments",
        "Totals",
        "TotalsRecent",
        "Careers",
        "Projects",
        "Personal",
      ],
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
    getProjectById: build.query({
      query: ({ id }) => `projecto/byId/${id}`,
      providesTags: ["Projects"],
    }),
    getProjectsByIdDepartamento: build.query({
      query: (id) => `projecto/byIdDepartamento/${id}`,
      providesTags: ["Projects"],
    }),
    createProject: build.mutation({
      query: (project) => ({
        url: "projecto",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects", "Breakdown", "Totals", "TotalsRecent"],
    }),
    deleteProject: build.mutation({
      query: ({ id }) => ({
        url: `projecto/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        "Projects",
        "Breakdown",
        "Totals",
        "TotalsRecent",
        "Careers",
        "Projects",
        "Personal",
      ],
    }),
    updateProject: build.mutation({
      query: (projecto) => ({
        url: `projecto/${projecto._id}`,
        method: "PUT",
        body: projecto,
      }),
      invalidatesTags: ["Projects", "Breakdown"],
    }),
    getCareers: build.query({
      query: () => "carrera",
      providesTags: ["Careers"],
    }),
    getCareerById: build.query({
      query: (id) => `carrera/byId/${id}`,
      providesTags: ["Careers"],
    }),
    getCareersByIdDepartamento: build.query({
      query: ({ id }) => `carrera/byIdDepartamento/${id}`,
      providesTags: ["Careers"],
    }),
    postCareer: build.mutation({
      query: (career) => ({
        url: "carrera",
        method: "POST",
        body: career,
      }),
      invalidatesTags: ["Careers", "Totals", "TotalsRecent"],
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
      invalidatesTags: [
        "Careers",
        "Totals",
        "TotalsRecent",
        "Careers",
        "Projects",
        "Personal",
        "Publicaciones",
      ],
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
      query: ({ title, autor, link, carrera }) => ({
        url: "publicacion",
        method: "POST",
        body: {
          title,
          autor,
          link,
          carrera,
        },
      }),
      invalidatesTags: ["Publicaciones"],
    }),
    updatePublicaciones: build.mutation({
      query: ({ id, title, autor, link, carrera }) => ({
        url: `publicacion/${id}`,
        method: "PUT",
        body: {
          title,
          autor,
          link,
          carrera,
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
    getPremiosByIdProject: build.query({
      query: (id) => ({ url: `premio/byIdProject/${id}`, method: "GET" }),
      providesTags: ["Premios"],
    }),
    otorgarPremio: build.mutation({
      query: (bodyInfo) => ({
        url: "premio/otorgarPremio",
        method: "POST",
        body: bodyInfo,
      }),
      invalidatesTags: ["Premios"],
    }),
    revocarPremio: build.mutation({
      query: (bodyInfo) => ({
        url: `premio/revocarPremio/`,
        method: "POST",
        body: bodyInfo,
      }),
      invalidatesTags: ["Premios"],
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
    getPersonalByProject: build.query({
      query: ({ id }) => ({
        url: `personal/byProject/${id}`,
        method: "GET",
      }),
      providesTags: ["Personal"],
    }),
    getPersonalById: build.query({
      query: (id) => ({ url: `personal/byId/${id}`, method: "GET" }),
      providesTags: ["Personal"],
    }),
    createPersonal: build.mutation({
      query: (personal) => ({
        url: `personal`,
        method: "POST",
        body: personal,
      }),
      invalidatesTags: ["Personal", "Geography", "Totals", "TotalsRecent"],
    }),
    deletePersonal: build.mutation({
      query: ({ id }) => ({
        url: `personal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Personal", "Geography", "Totals", "TotalsRecent"],
    }),
    updatePersonal: build.mutation({
      query: (personal) => ({
        url: `personal/${personal._id}`,
        method: "PUT",
        body: personal,
      }),
      invalidatesTags: ["Personal", "Geography"],
    }),
    uploadProjectDoc: build.mutation({
      query: ({ id, file }) => ({
        url: `doc/uploadProjectDoc/${id}`,
        method: "PUT",
        body: file,
      }),
      invalidatesTags: ["Projects"],
    }),
    downloadProjectDoc: build.query({
      query: ({ id }) => ({
        url: `doc/downloadProjectDoc/${id}`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["Projects"],
    }),
    uploadEstatuto: build.mutation({
      query: ({ file }) => ({
        url: `doc/uploadEstatutoDoc`,
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Estatutos"],
    }),
    downloadEstatuto: build.query({
      query: () => ({
        url: `doc/downloadEstatutoDoc`,
        method: "GET",
        responseHandler: (response) => response.blob(),
      }),
      providesTags: ["Estatutos"],
    }),
    getExtEstatuto: build.query({
      query: () => ({
        url: `doc/sendExtEstatuto`,
        method: "GET",
      }),
      providesTags: ["Estatutos"],
    }),
    getPremioImage: build.query({
      query: ({ id }) => ({
        url: `doc/getPremioImage/${id}`,
        method: "GET",
        responseHandler: (response) => response,
      }),
      providesTags: ["Premios"],
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
  useGetProjectByIdQuery,
  useGetProjectsByIdDepartamentoQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetCareersQuery,
  useGetCareerByIdQuery,
  useGetCareersByIdDepartamentoQuery,
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
  useGetPremiosByIdProjectQuery,
  useOtorgarPremioMutation,
  useRevocarPremioMutation,
  useCreatePremioMutation,
  useUpdatePremioMutation,
  useDeletePremioMutation,
  useGetTareasQuery,
  useGetTareaByIdQuery,
  useCreateTareaMutation,
  useUpdateTareaMutation,
  useDeleteTareaMutation,
  useGetPersonalByProjectQuery,
  useGetPersonalByIdQuery,
  useCreatePersonalMutation,
  useDeletePersonalMutation,
  useUpdatePersonalMutation,
  useUploadProjectDocMutation,
  useLazyDownloadProjectDocQuery,
  useUploadEstatutoMutation,
  useLazyDownloadEstatutoQuery,
  useGetExtEstatutoQuery,
  useGetPremioImageQuery,
} = api;
