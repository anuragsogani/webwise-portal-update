
import { useMemo } from "react";
import {
  ShieldAlert,
  Bell,
  HardDrive,
  Crosshair,
  FileText,
  BrainCircuit,
  AlertTriangle,
  Activity,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/demo-cyber-page.css";

export type ModuleKey =
  | "Vulnerability"
  | "Alerts"
  | "Assets"
  | "Detection"
  | "Reports"
  | "AiRAT"
  | "Incidents";

export interface ModuleDetails {
  total: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
  sampleTitle: string | null;
}

export interface OverviewStats {
  totalThreats: number;
  bySeverity: {
    Critical: number;
    High: number;
    Medium: number;
    Low: number;
  };
  byModule: Record<ModuleKey, number>;
  incidentQueueCount: number;
  moduleDetails: Record<ModuleKey, ModuleDetails>;
}

interface OverviewDashboardProps {
  stats: OverviewStats;
}

// Enterprise muted color palette for semantic meaning
const COLORS = {
  critical: "#f43f5e", // rose-500
  high: "#f97316",     // orange-500
  medium: "#f59e0b",   // amber-500
  low: "#14b8a6",      // teal-500
  muted: "#d4d4d8",    // zinc-300
};

export default function OverviewDashboard({ stats }: OverviewDashboardProps) {
  const { totalThreats, bySeverity } = stats;

  // Calculate Global Threat Score
  const weightedScore =
    bySeverity.Critical * 1 +
    bySeverity.High * 0.7 +
    bySeverity.Medium * 0.4 +
    bySeverity.Low * 0.1;
  const maxPossible = totalThreats > 0 ? totalThreats * 1 : 1;
  const threatScore = totalThreats
    ? Math.min(100, Math.max(0, Math.round((weightedScore / maxPossible) * 100)))
    : 0;

  // Generate illustrative 24h trend data for the Alerts Chart based on your alertsPage.tsx
  const alertsTrendData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 23; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 3600000);
      data.push({
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        critical: Math.floor(Math.random() * 3),
        high: Math.floor(Math.random() * 8),
        total: Math.floor(Math.random() * 15) + 5,
      });
    }
    return data;
  }, []);

  return (
    <div className="cyber-ui xdr-ui min-h-full bg-[#fafafa] text-zinc-900 p-4 md:p-8 font-sans overflow-auto space-y-8">

      {/* --- HEADER --- */}
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div>
          <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase mb-1">
            Hawkeye Security Platform
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Environment Posture
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5 max-w-2xl">
            Real-time telemetry and aggregated risk metrics across all connected assets and detection engines.
          </p>
        </div>

        <div className="flex gap-4">
          <TopLevelKPI
            data-guide-id="cyber-threat-score"
            label="Global Threat Score"
            value={threatScore}
            icon={Activity}
            trend="+2.4%"
            trendUp={false}
          />
          <TopLevelKPI
            label="Total Findings"
            value={totalThreats}
            icon={Crosshair}
          />
        </div>
      </div>

      {/* --- FEATURED MODULE: ALERTS DEEP DIVE --- */}
      <div className="bg-white border border-zinc-200/80 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 border border-zinc-200">
              <Bell size={18} strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-zinc-900 tracking-tight">Alert Stream Analysis</h2>
              <p className="text-xs text-zinc-500 mt-0.5">245 total alerts generated over the last 24 hours.</p>
            </div>
          </div>
          <button className="text-xs font-medium text-zinc-500 hover:text-zinc-900 transition-colors flex items-center gap-1">
            View All Alerts <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">

          {/* Chart Section */}
          <div className="lg:col-span-3 p-6 flex flex-col">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">24-Hour Ingestion Trend</h3>
              <div className="flex gap-4 text-[11px] font-medium text-zinc-500">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-rose-500" /> Critical</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500" /> High</span>
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-200" /> Baseline</span>
              </div>
            </div>

            <div className="flex-1 min-h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={alertsTrendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCrit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.critical} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS.critical} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.high} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={COLORS.high} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.muted} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={COLORS.muted} stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} minTickGap={30} />
                  <YAxis tick={{ fontSize: 10, fill: "#a1a1aa" }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', fontSize: '12px' }}
                    cursor={{ stroke: '#e4e4e7', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="total" stroke={COLORS.muted} strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="high" stroke={COLORS.high} strokeWidth={2} fillOpacity={1} fill="url(#colorHigh)" />
                  <Area type="monotone" dataKey="critical" stroke={COLORS.critical} strokeWidth={2} fillOpacity={1} fill="url(#colorCrit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Details Sidebar */}
          <div className="p-6 bg-zinc-50/30 flex flex-col gap-6" data-guide-id="cyber-severity-cards">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Top Impacted Hosts</h3>
              <div className="space-y-3">
                <HostRow ip="10.0.1.10" label="auth-gateway-1" count={42} />
                <HostRow ip="10.0.1.24" label="payment-api-2" count={28} />
                <HostRow ip="10.1.0.8" label="db-core-01" count={15} />
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3">Recent Rule Triggers</h3>
              <div className="space-y-2">
                <p className="text-xs font-medium text-zinc-700 truncate border-l-2 border-rose-400 pl-2">Malware signature match detected</p>
                <p className="text-xs font-medium text-zinc-700 truncate border-l-2 border-orange-400 pl-2">Multiple failed login attempts</p>
                <p className="text-xs font-medium text-zinc-700 truncate border-l-2 border-amber-400 pl-2">Suspicious admin escalation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SECONDARY BENTO GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" data-guide-id="cyber-module-grid">

        {/* Vulnerabilities */}
        <BentoCard title="Vulnerabilities" icon={ShieldAlert} value="128" subtext="Active Exposures">
          <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
            Prioritize tracking for <span className="font-semibold text-zinc-700">OpenSSL (CVE-2026-10234)</span>, Apache HTTP request smuggling, and Spring Boot deserialization endpoints.
          </p>
          <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-zinc-100 mb-2">
            <div style={{ width: '15%' }} className="bg-rose-500" />
            <div style={{ width: '30%' }} className="bg-orange-500" />
            <div style={{ width: '35%' }} className="bg-amber-400" />
            <div style={{ width: '20%' }} className="bg-teal-500" />
          </div>
          <div className="flex justify-between text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            <span>Crit 15%</span>
            <span>High 30%</span>
            <span>Med 35%</span>
          </div>
        </BentoCard>

        {/* AiRAT */}
        <BentoCard title="AiRAT Copilot" icon={BrainCircuit} value="1,248" subtext="Events Analyzed">
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Confidence</p>
              <p className="text-xl font-semibold text-teal-600">89%</p>
            </div>
            <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Avg MTTR</p>
              <p className="text-xl font-semibold text-zinc-800">4m 12s</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs font-medium border-t border-zinc-100 pt-3">
            <span className="text-zinc-500">Pending Approvals</span>
            <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">6 Actions</span>
          </div>
        </BentoCard>

        {/* Assets */}
        <BentoCard title="Asset Posture" icon={HardDrive} value="342" subtext="Tracked Endpoints">
          <div className="flex items-center gap-5 mb-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-md">
              <span className="text-lg font-bold text-white">78</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Global Risk Score</p>
              <p className="text-xs text-zinc-500 mt-0.5">Threat Score resting at 42.</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs border-t border-zinc-100 pt-3">
            <div><p className="font-semibold text-zinc-800">290</p><p className="text-zinc-400">Servers</p></div>
            <div><p className="font-semibold text-zinc-800">30</p><p className="text-zinc-400">Network</p></div>
            <div><p className="font-semibold text-zinc-800">1.2k</p><p className="text-zinc-400">Vulns</p></div>
          </div>
        </BentoCard>

        {/* Detection Rules */}
        <BentoCard title="Detection Rules" icon={Crosshair} value="86" subtext="Active Rulesets">
          <div className="space-y-3 mb-4 flex-1">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-1">Status</p>
                <p className="text-sm font-semibold text-teal-600">11.8k+ Enabled</p>
              </div>
              <p className="text-sm font-semibold text-zinc-400">30+ Disabled</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 mt-2">Top Mitre Tactics</p>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-medium">
                <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded">TA0006 Credential</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded">T1110 Brute Force</span>
                <span className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded">TA0008 Lateral</span>
              </div>
            </div>
          </div>
        </BentoCard>

        {/* Incidents */}
        <BentoCard title="Incidents" icon={AlertTriangle} value="145" subtext="Open Tickets">
          <p className="text-xs text-zinc-500 mb-4 leading-relaxed flex-1">
            Queues heavily impacted by unauthorized access attempts requiring investigator review.
          </p>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-rose-50 border border-rose-100 rounded py-1.5"><p className="text-sm font-bold text-rose-700">12</p><p className="text-[9px] font-bold uppercase tracking-wider text-rose-500">Crit</p></div>
            <div className="bg-orange-50 border border-orange-100 rounded py-1.5"><p className="text-sm font-bold text-orange-700">34</p><p className="text-[9px] font-bold uppercase tracking-wider text-orange-500">High</p></div>
            <div className="bg-amber-50 border border-amber-100 rounded py-1.5"><p className="text-sm font-bold text-amber-700">56</p><p className="text-[9px] font-bold uppercase tracking-wider text-amber-500">Med</p></div>
            <div className="bg-teal-50 border border-teal-100 rounded py-1.5"><p className="text-sm font-bold text-teal-700">43</p><p className="text-[9px] font-bold uppercase tracking-wider text-teal-500">Low</p></div>
          </div>
        </BentoCard>

        {/* Reports */}
        <BentoCard title="Reporting" icon={FileText} value="12" subtext="Total Deliverables">
          <div className="flex flex-col justify-center flex-1 space-y-3">
            <div className="flex justify-between items-center text-sm border-b border-zinc-100 pb-2">
              <span className="text-zinc-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> Scheduled</span>
              <span className="font-semibold text-zinc-800">3</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b border-zinc-100 pb-2">
              <span className="text-zinc-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> PDF Dashboards</span>
              <span className="font-semibold text-zinc-800">4</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-600 flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-zinc-300" /> CSV Extracts</span>
              <span className="font-semibold text-zinc-800">5</span>
            </div>
          </div>
        </BentoCard>

      </div>
    </div>
  );
}

// --- Subcomponents ---

function TopLevelKPI({ label, value, icon: Icon, trend, trendUp, ...props }: any) {
  return (
    <div className="flex items-center gap-4 bg-white border border-zinc-200/80 rounded-xl px-5 py-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)]" {...props}>
      <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 border border-zinc-200">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{label}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-2xl font-semibold text-zinc-900 leading-none">{value}</span>
          {trend && (
            <span className={`flex items-center text-xs font-medium ${trendUp === false ? 'text-rose-500' : 'text-teal-500'}`}>
              <TrendingUp size={12} className={`mr-0.5 ${trendUp === false ? 'rotate-180' : ''}`} /> {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function HostRow({ ip, label, count }: { ip: string, label: string, count: number }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-zinc-800 font-mono">{ip}</p>
        <p className="text-[10px] text-zinc-500">{label}</p>
      </div>
      <div className="text-right">
        <span className="text-xs font-bold text-zinc-700">{count}</span>
        <p className="text-[9px] uppercase tracking-wider text-zinc-400">Hits</p>
      </div>
    </div>
  );
}

function BentoCard({ title, icon: Icon, value, subtext, children }: any) {
  return (
    <div className="bg-white border border-zinc-200/80 rounded-2xl p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] flex flex-col hover:border-zinc-300 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <Icon size={18} className="text-zinc-400 group-hover:text-zinc-600 transition-colors" />
          <h2 className="text-sm font-semibold text-zinc-800">{title}</h2>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-zinc-900 leading-none">{value}</p>
          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest mt-1">{subtext}</p>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}
