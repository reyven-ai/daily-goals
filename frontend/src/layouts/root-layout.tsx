import PrivateRoutes from "@/routes/private.routes";
import { Outlet } from "react-router-dom";
import Sidebar from "../journal/layouts/Sidebar";

export default function RootLayout() {
  return (
    <>
      <div className="flex">
        <PrivateRoutes>
          <Sidebar />
        </PrivateRoutes>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
