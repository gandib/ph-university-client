/* eslint-disable @typescript-eslint/no-explicit-any */
import studentCourseApi from "../../redux/features/student/studentCourseManagement.api";
import { Button, Col, Row } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../types";

type TCourse = {
  [index: string]: any;
};
type TSection = {
  section: string;
  _id: string;
  days: string[];
  startTime: string;
  endTime: string;
};

const OfferedCourse = () => {
  const { data: offeredCoursesData, isLoading } =
    studentCourseApi.useGetAllMyOfferedCoursesQuery(undefined);
  const [enroll] = studentCourseApi.useEnrollCourseMutation();
  console.log(offeredCoursesData);
  const singleObject = offeredCoursesData?.data?.reduce(
    (acc: TCourse, item) => {
      const key = item.course.title;

      acc[key] = acc[key] || { courseTitle: key, _id: item._id, sections: [] };
      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });
      return acc;
    },
    {}
  );

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await enroll({ offeredCourse: id })) as TResponse<{
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

  if (!modifiedData.length && !isLoading) {
    return <h2>No available courses!</h2>;
  }

  return (
    <Row gutter={[0, 20]}>
      {modifiedData?.map((item) => {
        return (
          <Col span="24" style={{ border: "solid #d4d4d4 2px" }} key={item._id}>
            <div style={{ padding: "10px" }}>
              <h2>{item.courseTitle}</h2>
            </div>
            <div>
              {item.sections.map((section: TSection) => {
                return (
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      borderTop: "solid #d4d4d4 2px",
                      padding: "10px",
                    }}
                    key={section._id}
                  >
                    <Col span="5">Section: {section.section}</Col>
                    <Col span="5">
                      {section.days.map((day, num) => {
                        return <span key={num}> {day} </span>;
                      })}
                    </Col>
                    <Col span="5">Start Time: {section.startTime}</Col>
                    <Col span="5">End Time: {section.endTime}</Col>
                    <Button onClick={() => handleEnroll(section._id)}>
                      Enroll
                    </Button>
                  </Row>
                );
              })}
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default OfferedCourse;
