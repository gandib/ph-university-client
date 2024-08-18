import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import { TAcademicSemester, TResponse, TSemester } from "../../../types";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";

export type TTableData = Pick<
  TSemester & TAcademicSemester,
  "name" | "startDate" | "endDate" | "status"
>;

const items = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegisteredSemesters = () => {
  // const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [semesterId, setSemesterId] = useState("");

  const { data: semesterData, isFetching } =
    courseManagementApi.useGetAllRegisteredSemestersQuery([
      { name: "sort", value: "-_id" },
    ]);
  const [updateSemesterStatus] =
    courseManagementApi.useUpdateRegisteredSemesterMutation();

  console.log(semesterData);
  console.log(semesterId);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(new Date(startDate)).format("MMMM"),
      endDate: moment(new Date(endDate)).format("MMMM"),
    })
  );

  const handleStatusUpdate = async (data: { key: string }) => {
    const toastId = toast.loading("Updating...");

    const updatedData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = (await updateSemesterStatus(updatedData)) as TResponse<{
        message: string;
      }>;
      console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  const menueProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }
        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menueProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
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

export default RegisteredSemesters;
