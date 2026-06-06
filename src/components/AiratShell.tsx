import { useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import BookCallFab from "./BookCallFab";
import "../styles/admin-layout.css";

export default function AiratShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <main className="admin-main">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrap">
      {children}
      <BookCallFab />
    </div>
  );
}
