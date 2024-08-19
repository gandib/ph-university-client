import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudents: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),

    getSingleStudent: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
    }),

    updateStudent: builder.mutation({
      query: (data) => {
        return {
          url: `/students/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
    }),

    getAllAdmins: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),

    getSingleAdmin: builder.query({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "GET",
        };
      },
    }),

    updateAdmin: builder.mutation({
      query: (data) => {
        return {
          url: `/admins/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
    }),

    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),

    getSingleFaculty: builder.query({
      query: (id) => {
        return {
          url: `/faculties/${id}`,
          method: "GET",
        };
      },
    }),

    updateFaculty: builder.mutation({
      query: (data) => {
        return {
          url: `/faculties/${data?.id}`,
          method: "PATCH",
          body: data?.data,
        };
      },
    }),

    updateUserStatus: builder.mutation({
      query: (data) => {
        return {
          url: `/users/change-status/${data?.id}`,
          method: "POST",
          body: data?.status,
        };
      },
    }),

    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export default userManagementApi;
