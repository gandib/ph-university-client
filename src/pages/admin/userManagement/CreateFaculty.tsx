import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import PHDatePicker from "../../../components/form/PHDatePicker";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";

// This is only for development
// should be removed
const facultyDefaultValues = {
  name: {
    firstName: "Hridita",
    middleName: "",
    lastName: "Roy",
  },
  designation: "Lecturer",
  gender: "female",
  dateOfBirth: "",
  bloodGroup: "O+",

  email: "faculty3@gmail.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Oak Avenue, Townsville",
  academicDepartment: "66742977b4516f6006fa3311",
};

const CreateFaculty = () => {
  const [addFaculty, { data, error }] =
    userManagementApi.useAddFacultyMutation();

  console.log({ data, error });
  const { data: dData, isLoading: dIsLoading } =
    academicManagementApi.useGetAllDepartmentsQuery(undefined);

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
    disabled: dIsLoading,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const facultyData = {
      password: "1234",
      faculty: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data?.profileImg);

    const toastId = toast.loading("Loading...");

    try {
      const res = (await addFaculty(formData)) as TResponse<{
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

    // for development purpose to see data
    console.log(Object.fromEntries(formData));
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
              <PHInput type="text" name="designation" label="Designation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
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
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="academicDepartment"
                label="Academic Department"
                options={departmentOptions!}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
