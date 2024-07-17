import { useParams } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";

const FacultyDetails = () => {
  const { facultyId } = useParams();
  const { data } = userManagementApi.useGetSingleFacultyQuery(facultyId);
  console.log(data);
  return (
    <div>
      <h1>Hello, FacultyDetails {facultyId}!</h1>
    </div>
  );
};

export default FacultyDetails;
