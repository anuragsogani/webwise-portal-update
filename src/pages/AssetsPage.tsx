import { useState, useEffect, useCallback } from 'react';
import '../styles/demo-cyber-page.css';

// --- Types ---
type TabType = 'Server' | 'Network' | 'Workstation' | 'SBOM';

interface AssetSummary {
  riskScore: number;
  threatScore: number;
  vulnerability: { total: number; critical: number; high: number; medium: number; low: number };
  status: { total: number; active: number; disconnected: number; never_connected: number };
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

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ActionMenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10.833H10.0083" />
    <path d="M10 5.00033H10.0083" />
    <path d="M10 16.667H10.0083" />
  </svg>
);

// --- Sub-Components (New visual style) ---
const CircularGauge = ({
  label,
  score,
  accentColor,
}: {
  label: string;
  score: number;
  accentColor: string;
}) => {
  const clamped = Math.min(100, Math.max(0, score));
  // Slightly smaller radius and stroke so text fits cleanly inside
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={accentColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              transition: "stroke-dashoffset 0.6s ease",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-bold text-slate-900 leading-tight">
            {clamped}
            <span className="text-[10px] text-slate-500 ml-[1px]">%</span>
          </span>
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-wide text-slate-500">
            Score
          </span>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-slate-500 mt-1">
          Higher values indicate more attention required for this slice of your
          asset estate.
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('Server');
  const [data, setData] = useState<any[]>([]);
  const [summary, setSummary] = useState<AssetSummary | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  // UI State
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (tab: TabType, isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600)); // Mock network delay

      // Generate Mock Summary
      setSummary({
        riskScore: 78,
        threatScore: 42,
        vulnerability: { total: 1240, critical: 120, high: 340, medium: 520, low: 260 },
        status: { total: 342, active: 290, disconnected: 30, never_connected: 22 }
      });

      // Generate Mock Table Data based on active tab
      let mockDocs: any[] = [];

      if (tab === 'Server' || tab === 'Workstation') {
        mockDocs = Array.from({ length: pageSize }).map((_, i) => ({
          id: `AST-${tab.substring(0, 3).toUpperCase()}-${1000 + i}`,
          title: `${tab}-Node-${i + 1}`,
          ip: `192.168.1.${10 + i}`,
          vendor: ['Microsoft', 'Linux', 'Apple'][i % 3],
          os: `OS Version ${2020 + (i % 4)}.0`,
          role: 'Application Server',
          owner: 'IT Ops',
          riskScore: Math.floor(Math.random() * 100),
          threatScore: Math.floor(Math.random() * 100),
          status: ['active', 'disconnected', 'never_connected'][i % 3],
        }));
      } else if (tab === 'Network') {
        mockDocs = Array.from({ length: pageSize }).map((_, i) => ({
          deviceType: ['Router', 'Switch', 'Firewall'][i % 3],
          ip: `10.0.${i}.1`,
          status: ['active', 'inactive'][i % 2],
          lastLogReceived: new Date().toISOString(),
          vendor: 'Cisco Systems'
        }));
      } else if (tab === 'SBOM') {
        mockDocs = Array.from({ length: pageSize }).map((_, i) => ({
          agentName: `Agent-00${i}`,
          architecture: 'x86_64',
          description: 'Core system package library',
          vendor: 'OpenSource',
          format: 'deb',
          multiarch: 'same',
          name: `lib-package-${i}`,
          priority: 'optional',
          section: 'libs',
          size: `${(Math.random() * 10).toFixed(2)} MB`,
          version: `2.${i}.1`
        }));
      }

      setData(mockDocs);
      setTotalItems(150);
    } catch (err) {
      setError('Failed to load assets data. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [pageSize]);

  // Initial Load & Tab Switch
  useEffect(() => {
    setPage(1);
    loadData(activeTab);
  }, [activeTab, loadData]);

  // --- Handlers ---
  const handleTabChange = (tab: TabType) => setActiveTab(tab);

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-100 text-emerald-700';
      case 'inactive':
      case 'disconnected': return 'bg-red-100 text-red-700';
      case 'never_connected': return 'bg-slate-100 text-slate-600';
      default: return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950">Assets Management</h1>
        <button
          onClick={() => loadData(activeTab, true)}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 mt-4 md:mt-0 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm disabled:opacity-70 font-medium"
        >
          {isRefreshing ? 'Loading...' : <><RefreshIcon /> Refresh</>}
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center text-red-700">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-800">Dismiss</button>
        </div>
      )}

      {/* Summary Area - redesigned layout */}
      {summary && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Left: Overall health (circular gauges) */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 flex flex-col gap-6" data-guide-id="cyber-asset-health">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Overall Asset Health
            </h3>
            <CircularGauge
              label="Risk posture"
              score={summary.riskScore}
              accentColor="#0ea5e9"
            />
            <CircularGauge
              label="Threat exposure"
              score={summary.threatScore}
              accentColor="#f97316"
            />
          </div>

          {/* Middle: Vulnerabilities as segmented bars + chips */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 flex flex-col gap-4" data-guide-id="cyber-asset-vuln-dist">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Vulnerability distribution
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {summary.vulnerability.total} findings
              </span>
            </div>

            <div className="space-y-3">
              {/* Critical / High */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Critical + High</span>
                  <span className="font-semibold text-slate-900">
                    {summary.vulnerability.critical + summary.vulnerability.high}
                  </span>
                </div>
                <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    style={{ flex: summary.vulnerability.critical }}
                    className="bg-red-600"
                  />
                  <div
                    style={{ flex: summary.vulnerability.high }}
                    className="bg-red-400"
                  />
                </div>
              </div>

              {/* Medium / Low */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Medium + Low</span>
                  <span className="font-semibold text-slate-900">
                    {summary.vulnerability.medium + summary.vulnerability.low}
                  </span>
                </div>
                <div className="flex h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    style={{ flex: summary.vulnerability.medium }}
                    className="bg-amber-400"
                  />
                  <div
                    style={{ flex: summary.vulnerability.low }}
                    className="bg-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mt-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                  Critical
                </span>
                <span className="font-semibold text-slate-800">
                  {summary.vulnerability.critical}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  High
                </span>
                <span className="font-semibold text-slate-800">
                  {summary.vulnerability.high}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Medium
                </span>
                <span className="font-semibold text-slate-800">
                  {summary.vulnerability.medium}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  Low
                </span>
                <span className="font-semibold text-slate-800">
                  {summary.vulnerability.low}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Status as mini stacked bars */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm p-6 flex flex-col gap-4" data-guide-id="cyber-asset-connectivity">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Connectivity status
              </h3>
              <span className="text-xs font-medium text-slate-500">
                {summary.status.total} assets
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Online</span>
                  <span className="font-semibold text-slate-900">
                    {summary.status.active}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    style={{ width: `${(summary.status.active / summary.status.total) * 100}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Offline</span>
                  <span className="font-semibold text-slate-900">
                    {summary.status.disconnected}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    style={{ width: `${(summary.status.disconnected / summary.status.total) * 100}%` }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-600">Never connected</span>
                  <span className="font-semibold text-slate-900">
                    {summary.status.never_connected}
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
                  <div
                    style={{
                      width: `${(summary.status.never_connected / summary.status.total) * 100}%`,
                    }}
                    className="h-full bg-slate-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Table Container */}
      <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-asset-table">

        {/* Tabs */}
        <div className="flex overflow-x-auto border-b border-blue-100 bg-slate-50 p-2 gap-2" data-guide-id="cyber-asset-tabs">
          {(['Server', 'Network', 'Workstation', 'SBOM'] as TabType[]).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${activeTab === tab
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-600 hover:bg-blue-100 hover:text-blue-800'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-blue-50/20">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:max-w-md bg-white"
          />
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              <DownloadIcon /> Export
            </button>
            {activeTab !== 'SBOM' && (
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                <AddIcon /> Add Asset
              </button>
            )}
          </div>
        </div>

        {/* Table loader overlay */}
        {loading && (
          <div className="py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-50 text-blue-900 border-b border-blue-100 whitespace-nowrap">
                  {/* Dynamic Headers based on Active Tab */}
                  {(activeTab === 'Server' || activeTab === 'Workstation') && (
                    <>
                      <th className="px-5 py-3.5 font-semibold text-sm">ID</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Title</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">IP</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Vendor</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">OS</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Role</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Owner</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Risk Score</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Status</th>
                      <th className="px-5 py-3.5 font-semibold text-sm text-center">Action</th>
                    </>
                  )}
                  {activeTab === 'Network' && (
                    <>
                      <th className="px-5 py-3.5 font-semibold text-sm">Device Type</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">IP</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Status</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Last Log Received</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Vendor</th>
                    </>
                  )}
                  {activeTab === 'SBOM' && (
                    <>
                      <th className="px-5 py-3.5 font-semibold text-sm">Agent Name</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Arch</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Description</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Vendor</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Name</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Version</th>
                      <th className="px-5 py-3.5 font-semibold text-sm">Size</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.length > 0 ? data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 transition-colors whitespace-nowrap">

                    {/* Render rows dynamically based on Tab */}
                    {(activeTab === 'Server' || activeTab === 'Workstation') && (
                      <>
                        <td className="px-5 py-3 text-sm text-slate-700 font-medium">{row.id}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.title}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.ip}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.vendor}</td>
                        <td className="px-5 py-3 text-sm text-slate-700 max-w-[150px] truncate" title={row.os}>{row.os}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.role}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.owner}</td>
                        <td className="px-5 py-3 text-sm font-semibold text-slate-700">{row.riskScore}</td>
                        <td className="px-5 py-3 text-sm">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusBadge(row.status)}`}>
                            {row.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-center">
                          <button className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                            <ActionMenuIcon />
                          </button>
                        </td>
                      </>
                    )}

                    {activeTab === 'Network' && (
                      <>
                        <td className="px-5 py-3 text-sm font-medium text-slate-700">{row.deviceType}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.ip}</td>
                        <td className="px-5 py-3 text-sm">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusBadge(row.status)}`}>
                            {row.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-600">{new Date(row.lastLogReceived).toLocaleString()}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.vendor}</td>
                      </>
                    )}

                    {activeTab === 'SBOM' && (
                      <>
                        <td className="px-5 py-3 text-sm font-medium text-slate-700">{row.agentName}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.architecture}</td>
                        <td className="px-5 py-3 text-sm text-slate-700 max-w-[200px] truncate" title={row.description}>{row.description}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.vendor}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.name}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.version}</td>
                        <td className="px-5 py-3 text-sm text-slate-700">{row.size}</td>
                      </>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-12 text-center text-slate-500">
                      No Assets Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && data.length > 0 && (
          <div className="px-6 py-4 border-t border-blue-100 flex items-center justify-between bg-white">
            <div className="text-sm text-slate-500">
              Showing <span className="font-medium text-slate-800">{((page - 1) * pageSize) + 1}</span> to <span className="font-medium text-slate-800">{Math.min(page * pageSize, totalItems)}</span> of <span className="font-medium text-slate-800">{totalItems}</span> results
            </div>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 border border-blue-200 rounded text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                disabled={page * pageSize >= totalItems}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 border border-blue-200 rounded text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
