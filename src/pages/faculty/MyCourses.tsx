/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Modal, Table, TableColumnsType } from "antd";
import facultyCourseApi from "../../redux/features/faculty/facultyManagement.api";
import PHSelect from "../../components/form/PHSelect";
import PHForm from "../../components/form/PHForm";
import { FieldValues } from "react-hook-form";
import { TCompletedCourse, TResponse } from "../../types";
import { useState } from "react";
import { toast } from "sonner";
import PHInput from "../../components/form/PHInput";

export type TTableData = Pick<
  TCompletedCourse,
  "student" | "course" | "academicSemester"
>;

const MyCourses = () => {
  const [students, setStudents] = useState<TCompletedCourse[] | undefined>([]);
  const { data: facultyEnrolledCourses } =
    facultyCourseApi.useGetAllFacultyOfferedCoursesQuery(undefined);
  console.log(facultyEnrolledCourses);

  const semesters: string[] = [];
  const semesterData: TCompletedCourse[] = [];
  facultyEnrolledCourses?.data?.map((item) => {
    if (semesters.includes(item?.academicSemester?.name) !== true) {
      semesters.push(item?.academicSemester?.name);
      semesterData.push(item);
    }
  });

  const semesterOptions = semesterData?.map((item) => ({
    label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
    value: item?.semesterRegistration?._id,
  }));

  const courses: string[] = [];
  const courseData: TCompletedCourse[] = [];
  facultyEnrolledCourses?.data?.map((item) => {
    if (courses.includes(item?.course?.title) !== true) {
      courses.push(item?.course?.title);
      courseData.push(item);
    }
  });

  const courseOptions = courseData?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const courseWiseStudents = facultyEnrolledCourses?.data?.filter(
      (item) =>
        item.semesterRegistration._id === data.semesterRegistration &&
        item.course._id === data.course
    );
    console.log(courseWiseStudents);
    setStudents(courseWiseStudents);
  };

  const tableData = students?.map(
    ({
      _id,
      student,
      course,
      academicSemester,
      semesterRegistration,
      offeredCourse,
      grade,
    }) => ({
      key: _id,
      name: student.fullName,
      id: student.id,
      grade: grade,
      course: course.title,
      semester: `${academicSemester.name} ${academicSemester.year}`,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns: TableColumnsType<any> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },

    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Course",
      key: "course",
      dataIndex: "course",
    },
    {
      title: "Semester",
      key: "semester",
      dataIndex: "semester",
    },
    {
      title: "Grade",
      key: "grade",
      dataIndex: "grade",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Flex justify="center" align="center">
        <Col span="6">
          <PHForm onSubmit={onSubmit}>
            <PHSelect
              options={semesterOptions!}
              name="semesterRegistration"
              label="Semester"
            />
            <PHSelect options={courseOptions!} name="course" label="Course" />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Flex>
      <Table columns={columns} dataSource={tableData} />
    </>
  );
};

const AddMarksModal = ({ studentInfo }: FieldValues) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateMarks] = facultyCourseApi.useUpdateMarksMutation();

  console.log(studentInfo);

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Creating...");
    const studentMarks = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };
    console.log(studentMarks);
    try {
      const res = (await updateMarks(studentMarks)) as TResponse<{
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
      <Button onClick={showModal}>Update Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="midTerm" label="Mid Term" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="finalTerm" label="Final Term" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyCourses;
