import {
  Button,
  Modal,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TFaculty, TQueryParam, TResponse } from "../../../types";
import { useState } from "react";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type TTableData = Pick<
  TFaculty,
  "id" | "fullName" | "email" | "contactNo"
>;

const FacultyData = () => {
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [facultyId, setFacultyId] = useState("");

  const { data: facultyData, isFetching } =
    userManagementApi.useGetAllFacultiesQuery([
      { name: "page", value: page },
      ...params,
    ]);

  const [updateUserStatus] = userManagementApi.useUpdateUserStatusMutation();

  const showModal = (id: string) => {
    setFacultyId(id);
    setOpen(true);
  };

  const handleOk = async () => {
    console.log(facultyId);
    const data = {
      id: facultyId,
      status: {
        status: "blocked",
      },
    };

    const toastId = toast.loading("Loading...");

    try {
      const res = (await updateUserStatus(data)) as TResponse<{
        message: string;
      }>;
      console.log(res);
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const metaData = facultyData?.meta;

  console.log(facultyData);
  const tableData = facultyData?.data?.map(
    ({ _id, id, fullName, contactNo, email }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },
    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/faculty-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Link to={`/admin/faculty-update/${item?.key}`}>
              <Button>Update</Button>
            </Link>

            <Button onClick={() => showModal(item?.id)}>Block</Button>
            <Modal
              open={open}
              title="Are you sure to block?"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            ></Modal>
          </Space>
        );
      },
      width: "1%",
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
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default FacultyData;
