import { useParams } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { Button, Col, Divider, Row } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";

const FacultyUpdate = () => {
  const { facultyId } = useParams();
  const { data } = userManagementApi.useGetSingleStudentQuery(facultyId);

  console.log(data);

  const facultyDefaultValues = {
    name: {
      firstName: data?.data?.name?.firstName,
      middleName: data?.data?.name?.middleName,
      lastName: data?.data?.name?.lastName,
    },
    designation: data?.data?.designation,
    gender: data?.data?.gender,
    bloodGroup: data?.data?.bloodGroup,

    email: data?.data?.email,
    contactNo: data?.data?.contactNo,
    emergencyContactNo: data?.data?.emergencyContactNo,
    presentAddress: data?.data?.presentAddress,
    permanentAddress: data?.data?.permanentAddress,

    academicFaculty: data?.data?.academicFaculty?._id,
    academicDepartment: data?.data?.academicDepartment?._id,
  };

  const [updateFaculty, { data: updatedData, error }] =
    userManagementApi.useUpdateFacultyMutation();
  console.log({ updatedData, error });

  const { data: aData, isLoading: aIsLoading } =
    academicManagementApi.useGetAllAcademicFacultiesQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    academicManagementApi.useGetAllDepartmentsQuery(undefined);

  const semesterOptions = aData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
    disabled: aIsLoading,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
    disabled: dIsLoading,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const facultyData = {
      id: facultyId,
      data: {
        password: data?.password,
        faculty: data,
      },
    };
    // const formData = new FormData();
    // formData.append("data", JSON.stringify(studentData));
    // formData.append("file", data?.profileImg);

    console.log(facultyData);

    const toastId = toast.loading("Loading...");

    try {
      const res = (await updateFaculty(facultyData)) as TResponse<{
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

    // for development purpose to see data
    // console.log(Object.fromEntries(formData));
  };

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}>
          <Divider>Personal Information</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker name="dateOfBirth" label="Date Of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="password" name="password" label="Password" />
            </Col>
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </Form.Item>
                )}
              />
            </Col> */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="designation" label="Designation" />
            </Col>

            <Divider>Contact Information</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="emergencyContactNo"
                label="Emergency Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>

            <Divider>Academic Information</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicFaculty"
                label="Academic Faculty"
                options={semesterOptions!}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions!}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default FacultyUpdate;
