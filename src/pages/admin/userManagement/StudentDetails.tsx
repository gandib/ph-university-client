import { useParams } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";

const StudentDetails = () => {
  const { studentId } = useParams();
  const { data } = userManagementApi.useGetSingleStudentQuery(studentId);

  console.log(data);
  return (
    <div>
      <h1>Hello, StudentDetail {studentId}!</h1>
    </div>
  );
};

export default StudentDetails;
