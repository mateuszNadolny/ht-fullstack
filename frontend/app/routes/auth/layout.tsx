import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      Top layout <Outlet />
    </div>
  );
}

export default AuthLayout;
