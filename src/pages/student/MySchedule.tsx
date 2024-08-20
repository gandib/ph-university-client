import { Col, Row } from "antd";
import studentCourseApi from "../../redux/features/student/studentCourseManagement.api";

const MySchedule = () => {
  const { data: enrolledCourseData } =
    studentCourseApi.useGetAllEnrolledCoursesQuery(undefined);
  console.log(enrolledCourseData);
  return (
    <Row gutter={[0, 20]}>
      {enrolledCourseData?.data?.map((item) => {
        return (
          <Col span="24" style={{ border: "solid #d4d4d4 2px" }} key={item._id}>
            <div style={{ padding: "10px" }}>
              <h2>{item.course.title}</h2>
            </div>
            <Row
              justify="space-between"
              align="middle"
              style={{
                borderTop: "solid #d4d4d4 2px",
                padding: "10px",
              }}
            >
              <Col span="5">Section: {item.offeredCourse.section}</Col>
              <Col span="5">
                {item.offeredCourse.days.map((day, num) => {
                  return <span key={num}> {day} </span>;
                })}
              </Col>
              <Col span="5">Start Time: {item.offeredCourse.startTime}</Col>
              <Col>End Time: {item.offeredCourse.endTime}</Col>
              <Col>Grade: {item.grade}</Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default MySchedule;
