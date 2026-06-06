import React, { useState, useEffect, useCallback } from 'react';

// --- Types ---
interface DetectionElement {
  id: string;
  title: string;
  severity: string;
  alert: string;
  status: string;
}

interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

interface StatusCounts {
  enabled: number;
  disabled: number;
}

interface TacticTechnique {
  id: string;
  name: string;
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

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const PowerIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" y1="2" x2="12" y2="12"></line>
  </svg>
);

interface DetectionPageProps {
  severityFilter?: string;
}

// --- Main Component ---
export default function DetectionPage({ severityFilter = 'All Levels' }: DetectionPageProps) {
  // State Management
  const [data, setData] = useState<DetectionElement[]>([]);
  const [severityCounts, setSeverityCounts] = useState<SeverityCounts>({ critical: 0, high: 0, medium: 0, low: 0 });
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({ enabled: 0, disabled: 0 });
  const [topTactics, setTopTactics] = useState<TacticTechnique[]>([]);
  const [topTechniques, setTopTechniques] = useState<TacticTechnique[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // UI State
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState('-ID');
  const [searchQuery, setSearchQuery] = useState('');

  // View popup
  const [viewItem, setViewItem] = useState<DetectionElement | null>(null);

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // MOCK API DELAY
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK RESPONSE - more realistic rule catalogue
      const ruleLibrary = [
        {
          idPrefix: 'AUTH',
          title: 'Multiple failed logins from single IP',
          severity: 'Medium',
          alertLabel: 'Brute-force login pattern',
        },
        {
          idPrefix: 'PRIV',
          title: 'Suspicious admin privilege escalation',
          severity: 'High',
          alertLabel: 'Privilege escalation spike',
        },
        {
          idPrefix: 'LATERAL',
          title: 'Lateral movement using remote PowerShell',
          severity: 'High',
          alertLabel: 'Remote PowerShell activity',
        },
        {
          idPrefix: 'MALWARE',
          title: 'Malware beacon to known C2 infrastructure',
          severity: 'Critical',
          alertLabel: 'Outbound C2 beacon detected',
        },
        {
          idPrefix: 'CLOUD',
          title: 'Suspicious IAM key usage from new country',
          severity: 'Medium',
          alertLabel: 'Anomalous cloud API usage',
        },
        {
          idPrefix: 'ENDPOINT',
          title: 'Unsigned binary spawning credential tools',
          severity: 'High',
          alertLabel: 'Suspicious process tree',
        },
      ];

      const startIndex = (page - 1) * pageSize;

      const mockDocs: DetectionElement[] = Array.from({ length: pageSize }).map((_, i) => {
        const template = ruleLibrary[(startIndex + i) % ruleLibrary.length];
        const ruleNumber = (startIndex + i + 1).toString().padStart(4, '0');
        const alertId = `ALR-${2000 + startIndex + i}`;

        return {
          id: `RULE-${template.idPrefix}-${ruleNumber}`,
          title: template.title,
          severity: template.severity,
          alert: `${alertId} • ${template.alertLabel}`,
          status: (startIndex + i) % 5 === 0 ? 'Disabled' : 'Enabled',
        };
      });

      // derive severity counts from current page
      const sCounts: SeverityCounts = { critical: 0, high: 0, medium: 0, low: 0 };
      mockDocs.forEach((r) => {
        switch (r.severity) {
          case 'Critical':
            sCounts.critical += 1;
            break;
          case 'High':
            sCounts.high += 1;
            break;
          case 'Medium':
            sCounts.medium += 1;
            break;
          case 'Low':
            sCounts.low += 1;
            break;
          default:
            break;
        }
      });

      const enabledRules = mockDocs.filter((r) => r.status === 'Enabled').length;
      const disabledRules = mockDocs.length - enabledRules;

      setData(mockDocs);
      setTotalItems(86); // mock total rule count
      setSeverityCounts(sCounts);
      setStatusCounts({
        enabled: 11800 + enabledRules, // slightly noisy but realistic org-scale count
        disabled: disabledRules + 30,
      });
      setTopTactics([
        { id: 'TA0006', name: 'Credential Access' },
        { id: 'TA0008', name: 'Lateral Movement' },
      ]);
      setTopTechniques([
        { id: 'T1110', name: 'Brute Force' },
        { id: 'T1078', name: 'Valid Accounts' },
      ]);
    } catch (err) {
      setError('Failed to load detection data. Please try again.');
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

  const handleView = (element: DetectionElement) => {
    setViewItem(element);
  };

  const closeViewPopup = () => setViewItem(null);

  // --- Helpers ---
  const formatEnabledCount = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(2) + 'k+';
    return count.toString();
  };

  const getSeverityStyles = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'enabled' || s === 'active') return 'bg-green-100 text-green-700';
    if (s === 'disabled' || s === 'closed') return 'bg-red-100 text-red-700';
    if (s === 'in progress' || s === 'inprogress') return 'bg-blue-100 text-blue-700';
    return 'bg-slate-100 text-slate-700';
  };

  const filteredData =
    severityFilter && severityFilter !== 'All Levels'
      ? data.filter((row) => row.severity === severityFilter)
      : data;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950 mb-4 md:mb-0">Detection</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors shadow-sm disabled:opacity-70 font-medium"
          >
            {isRefreshing ? 'Loading...' : <><RefreshIcon /> Refresh</>}
          </button>
        </div>
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
          {/* Top Cards: Severities + Status */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6" data-guide-id="cyber-detection-severities">

            {/* Severity Cards (4) */}
            {[
              { label: 'Critical', count: severityCounts.critical, bg: 'bg-red-100 text-red-700' },
              { label: 'High', count: severityCounts.high, bg: 'bg-orange-100 text-orange-700' },
              { label: 'Medium', count: severityCounts.medium, bg: 'bg-yellow-100 text-yellow-700' },
              { label: 'Low', count: severityCounts.low, bg: 'bg-emerald-100 text-emerald-700' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex flex-col justify-between relative min-h-[100px] col-span-1">
                <p className="text-sm font-medium text-slate-500">{item.label}</p>
                <p className="text-3xl font-bold text-blue-950 mt-2">{item.count}</p>
                <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${item.bg}`}>
                  {item.label.charAt(0)}
                </div>
              </div>
            ))}

            {/* Detection Rule Status Card (Wider) */}
            <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm col-span-2 flex flex-col justify-between" data-guide-id="cyber-detection-status">
              <h3 className="text-base font-medium text-slate-700 mb-4">Detection Rule Status</h3>
              <div className="flex items-center gap-6 mt-auto">
                <div className="flex items-center gap-2">
                  <CheckIcon />
                  <span className="text-sm text-slate-600">Enabled</span>
                  <span className="text-lg font-bold text-blue-950">{formatEnabledCount(statusCounts.enabled)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <PowerIcon />
                  <span className="text-sm text-slate-600">Disabled</span>
                  <span className="text-lg font-bold text-blue-950">{statusCounts.disabled}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tactics and Techniques Card */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 mb-6" data-guide-id="cyber-detection-mitre">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-blue-100">

              {/* Top Tactics */}
              <div className="md:pr-6">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Top Tactics</h3>
                <div className="flex flex-wrap gap-6">
                  {topTactics.length > 0 ? topTactics.map((tactic, idx) => (
                    <div key={idx} className="flex flex-col border-l-2 border-blue-300 pl-3">
                      <span className="text-sm text-slate-500 mb-1">{tactic.name}</span>
                      <span className="text-base font-semibold text-blue-950">{tactic.id}</span>
                    </div>
                  )) : (
                    <span className="text-slate-400">-</span>
                  )}
                </div>
              </div>

              {/* Top Techniques */}
              <div className="md:pl-6 pt-6 md:pt-0">
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Top Techniques</h3>
                <div className="flex flex-wrap gap-6">
                  {topTechniques.length > 0 ? topTechniques.map((tech, idx) => (
                    <div key={idx} className="flex flex-col border-l-2 border-blue-300 pl-3">
                      <span className="text-sm text-slate-500 mb-1">{tech.name}</span>
                      <span className="text-base font-semibold text-blue-950">{tech.id}</span>
                    </div>
                  )) : (
                    <span className="text-slate-400">-</span>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-detection-table">

            {/* Table Toolbar */}
            <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between gap-4 bg-blue-50/30">
              <input
                type="text"
                placeholder="Search detection rules..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-md"
              />
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('ID')}>ID</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Title')}>Title</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Severity')}>Severity</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Alert')}>Alert</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Status')}>Status</th>
                    <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-700 whitespace-nowrap">{row.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate" title={row.title}>
                          {row.title}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyles(row.severity)}`}>
                            {row.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.alert}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
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
                        No Detection Rules Found
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

          {/* View popup modal */}
          {viewItem && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="view-modal-title"
            >
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={closeViewPopup}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-lg bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h2 id="view-modal-title" className="text-lg font-semibold text-slate-900">
                    Detection Rule Details
                  </h2>
                  <button
                    type="button"
                    onClick={closeViewPopup}
                    className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                    aria-label="Close"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">ID</p>
                    <p className="text-sm font-medium text-slate-900">{viewItem.id}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Title</p>
                    <p className="text-sm text-slate-700">{viewItem.title}</p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Severity</p>
                      <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyles(viewItem.severity)}`}>
                        {viewItem.severity}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Status</p>
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(viewItem.status)}`}>
                        {viewItem.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Alert</p>
                    <p className="text-sm text-slate-700">{viewItem.alert}</p>
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
                  <button
                    type="button"
                    onClick={closeViewPopup}
                    className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
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