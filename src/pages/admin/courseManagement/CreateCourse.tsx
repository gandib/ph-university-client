import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import PHInput from "../../../components/form/PHInput";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";

const CreateCourse = () => {
  const [addCourse] = courseManagementApi.useAddCourseMutation();

  const { data: courses } =
    courseManagementApi.useGetAllCoursesQuery(undefined);
  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      course: {
        ...data,
        credits: Number(data.credits),
        code: Number(data.code),
        isDeleted: false,
        preRequisiteCourses: data?.preRequisiteCourses
          ? data?.preRequisiteCourses?.map((item: string) => ({
              course: item,
              isDeleted: false,
            }))
          : [],
      },
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as TResponse<{
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

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHInput type="text" name="title" label="Title" />
          <PHInput type="text" name="prefix" label="Prefix" />
          <PHInput type="text" name="code" label="Code" />
          <PHInput type="text" name="credits" label="Credits" />
          <PHSelect
            mode="multiple"
            options={preRequisiteCoursesOptions!}
            name="preRequisiteCourses"
            label="Pre Requisite Courses"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
