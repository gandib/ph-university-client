import academicSemesterApi from "../../../redux/features/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = academicSemesterApi.useGetAllSemestersQuery(undefined);
  console.log(data);

  return (
    <div>
      <h1>Academic semester</h1>
    </div>
  );
};

export default AcademicSemester;
