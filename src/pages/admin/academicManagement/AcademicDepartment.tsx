import { Button, Table, TableColumnsType, TableProps } from "antd";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TQueryParam,
} from "../../../types";
import { useState } from "react";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { string } from "zod";

export type TTableData = Pick<TAcademicDepartment & TAcademicFaculty, "name">;

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: departmentData, isFetching } =
    academicManagementApi.useGetAllDepartmentsQuery(params);
  console.log(departmentData);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
      academicFacultyId: academicFaculty._id,
    })
  );

  const tableData2 = tableData?.map(({ name }) => ({
    text: name,
    value: name,
  }));

  const facultyFilters: string[] = [];
  tableData?.map((item) => {
    if (
      facultyFilters.includes(
        `${item.academicFaculty} & ${item.academicFacultyId}`
      ) !== true
    ) {
      facultyFilters.push(
        `${item.academicFaculty} & ${item.academicFacultyId}`
      );
    }
  });

  const facultyFilter = facultyFilters?.map((item) => ({
    text: item.split(" & ")[0],
    value: item.split(" & ")[1],
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: tableData2,
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value as string),
      // width: "30%",
    },

    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
      filters: facultyFilter,
      filterSearch: true,
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.academicFaculty?.forEach((item) =>
        queryParams.push({ name: "academicFaculty", value: item })
      );
      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
