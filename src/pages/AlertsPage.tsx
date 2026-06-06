
import React, { useState, useEffect, useCallback } from 'react';
import { SeverityBadge } from '../components/cyber/SeverityBadge';
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
interface AlertElement {
  id: string;
  title: string;
  severity: string;
  host: string;
  timestamp: string;
  timestampMs: number;
}

interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
  info: number;
}

interface AppliedFilter {
  id: string;
  fieldName: string;
  operator: string;
  value: string;
}

// --- Icons (Inline SVGs) ---
const RefreshIcon = () => (
  <svg width="15" height="15" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.4167 2.4165H5.08333C2.60782 2.4165 0.75 4.20653 0.75 6.74984" />
    <path d="M1.08333 11.0835H8.41667C10.8922 11.0835 12.75 9.29347 12.75 6.75016" />
    <path d="M11.083 0.75C11.083 0.75 12.7497 1.97748 12.7497 2.41668C12.7497 2.85588 11.083 4.08333 11.083 4.08333" />
    <path d="M2.41665 9.4165C2.41665 9.4165 0.750004 10.644 0.75 11.0832C0.749996 11.5224 2.41667 12.7498 2.41667 12.7498" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3L3 9M3 3L9 9" />
  </svg>
);

interface AlertsPageProps {
  severityFilter?: string;
}

// --- Main Component ---
export default function AlertsPage({ severityFilter = 'All Levels' }: AlertsPageProps) {
  // State Management
  const [data, setData] = useState<AlertElement[]>([]);
  const [severityCounts, setSeverityCounts] = useState<SeverityCounts>({ critical: 0, high: 0, medium: 0, low: 0, info: 0 });
  const [totalItems, setTotalItems] = useState(0);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([
    { id: '1', fieldName: 'Agent ID', operator: 'is', value: 'AGT-001' } // Mock initial filter
  ]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState('-Timestamp');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<AlertElement | null>(null);

  // Timeline chart data
  const [timelineBuckets, setTimelineBuckets] = useState<
    { label: string; total: number; critical: number; high: number }[]
  >([]);

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // MOCK API DELAY
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK RESPONSE
      const now = Date.now();
      const titleTemplates = [
        'Multiple failed login attempts detected on {host}',
        'Suspicious admin privilege escalation on {host}',
        'Malware signature match detected on {host}',
        'Unusual outbound traffic volume from {host}',
        'Brute-force attempt on SSH service for {host}',
      ];
      const hostPool = [
        '10.0.1.10',
        '10.0.1.24',
        '10.0.2.5',
        '10.1.0.8',
        'auth-gateway-1',
        'payment-api-2',
        'db-core-01',
      ];

      const pickSeverity = () => {
        const r = Math.random();
        if (r < 0.05) return 'Critical';
        if (r < 0.20) return 'High';
        if (r < 0.60) return 'Medium';
        if (r < 0.85) return 'Low';
        return 'Info';
      };

      const docs: AlertElement[] = Array.from({ length: pageSize }).map((_, i) => {
        const host = hostPool[i % hostPool.length];
        const template = titleTemplates[i % titleTemplates.length];
        const severity = pickSeverity();
        // Spread alerts over the last 24 hours so the timeline always has activity
        const offsetMs = Math.floor(Math.random() * 24) * 60 * 60 * 1000; // last 24h
        const tsMs = now - offsetMs;

        return {
          id: `ALR-${2000 + (page - 1) * pageSize + i}`,
          title: template.replace('{host}', host),
          severity,
          host,
          timestampMs: tsMs,
          timestamp: new Date(tsMs).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
          }),
        };
      });

      // Severity counts derived from data
      const counts: SeverityCounts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
      docs.forEach((d) => {
        switch (d.severity) {
          case 'Critical':
            counts.critical += 1;
            break;
          case 'High':
            counts.high += 1;
            break;
          case 'Medium':
            counts.medium += 1;
            break;
          case 'Low':
            counts.low += 1;
            break;
          default:
            counts.info += 1;
            break;
        }
      });

      // Build timeline buckets for last 24 hours
      const bucketCount = 24;
      const buckets = Array.from({ length: bucketCount }).map((_, idx) => {
        const bucketTime = new Date(now - idx * 60 * 60 * 1000);
        const label = bucketTime.toLocaleTimeString(undefined, {
          hour: '2-digit',
          minute: '2-digit',
        });
        return { label, total: 0, critical: 0, high: 0 };
      });

      docs.forEach((d) => {
        const hoursAgo = Math.floor((now - d.timestampMs) / (60 * 60 * 1000));
        if (hoursAgo >= 0 && hoursAgo < bucketCount) {
          buckets[hoursAgo].total += 1;
          if (d.severity === 'Critical') buckets[hoursAgo].critical += 1;
          if (d.severity === 'High') buckets[hoursAgo].high += 1;
        }
      });

      // Reverse so newest (Now) is on the right
      setTimelineBuckets(buckets.reverse());

      setData(docs);
      setTotalItems(245);
      setSeverityCounts(counts);
    } catch (err) {
      setError('Failed to load alerts data. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [page, pageSize, sort, searchQuery]);

  // Initial Load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- Handlers ---
  const handleSort = (column: string) => {
    setSort(prevSort => prevSort === column ? `-${column}` : column);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const removeFilter = (id: string) => {
    setAppliedFilters(prev => prev.filter(f => f.id !== id));
    setPage(1);
    loadData();
  };

  const clearAllFilters = () => {
    setAppliedFilters([]);
    setPage(1);
    loadData();
  };

  const handleView = (element: AlertElement) => {
    setSelectedAlert(element);
  };

  const closeViewPopup = () => {
    setSelectedAlert(null);
  };

  const downloadCsv = () => {
    if (!data || data.length === 0) {
      alert('No data to export.');
      return;
    }

    const headers = ['ID', 'Title', 'Severity', 'Host', 'Timestamp'];
    const escapeCsv = (v: any) => `"${String(v || '').replace(/"/g, '""')}"`;

    const rows = data.map((d) =>
      [
        escapeCsv(d.id),
        escapeCsv(d.title),
        escapeCsv(d.severity),
        escapeCsv(d.host),
        escapeCsv(d.timestamp),
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `alerts_${date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const buildAlertNarrative = (alert: AlertElement) => {
    return `Alert ${alert.id} was generated from ${alert.host} with severity ${alert.severity}. Detection engine observed activity matching the rule: "${alert.title}". This event was captured at ${alert.timestamp} and should be reviewed for potential compromise.`;
  };

  const filteredData =
    severityFilter && severityFilter !== 'All Levels'
      ? data.filter((row) => row.severity === severityFilter)
      : data;

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950 mb-4 md:mb-0">Alerts</h1>
        <button
          data-guide-id="cyber-alert-refresh"
          onClick={() => loadData(true)}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm disabled:opacity-70 font-medium"
        >
          {isRefreshing ? 'Loading...' : <><RefreshIcon /> Refresh</>}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center text-red-700">
          <span>{error}</span>
          <div className="flex gap-3">
            <button onClick={() => loadData()} className="font-semibold underline">Retry</button>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-800">Dismiss</button>
          </div>
        </div>
      )}

      {/* Loader Overlay */}
      {loading && !isRefreshing && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && (
        <>
          {/* Top Section: Severities and Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Severity Cards */}
            <div className="lg:col-span-1 grid grid-cols-2 gap-4" data-guide-id="cyber-alert-pills">
              {[
                { label: 'Critical', count: severityCounts.critical, bg: 'bg-red-100 text-red-700' },
                { label: 'High', count: severityCounts.high, bg: 'bg-orange-100 text-orange-700' },
                { label: 'Medium', count: severityCounts.medium, bg: 'bg-yellow-100 text-yellow-700' },
                { label: 'Low', count: severityCounts.low, bg: 'bg-emerald-100 text-emerald-700' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col justify-between relative min-h-[100px]">
                  <p className="text-sm font-medium text-slate-500">{item.label}</p>
                  <p className="text-3xl font-bold text-blue-950 mt-2">{item.count}</p>
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${item.bg}`}>
                    {item.label.charAt(0)}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Chart */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-blue-100 shadow-sm flex flex-col" data-guide-id="cyber-alert-chart">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-slate-800">Alerts Timeline</h3>
                <span className="text-xs text-slate-400 font-medium">Last 24 hours</span>
              </div>
              {timelineBuckets.length === 0 || timelineBuckets.every((b) => b.total === 0) ? (
                <div className="flex-1 flex items-center justify-center bg-slate-50 border border-dashed border-slate-200 rounded-lg min-h-[200px]">
                  <span className="text-slate-400 font-medium">No recent alerts activity</span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart
                      data={timelineBuckets.map((b) => {
                        const others = Math.max(
                          0,
                          b.total - b.critical - b.high
                        );
                        return {
                          time: b.label,
                          critical: b.critical,
                          high: b.high,
                          others,
                        };
                      })}
                      margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="alertsCritical" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="alertsHigh" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f97316" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                        </linearGradient>
                        <linearGradient id="alertsOthers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#e2e8f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="time"
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        stroke="#e2e8f0"
                        interval={3}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                        stroke="#e2e8f0"
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 8,
                          fontSize: 11,
                          color: "#334155",
                          padding: "8px 12px",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                        labelStyle={{
                          color: "#1e293b",
                          fontWeight: "bold",
                          marginBottom: 4,
                        }}
                      />
                      <Legend
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="critical"
                        name="Critical"
                        stroke="#ef4444"
                        strokeWidth={1.6}
                        fill="url(#alertsCritical)"
                        dot={false}
                        activeDot={{ r: 3 }}
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="high"
                        name="High"
                        stroke="#f97316"
                        strokeWidth={1.6}
                        fill="url(#alertsHigh)"
                        dot={false}
                        activeDot={{ r: 3 }}
                        isAnimationActive={false}
                      />
                      <Area
                        type="monotone"
                        dataKey="others"
                        name="Others"
                        stroke="#2563eb"
                        strokeWidth={1.6}
                        fill="url(#alertsOthers)"
                        dot={false}
                        activeDot={{ r: 3 }}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>

          {/* Applied Filters Container */}
          {appliedFilters.length > 0 && (
            <div className="mb-6" data-guide-id="cyber-alert-filter-tags">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-slate-700">Applied Filters:</span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-medium text-blue-600 bg-white border border-blue-200 px-3 py-1.5 rounded hover:bg-blue-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {appliedFilters.map(filter => (
                  <div key={filter.id} className="flex items-center gap-2 bg-white border border-blue-100 px-3 py-1.5 rounded-md shadow-sm text-sm">
                    <span className="font-semibold text-blue-600">{filter.fieldName}</span>
                    <span className="text-blue-500">{filter.operator}</span>
                    <span className="text-blue-800 max-w-[200px] truncate">{filter.value}</span>
                    <button onClick={() => removeFilter(filter.id)} className="ml-1 text-slate-400 hover:text-slate-700 transition-colors">
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-alerts-table">

            {/* Table Toolbar */}
            <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between gap-4 bg-blue-50/30">
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-md"
              />
              <button
                onClick={downloadCsv}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <DownloadIcon /> Export CSV
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('ID')}>ID</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Title')}>Title</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Severity')}>Severity</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Host')}>Host</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Timestamp')}>Timestamp</th>
                    <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{row.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 max-w-sm truncate" title={row.title}>
                          {row.title}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <SeverityBadge severity={row.severity} />
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.host || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{row.timestamp}</td>
                        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                          <button
                            onClick={() => handleView(row)}
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline px-3 py-1 bg-white border border-blue-100 rounded shadow-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                        No Alerts Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredData.length > 0 && (
              <div className="px-6 py-4 border-t border-blue-100 flex items-center justify-between bg-white">
                <div className="text-sm text-slate-500">
                  Showing <span className="font-medium text-slate-800">{((page - 1) * pageSize) + 1}</span> to <span className="font-medium text-slate-800">{Math.min(page * pageSize, totalItems)}</span> of <span className="font-medium text-slate-800">{totalItems}</span> results
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 border border-blue-200 rounded text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page * pageSize >= totalItems}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 border border-blue-200 rounded text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Alert Detail Popup */}
          {selectedAlert && (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="alert-detail-title"
            >
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={closeViewPopup}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-2xl bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden" data-guide-id="cyber-alert-detail-panel">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                      Alert Detail
                    </p>
                    <h2
                      id="alert-detail-title"
                      className="text-base font-semibold text-slate-900 mt-0.5"
                    >
                      {selectedAlert.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={closeViewPopup}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                    aria-label="Close"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Alert ID
                      </p>
                      <p className="font-mono text-slate-900">{selectedAlert.id}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Severity
                      </p>
                      <SeverityBadge severity={selectedAlert.severity} size="sm" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Host
                      </p>
                      <p className="text-slate-900">{selectedAlert.host}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Timestamp
                      </p>
                      <p className="text-slate-900">{selectedAlert.timestamp}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Narrative
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {buildAlertNarrative(selectedAlert)}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Raw log excerpt
                    </p>
                    <pre className="bg-slate-900 text-[11px] text-slate-100 rounded-lg p-3 overflow-x-auto">
                      {`[${selectedAlert.timestamp}] host=${selectedAlert.host} severity=${selectedAlert.severity.toUpperCase()} id=${selectedAlert.id}
message="${selectedAlert.title}" source=hawk-ai-pipeline rule_id=auth-anomaly-004`}
                    </pre>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeViewPopup}
                    className="px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
