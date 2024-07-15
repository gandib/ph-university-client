import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import userManagementApi from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types";

const studentDummyData = {
  password: "1234",
  student: {
    name: {
      firstName: "Tanni",
      middleName: "Rani",
      lastName: "Das",
    },
    gender: "female",
    dateOfBirth: "1998-03-15T00:00:00.000Z",
    bloodGroup: "A+",

    email: "john@example1.com",
    contactNo: "1234567890",
    emergencyContactNo: "9876543210",
    presentAddress: "123 Main Street, Cityville",
    permanentAddress: "456 Oak Avenue, Townsville",

    guardian: {
      fatherName: "Michael Smith",
      fatherOccupation: "Engineer",
      fatherContactNo: "1111111111",
      motherName: "Emily Smith",
      motherOccupation: "Doctor",
      motherContactNo: "2222222222",
    },

    localGuardian: {
      name: "Alice Johnson",
      occupation: "Teacher",
      contactNo: "3333333333",
      address: "789 Elm Street, Villageton",
    },
    admissionSemester: "66742a1fb4516f6006fa3314",
    academicDepartment: "66742977b4516f6006fa3311",
    isDeleted: false,
  },
};

// This is only for development
// should be removed
const studentDefaultValues = {
  name: {
    firstName: "Tanni",
    middleName: "Rani",
    lastName: "Das",
  },
  gender: "female",

  bloodGroup: "O+",

  email: "john@example1.com",
  contactNo: "1234567890",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, Cityville",
  permanentAddress: "456 Oak Avenue, Townsville",

  guardian: {
    fatherName: "Michael Smith",
    fatherOccupation: "Engineer",
    fatherContactNo: "1111111111",
    motherName: "Emily Smith",
    motherOccupation: "Doctor",
    motherContactNo: "2222222222",
  },

  localGuardian: {
    name: "Alice Johnson",
    occupation: "Teacher",
    contactNo: "3333333333",
    address: "789 Elm Street, Villageton",
  },
  admissionSemester: "66742a1fb4516f6006fa3314",
  academicDepartment: "66742977b4516f6006fa3311",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] =
    userManagementApi.useAddStudentMutation();

  const { data: sData, isLoading: sIsLoading } =
    academicManagementApi.useGetAllSemestersQuery(undefined);

  const { data: dData, isLoading: dIsLoading } =
    academicManagementApi.useGetAllDepartmentsQuery(undefined);

  console.log({ data, error });

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
    disabled: sIsLoading,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
    disabled: dIsLoading,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const studentData = {
      password: "1234",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));

    const toastId = toast.loading("Loading...");

    try {
      const res = (await addStudent(formData)) as TResponse<{
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
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
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

            <Divider>Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother Contact No"
              />
            </Col>

            <Divider>Local Guardian</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>

            <Divider>Academic Information</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                name="admissionSemester"
                label="Admission Semester"
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

export default CreateStudent;
