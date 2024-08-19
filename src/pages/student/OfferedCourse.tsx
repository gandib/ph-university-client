import studentCourseApi from "../../redux/features/student/studentCourseManagement.api";

const OfferedCourse = () => {
  const { data: offeredCoursesData } =
    studentCourseApi.useGetAllMyOfferedCoursesQuery(undefined);
  const singleObject = offeredCoursesData?.data?.reduce((acc, item) => {
    const key = item.course.title;

    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
    });
    return acc;
  }, {});
  console.log(Object.values(singleObject ? singleObject : {}));

  return (
    <div>
      <h1>Offered Course</h1>
    </div>
  );
};

export default OfferedCourse;
