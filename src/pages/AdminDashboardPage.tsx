import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, FolderKanban, Users, Mail, BarChart2, ArrowRight, RefreshCw } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { authApi } from "../api/auth";
import { getApiBaseUrl } from "../lib/apiBaseUrl";

function api(path: string) { return `${getApiBaseUrl()}${path}`; }
function authHdr() { return { Authorization: `Bearer ${authApi.getToken() ?? ""}` }; }

interface Stats {
  blogs: { total: number; published: number; drafts: number };
  caseStudies: number;
  leads: number;
  subscribers: number;
  pageViews: number;
  totalEvents: number;
}

const QUICK_LINKS = [
  { label: "New Blog Post", path: "/admin/blogs/new", icon: <FileText size={16} />, accent: true },
  { label: "New Case Study", path: "/admin/case-studies/new", icon: <FolderKanban size={16} /> },
  { label: "View Leads", path: "/admin/leads", icon: <Users size={16} /> },
  { label: "Analytics", path: "/admin/analytics", icon: <BarChart2 size={16} /> },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [blogsRes, csRes, leadsRes, subsRes, summaryRes] = await Promise.all([
        fetch(api("/blogs/admin"), { headers: authHdr() }),
        fetch(api("/case-studies")),
        fetch(api("/leads?limit=1"), { headers: authHdr() }),
        fetch(api("/subscribers"), { headers: authHdr() }),
        fetch(api("/events/summary?days=30"), { headers: authHdr() }),
      ]);

      const blogs = blogsRes.ok ? await blogsRes.json() : { blogs: [], count: 0 };
      const cs = csRes.ok ? await csRes.json() : { count: 0 };
      const leads = leadsRes.ok ? await leadsRes.json() : { count: 0 };
      const subs = subsRes.ok ? await subsRes.json() : [];
      const summary = summaryRes.ok ? await summaryRes.json() : {};

      const blogList: any[] = blogs.blogs ?? [];
      const totalPageViews = (summary.total_by_type ?? []).find((r: any) => r.event_type === "page_view")?.total ?? 0;
      const totalEvents = (summary.total_by_type ?? []).reduce((s: number, r: any) => s + (r.total ?? 0), 0);

      setStats({
        blogs: {
          total: blogList.length,
          published: blogList.filter((b: any) => b.status === "published").length,
          drafts: blogList.filter((b: any) => b.status === "draft").length,
        },
        caseStudies: cs.count ?? 0,
        leads: leads.count ?? 0,
        subscribers: Array.isArray(subs) ? subs.length : 0,
        pageViews: totalPageViews,
        totalEvents,
      });
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const s = stats;

  return (
    <AdminLayout
      title="Dashboard"
      actions={
        <button className="adm-btn adm-btn--ghost adm-btn--sm" onClick={load}>
          <RefreshCw size={14} className={loading ? "adm-spin" : ""} /> Refresh
        </button>
      }
    >
      {/* Stats */}
      <div className="adm-stats">
        <div className="adm-stat adm-stat--accent">
          <div className="adm-stat__icon"><BarChart2 size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.pageViews ?? 0}</div>
          <div className="adm-stat__label">Page Views (30d)</div>
        </div>
        <div className="adm-stat adm-stat--green">
          <div className="adm-stat__icon"><Users size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.leads ?? 0}</div>
          <div className="adm-stat__label">Leads Captured</div>
        </div>
        <div className="adm-stat adm-stat--yellow">
          <div className="adm-stat__icon"><FileText size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.blogs.published ?? 0}</div>
          <div className="adm-stat__label">Published Posts</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><FileText size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.blogs.drafts ?? 0}</div>
          <div className="adm-stat__label">Drafts in Queue</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><FolderKanban size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.caseStudies ?? 0}</div>
          <div className="adm-stat__label">Case Studies</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat__icon"><Mail size={20} /></div>
          <div className="adm-stat__value">{loading ? "—" : s?.subscribers ?? 0}</div>
          <div className="adm-stat__label">Subscribers</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="adm-card" style={{ marginBottom: 24 }}>
        <div className="adm-card__title">Quick Actions</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`adm-btn${l.accent ? " adm-btn--primary" : ""}`}
            >
              {l.icon} {l.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation tiles */}
      <div className="adm-panel-grid">
        {[
          {
            icon: <FileText size={24} />,
            title: "Blog Management",
            desc: `${s?.blogs.total ?? 0} posts — ${s?.blogs.drafts ?? 0} drafts queued`,
            path: "/admin/blogs",
          },
          {
            icon: <FolderKanban size={24} />,
            title: "Case Studies",
            desc: `${s?.caseStudies ?? 0} case studies in portfolio`,
            path: "/admin/case-studies",
          },
          {
            icon: <Users size={24} />,
            title: "Leads & CRM",
            desc: `${s?.leads ?? 0} contact submissions captured`,
            path: "/admin/leads",
          },
          {
            icon: <Mail size={24} />,
            title: "Subscribers",
            desc: `${s?.subscribers ?? 0} active newsletter subscribers`,
            path: "/admin/subscribers",
          },
          {
            icon: <BarChart2 size={24} />,
            title: "Analytics",
            desc: `${s?.totalEvents ?? 0} events tracked in last 30 days`,
            path: "/admin/analytics",
          },
        ].map((tile) => (
          <Link
            key={tile.path}
            to={tile.path}
            style={{ textDecoration: "none" }}
          >
            <div className="adm-card" style={{ cursor: "pointer", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(0,229,255,0.4)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <div style={{ color: "var(--adm-accent)", marginBottom: 12 }}>{tile.icon}</div>
              <div style={{ fontWeight: 700, color: "#fff", marginBottom: 4 }}>{tile.title}</div>
              <div style={{ fontSize: 12, color: "var(--adm-muted)", marginBottom: 12 }}>{tile.desc}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--adm-accent)" }}>
                Open <ArrowRight size={12} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
