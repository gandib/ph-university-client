import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import PHInput from "../../../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import courseManagementApi from "../../../redux/features/admin/courseManagement.api";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import academicManagementApi from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { daysOptions } from "../../../constants/global";
import { toast } from "sonner";
import { TResponse } from "../../../types";
import PHTimePicker from "../../../components/form/PHTimePicker";
import moment from "moment";

const OfferCourse = () => {
  const [facultyId, setFacultyId] = useState("");
  const [courseId, setCourseId] = useState("");

  const { data: semesterRegistrationData } =
    courseManagementApi.useGetAllRegisteredSemestersQuery([
      { name: "sort", value: "year" },
      { name: "status", value: "UPCOMING" },
    ]);

  const registeredSemesterOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year} ${item.status}`,
    })
  );

  const { data: academicFaculty } =
    academicManagementApi.useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultyOptions = academicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: academicDepartment, isFetching: fetchingDepartments } =
    academicManagementApi.useGetAllDepartmentsQuery(
      [{ name: "academicFaculty", value: facultyId }],
      { skip: !facultyId }
    );

  const academicDepartmentOptions = academicDepartment?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const { data: courses } =
    courseManagementApi.useGetAllCoursesQuery(undefined);

  const courseOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const { data: faculties, isFetching: fetchingFaculties } =
    courseManagementApi.useGetFacultiesWithCourseQuery(courseId, {
      skip: !courseId,
    });

  const facultyOptions = faculties?.data?.faculties.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const [addOfferCourse] = courseManagementApi.useAddOfferCourseMutation();

  // console.log(facultyId);

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");

    const offerCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    console.log(offerCourseData);
    try {
      const res = (await addOfferCourse(offerCourseData)) as TResponse<{
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
          <PHSelect
            label="Semester Registration"
            name="semesterRegistration"
            options={registeredSemesterOptions!}
          />
          <PHSelectWithWatch
            onValueChange={setFacultyId}
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions!}
          />
          <PHSelect
            label="Academic Department"
            name="academicDepartment"
            options={academicDepartmentOptions!}
            disabled={!facultyId || fetchingDepartments}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            label="Course"
            name="course"
            options={courseOptions!}
          />
          <PHSelect
            label="Faculty"
            name="faculty"
            options={facultyOptions!}
            disabled={!courseId || fetchingFaculties}
          />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHInput type="text" name="section" label="Section" />
          <PHSelect
            mode="multiple"
            label="Days"
            name="days"
            options={daysOptions}
          />
          <PHTimePicker name="startTime" label="Start Time" />
          <PHTimePicker name="endTime" label="End Time" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
