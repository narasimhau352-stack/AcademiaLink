import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Sidebar />
      <main className="min-h-screen pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
