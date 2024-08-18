/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, TableColumnsType } from "antd";
import { TOfferedCourse } from "../../../types";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";

export type TTableData = Pick<
  TOfferedCourse,
  "startTime" | "endTime" | "section" | "course" | "faculty" | "maxCapacity"
>;

const OfferedCourses = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  // const [semesterId, setSemesterId] = useState("");

  const { data: offeredCoursesData, isFetching } =
    courseManagementApi.useGetAllOfferedCoursesQuery(undefined);

  console.log(offeredCoursesData);

  const tableData = offeredCoursesData?.data?.map(
    ({ _id, startTime, endTime, faculty, section, maxCapacity, course }) => ({
      key: _id,
      startTime,
      endTime,
      faculty: faculty.fullName,
      section,
      maxCapacity,
      course: course.title,
    })
  );

  // const handleStatusUpdate = async (data: { key: string }) => {
  //   const toastId = toast.loading("Updating...");

  //   const updatedData = {
  //     id: semesterId,
  //     data: {
  //       status: data.key,
  //     },
  //   };

  // try {
  //   const res = (await updateSemesterStatus(updatedData)) as TResponse<{
  //     message: string;
  //   }>;
  //   console.log(res);
  //   if (res?.error) {
  //     toast.error(res.error.data.message, { id: toastId });
  //   } else {
  //     toast.success(res?.data?.message, { id: toastId });
  //   }
  // } catch (error) {
  //   console.log(error);
  //   toast.error("Something went wrong!", { id: toastId });
  // }
  // };

  // const menueProps = {
  //   items,
  //   onClick: handleStatusUpdate,
  // };

  const columns: TableColumnsType<any> = [
    {
      title: "Course",
      key: "course",
      dataIndex: "course",
    },
    {
      title: "Faculty",
      key: "faculty",
      dataIndex: "faculty",
    },
    {
      title: "Start Time",
      key: "startTime",
      dataIndex: "startTime",
    },
    {
      title: "End Time",
      key: "endTime",
      dataIndex: "endTime",
    },
    {
      title: "Max Capacity",
      key: "maxCapacity",
      dataIndex: "maxCapacity",
    },
    {
      title: "Section",
      key: "section",
      dataIndex: "section",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          // <Dropdown menu={menueProps} trigger={["click"]}>
          <Button>Update</Button>
          // </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>["onChange"] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === "filter") {
  //     const queryParams: TQueryParam[] = [];

  //     filters.name?.forEach((item) =>
  //       queryParams.push({ name: "name", value: item })
  //     );

  //     filters.year?.forEach((item) =>
  //       queryParams.push({ name: "year", value: item })
  //     );

  //     setParams(queryParams);
  //   }
  // };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      // onChange={onChange}
    />
  );
};

export default OfferedCourses;
