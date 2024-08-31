import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header className="header"></header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
