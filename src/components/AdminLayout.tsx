import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  Users,
  BarChart2,
  Mail,
  LogOut,
} from "lucide-react";
import { authApi } from "../api/auth";
import BrandLogo from "./BrandLogo";
import "../styles/admin.css";

const NAV = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={16} /> },
      { label: "Analytics", path: "/admin/analytics", icon: <BarChart2 size={16} /> },
    ],
  },
  {
    section: "Content",
    items: [
      { label: "Blog Posts", path: "/admin/blogs", icon: <FileText size={16} /> },
      { label: "Case Studies", path: "/admin/case-studies", icon: <FolderKanban size={16} /> },
    ],
  },
  {
    section: "CRM",
    items: [
      { label: "Leads", path: "/admin/leads", icon: <Users size={16} /> },
      { label: "Subscribers", path: "/admin/subscribers", icon: <Mail size={16} /> },
    ],
  },
];

interface Props {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({ children, title, actions }: Props) {
  const { pathname } = useLocation();

  function isActive(path: string) {
    if (path === "/admin") return pathname === "/admin";
    return pathname.startsWith(path);
  }

  function handleLogout() {
    authApi.logout();
    window.location.href = "/login";
  }

  return (
    <div className="adm-layout">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <BrandLogo size={32} />
          <div>
            <div className="adm-sidebar__brand-name">AIRAT<span>PULSE</span></div>
            <div className="adm-sidebar__badge">Admin</div>
          </div>
        </div>

        <nav className="adm-sidebar__nav">
          {NAV.map((section) => (
            <div key={section.section} className="adm-nav-section">
              <div className="adm-nav-section__label">{section.section}</div>
              {section.items.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`adm-nav-link${isActive(item.path) ? " active" : ""}`}
                >
                  <span className="adm-nav-icon">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <button className="adm-nav-link danger" onClick={handleLogout} style={{ width: "100%" }}>
            <span className="adm-nav-icon"><LogOut size={16} /></span>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="adm-main">
        {(title || actions) && (
          <div className="adm-topbar">
            <div className="adm-topbar__title">{title}</div>
            {actions && <div className="adm-topbar__actions">{actions}</div>}
          </div>
        )}
        <div className="adm-content">{children}</div>
      </main>
    </div>
  );
}
