import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import PHSelect from "../../../components/form/PHSelect";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const CreateAcademicDepartment = () => {
  const { data: facultyData } =
    academicManagementApi.useGetAllAcademicFacultiesQuery(undefined);

  const [addAcademicDepartment] =
    academicManagementApi.useAddAcademicDepartmentMutation();

  const academicFacultyOptions = facultyData?.data?.map(({ name, _id }) => ({
    value: _id,
    label: name,
  }));

  console.log(academicFacultyOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = (await addAcademicDepartment(data)) as TResponse<{
        message: string;
      }>;
      if (res?.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.data?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PHInput type="text" label="Name" name="name" />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions!}
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
