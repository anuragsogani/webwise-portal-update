import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  PlusCircle, 
  LogOut,
  ChevronRight,
  BarChart2,
} from "lucide-react";
import { authApi } from "../api/auth";
import BrandLogo from "./BrandLogo";

export default function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    authApi.logout();
    window.location.href = "/login";
  };

  const navItems = [
    {
      label: "Analytics & Leads",
      path: "/admin/analytics",
      icon: <BarChart2 size={18} />
    },
    {
      label: "Manage Blogs",
      path: "/admin/manage-blogs",
      icon: <LayoutDashboard size={18} />
    },
    {
      label: "Create Post",
      path: "/admin/create-blog",
      icon: <PlusCircle size={18} />
    },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__logo">
        <BrandLogo size={40} />
        <span className="logo-text">AIRAT<span className="accent">PULSE</span></span>
        <span className="logo-badge">ADMIN</span>
      </div>

      <nav className="admin-sidebar__nav">
        <div className="nav-group">
          <div className="nav-group__label">Main Menu</div>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${currentPath === item.path ? "active" : ""}`}
            >
              <span className="nav-link__icon">{item.icon}</span>
              <span className="nav-link__label">{item.label}</span>
              {currentPath === item.path && <ChevronRight size={14} className="nav-link__arrow" />}
            </Link>
          ))}
        </div>
      </nav>

      <div className="admin-sidebar__footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
