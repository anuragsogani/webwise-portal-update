import { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles/demo-cyber-page.css';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

// --- Types ---
type TabType = 'dashboard' | 'alerts' | 'pending-actions';
type TimeRange = 'Last 24h' | 'Last 7 Days' | 'Last 30 Days';

// --- Mock Triage Performance Data ---
const TRIAGE_PERFORMANCE_24H = [
  { label: '00:00', autoTriage: 82, analystTriage: 64, falsePositive: 16 },
  { label: '04:00', autoTriage: 85, analystTriage: 66, falsePositive: 15 },
  { label: '08:00', autoTriage: 88, analystTriage: 70, falsePositive: 14 },
  { label: '12:00', autoTriage: 90, analystTriage: 72, falsePositive: 13 },
  { label: '16:00', autoTriage: 91, analystTriage: 73, falsePositive: 12 },
  { label: '20:00', autoTriage: 89, analystTriage: 71, falsePositive: 13 },
  { label: '23:00', autoTriage: 92, analystTriage: 74, falsePositive: 11 },
];

const TRIAGE_PERFORMANCE_7D = [
  { label: 'Day 1', autoTriage: 84, analystTriage: 66, falsePositive: 15 },
  { label: 'Day 2', autoTriage: 86, analystTriage: 68, falsePositive: 14 },
  { label: 'Day 3', autoTriage: 87, analystTriage: 69, falsePositive: 13 },
  { label: 'Day 4', autoTriage: 88, analystTriage: 70, falsePositive: 13 },
  { label: 'Day 5', autoTriage: 89, analystTriage: 71, falsePositive: 12 },
  { label: 'Day 6', autoTriage: 90, analystTriage: 72, falsePositive: 12 },
  { label: 'Day 7', autoTriage: 91, analystTriage: 73, falsePositive: 11 },
];

const TRIAGE_PERFORMANCE_30D = [
  { label: 'Week 1', autoTriage: 80, analystTriage: 62, falsePositive: 18 },
  { label: 'Week 2', autoTriage: 83, analystTriage: 64, falsePositive: 17 },
  { label: 'Week 3', autoTriage: 86, analystTriage: 67, falsePositive: 15 },
  { label: 'Week 4', autoTriage: 89, analystTriage: 70, falsePositive: 13 },
];

interface AiratMetrics {
  totalAlerts: number;
  highConfidence: number;
  falsePositives: number;
  mttr: string;
}

interface Alert {
  id: string;
  title: string;
  detected: string;
  systems: number;
  severity: string;
  status: string;
  aiConfidence: number;
}

interface HitlAction {
  actionId: string;
  alertId: string;
  actionType: string;
  target: string;
  riskLevel: 'immediate' | 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected' | 'executed' | 'failed' | 'expired';
  requestedAt: string;
  expiresAt: string;
}

// --- Icons (Inline SVGs) ---
const DashboardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
);
const BellIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);
const UserCheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
);
const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.4167 2.4165H5.08333C2.60782 2.4165 0.75 4.20653 0.75 6.74984" /><path d="M1.08333 11.0835H8.41667C10.8922 11.0835 12.75 9.29347 12.75 6.75016" /><path d="M11.083 0.75C11.083 0.75 12.7497 1.97748 12.7497 2.41668C12.7497 2.85588 11.083 4.08333 11.083 4.08333" /><path d="M2.41665 9.4165C2.41665 9.4165 0.750004 10.644 0.75 11.0832C0.749996 11.5224 2.41667 12.7498 2.41667 12.7498" /></svg>
);
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

// --- Main Component ---
export default function AiratDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('Last 7 Days');

  // Data States
  const [metrics, setMetrics] = useState<AiratMetrics | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [pendingActions, setPendingActions] = useState<HitlAction[]>([]);

  // UI States
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);

    try {
      // Mock Network Delay
      await new Promise(res => setTimeout(res, 800));

      // Mock Metrics
      setMetrics({
        totalAlerts: 1248,
        highConfidence: 89,
        falsePositives: 12,
        mttr: '4m 12s'
      });

      // Mock Alerts
      setAlerts(Array.from({ length: 15 }).map((_, i) => ({
        id: `ALT-${1000 + i}`,
        title: `Suspicious Process Execution on Host-${i + 1}`,
        detected: new Date(Date.now() - (i * 3600000)).toLocaleString(),
        systems: Math.floor(Math.random() * 5) + 1,
        severity: ['Critical', 'High', 'Medium', 'Low'][i % 4],
        status: ['Triage', 'Resolved', 'In Progress'][i % 3],
        aiConfidence: Math.floor(Math.random() * 30) + 70, // 70-99
      })));

      // Mock HITL Actions
      setPendingActions(Array.from({ length: 6 }).map((_, i) => ({
        actionId: `ACT-${5000 + i}`,
        alertId: `ALT-${1000 + i}`,
        actionType: ['Isolate Host', 'Block IP', 'Disable Account'][i % 3],
        target: `192.168.1.${10 + i}`,
        riskLevel: ['immediate', 'high', 'medium', 'low'][i % 4] as any,
        status: 'pending',
        requestedAt: new Date(Date.now() - 1800000).toLocaleString(),
        expiresAt: new Date(Date.now() + 3600000).toLocaleString(),
      })));

    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [timeRange]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- Handlers ---
  const handleApprove = (actionId: string) => alert(`Approving Action: ${actionId}`);
  const handleReject = (actionId: string) => alert(`Rejecting Action: ${actionId}`);
  const handleExport = () => alert('Exporting data to CSV...');

  // --- Helpers ---
  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getConfidenceStyle = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case 'immediate': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-amber-400 text-amber-950';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const triagePerformanceData = useMemo(() => {
    switch (timeRange) {
      case 'Last 24h':
        return TRIAGE_PERFORMANCE_24H;
      case 'Last 7 Days':
        return TRIAGE_PERFORMANCE_7D;
      case 'Last 30 Days':
      default:
        return TRIAGE_PERFORMANCE_30D;
    }
  }, [timeRange]);

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 font-sans">

      {/* Header & Navigation */}
      <div className="bg-white border-b border-blue-100 sticky top-0 z-20 shadow-sm px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-blue-950">Airat AI Dashboard</h1>

          <div className="hidden md:flex bg-slate-100 p-1 rounded-lg" data-guide-id="cyber-airat-tabs">
            {(['dashboard', 'alerts', 'pending-actions'] as TabType[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${activeTab === tab ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab === 'dashboard' && <DashboardIcon />}
                {tab === 'alerts' && <BellIcon />}
                {tab === 'pending-actions' && <UserCheckIcon />}
                {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                {tab === 'pending-actions' && pendingActions.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{pendingActions.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex bg-white border border-blue-200 rounded-lg p-1 overflow-hidden shrink-0" data-guide-id="cyber-airat-time">
            {(['Last 24h', 'Last 7 Days', 'Last 30 Days'] as TimeRange[]).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded ${timeRange === range ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center justify-center w-9 h-9 shrink-0 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm disabled:opacity-70"
          >
            <RefreshIcon />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6">
        {loading && !isRefreshing ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && metrics && (
              <div className="space-y-6 animate-fadeIn">

                {/* Metrics Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-guide-id="cyber-airat-metrics">
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Analyzed Alerts</p>
                    <p className="text-3xl font-bold text-blue-950">{metrics.totalAlerts}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">High Confidence Triage</p>
                    <div className="flex items-end gap-2">
                      <p className="text-3xl font-bold text-emerald-600">{metrics.highConfidence}%</p>
                      <p className="text-sm text-emerald-600 mb-1 font-medium bg-emerald-50 px-2 py-0.5 rounded">+4.2%</p>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">False Positives Reduced</p>
                    <p className="text-3xl font-bold text-blue-600">{metrics.falsePositives}%</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm">
                    <p className="text-sm font-medium text-slate-500 mb-1">Avg. MTTR (Airat Assist)</p>
                    <p className="text-3xl font-bold text-blue-950">{metrics.mttr}</p>
                  </div>
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Triage Performance Chart */}
                  <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-blue-100 shadow-sm min-h-[350px] flex flex-col" data-guide-id="cyber-airat-chart">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-base font-semibold text-slate-800">Airat Triage Performance</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Auto vs analyst triage quality and false positive rate.
                        </p>
                      </div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {timeRange}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <ResponsiveContainer width="100%" height={260}>
                        <AreaChart
                          data={triagePerformanceData.map((point) => ({
                            ...point,
                            truePositiveGap: point.autoTriage - point.analystTriage,
                          }))}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="triageAuto" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="triageAnalyst" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.45} />
                              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.04} />
                            </linearGradient>
                            <linearGradient id="triageFalsePositive" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.5} />
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="label"
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            stroke="#e2e8f0"
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 11, fill: '#94a3b8' }}
                            stroke="#e2e8f0"
                            tickLine={false}
                            axisLine={false}
                            domain={[50, 100]}
                            tickFormatter={(v) => `${v}%`}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#ffffff',
                              border: '1px solid #e2e8f0',
                              borderRadius: 8,
                              fontSize: 11,
                              color: '#334155',
                              padding: '8px 12px',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            }}
                            labelStyle={{
                              color: '#1e293b',
                              fontWeight: 'bold',
                              marginBottom: 4,
                            }}
                            formatter={(value: any, name: any) => [
                              `${Number(value).toFixed(1)}%`,
                              name,
                            ]}
                          />
                          <Legend
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                          />
                          <Area
                            type="monotone"
                            dataKey="autoTriage"
                            name="AI auto-triage (high confidence)"
                            stroke="#22c55e"
                            strokeWidth={1.8}
                            fill="url(#triageAuto)"
                            dot={false}
                            activeDot={{ r: 3 }}
                            isAnimationActive={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="analystTriage"
                            name="Human analyst triage"
                            stroke="#2563eb"
                            strokeWidth={1.6}
                            fill="url(#triageAnalyst)"
                            dot={false}
                            activeDot={{ r: 3 }}
                            isAnimationActive={false}
                          />
                          <Area
                            type="monotone"
                            dataKey="falsePositive"
                            name="False positive rate"
                            stroke="#f97316"
                            strokeWidth={1.6}
                            fill="url(#triageFalsePositive)"
                            dot={false}
                            activeDot={{ r: 3 }}
                            isAnimationActive={false}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                        <span>
                          Showing triage quality over {timeRange.toLowerCase()}.
                        </span>
                        <span className="hidden sm:inline">
                          Values are illustrative sample data for demo purposes.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col" data-guide-id="cyber-airat-actions">
                    <h3 className="text-base font-semibold text-slate-800 mb-4">Recent Automated Actions</h3>
                    <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="flex items-start gap-3 pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                          <div className="mt-0.5 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Isolated Host 192.168.1.{i * 12}</p>
                            <p className="text-xs text-slate-500 mt-0.5">Airat resolved ALT-100{i} with 98% confidence.</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- ALERTS TAB --- */}
            {activeTab === 'alerts' && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden animate-fadeIn" data-guide-id="cyber-airat-alerts-table">
                <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between gap-4 bg-blue-50/30">
                  <input
                    type="text"
                    placeholder="Search AI triaged alerts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-md bg-white text-sm"
                  />
                  <button onClick={handleExport} className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                    <DownloadIcon /> Export CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                        <th className="px-6 py-4 font-semibold text-sm">Alert ID</th>
                        <th className="px-6 py-4 font-semibold text-sm">Title</th>
                        <th className="px-6 py-4 font-semibold text-sm">Detected</th>
                        <th className="px-6 py-4 font-semibold text-sm">Severity</th>
                        <th className="px-6 py-4 font-semibold text-sm">Status</th>
                        <th className="px-6 py-4 font-semibold text-sm" data-guide-id="cyber-airat-confidence">Airat Confidence</th>
                        <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {alerts.map((row) => (
                        <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-blue-600 whitespace-nowrap cursor-pointer hover:underline">{row.id}</td>
                          <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate" title={row.title}>{row.title}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{row.detected}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyle(row.severity)}`}>{row.severity}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-700">{row.status}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getConfidenceStyle(row.aiConfidence)}`}>{row.aiConfidence}%</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                            <button className="text-blue-600 font-medium hover:text-blue-800 hover:underline px-3 py-1 bg-white border border-blue-100 rounded shadow-sm">Review</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- PENDING ACTIONS TAB --- */}
            {activeTab === 'pending-actions' && (
              <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden animate-fadeIn" data-guide-id="cyber-airat-approvals">
                <div className="p-5 border-b border-blue-100 bg-blue-50/30">
                  <h2 className="text-lg font-semibold text-blue-900">Human-in-the-Loop Approvals</h2>
                  <p className="text-sm text-slate-500 mt-1">Airat requires manual authorization before executing these critical remediation actions.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="px-6 py-4 font-semibold text-sm">Action ID</th>
                        <th className="px-6 py-4 font-semibold text-sm">Related Alert</th>
                        <th className="px-6 py-4 font-semibold text-sm">Proposed Action</th>
                        <th className="px-6 py-4 font-semibold text-sm">Target</th>
                        <th className="px-6 py-4 font-semibold text-sm" data-guide-id="cyber-airat-risk">Risk Level</th>
                        <th className="px-6 py-4 font-semibold text-sm text-center" data-guide-id="cyber-airat-approve-btns">Authorization</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pendingActions.map((action) => (
                        <tr key={action.actionId} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{action.actionId}</td>
                          <td className="px-6 py-4 text-sm text-blue-600 hover:underline cursor-pointer">{action.alertId}</td>
                          <td className="px-6 py-4 text-sm text-slate-800 font-semibold">{action.actionType}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 font-mono">{action.target}</td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${getRiskStyle(action.riskLevel)}`}>{action.riskLevel}</span>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={() => handleApprove(action.actionId)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors font-medium shadow-sm"
                              >
                                <CheckIcon /> Approve
                              </button>
                              <button
                                onClick={() => handleReject(action.actionId)}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded hover:bg-slate-50 transition-colors font-medium shadow-sm"
                              >
                                <XIcon /> Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}   
