import { useParams } from "react-router-dom";
import userManagementApi from "../../../redux/features/admin/userManagement.api";

const AdminDetails = () => {
  const { adminId } = useParams();
  const { data } = userManagementApi.useGetSingleAdminQuery(adminId);
  console.log(data);
  return (
    <div>
      <h1>Hello, AdminDetails {adminId}!</h1>
    </div>
  );
};

export default AdminDetails;
