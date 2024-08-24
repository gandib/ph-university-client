import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import userManagementApi from "../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { baseApi } from "../redux/api/baseApi";

const ChangePassword = () => {
  const [changePassword] = userManagementApi.useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Password is changing.");
    console.log(data);

    try {
      const res = await changePassword(data).unwrap();

      toast.success("Password is changed successfully!", {
        id: toastId,
        duration: 2000,
      });
      console.log(res);
      if (res?.success) {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        return navigate(`/login`);
      }
    } catch (error) {
      toast.error("Somethiong went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password:" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
