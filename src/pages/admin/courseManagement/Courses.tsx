/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table, TableColumnsType } from "antd";
import { TCourse, TResponse } from "../../../types";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export type TTableData = Pick<TCourse, "title" | "prefix" | "code">;

const Courses = () => {
  const { data: courses, isFetching } =
    courseManagementApi.useGetAllCoursesQuery(undefined);

  console.log(courses);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns: TableColumnsType<any> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <Table loading={isFetching} columns={columns} dataSource={tableData} />
  );
};

const AddFacultyModal = ({ facultyInfo }: FieldValues) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: facultiesData } =
    userManagementApi.useGetAllFacultiesQuery(undefined);
  const [addFaculties] = courseManagementApi.useAddFacultiesMutation();

  const facultiesOptions = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  console.log(facultyInfo);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const facultyData = {
      id: facultyInfo.key,
      data,
    };

    try {
      const res = (await addFaculties(facultyData)) as TResponse<{
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

    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Assisgn Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOptions!}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
