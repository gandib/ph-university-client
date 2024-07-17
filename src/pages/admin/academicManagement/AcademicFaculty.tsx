/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Table, TableColumnsType, TableProps } from "antd";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { TAcademicFaculty, TQueryParam } from "../../../types";
import { useState } from "react";

export type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: facultyData, isFetching } =
    academicManagementApi.useGetAllAcademicFacultiesQuery(params);

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));
  const tableData2 = tableData?.map(({ name }) => ({
    text: name,
    value: name,
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
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
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

export default AcademicFaculty;
