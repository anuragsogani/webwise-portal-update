import React, { useState, useEffect, useCallback } from 'react';
import '../styles/demo-cyber-page.css';

// --- Types ---
interface VulnerabilityElement {
  _id?: string;
  agentId: string;
  agentName: string;
  title: string;
  severity: string;
  host?: string;
  product?: string;
  cve: string;
}

interface SeverityCount {
  severity: string;
  count: number;
}

// --- Icons (Inline SVGs for single-file portability) ---
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

interface VulnerabilitiesPageProps {
  severityFilter?: string;
}

// --- Main Component ---
export default function VulnerabilitiesPage({ severityFilter = 'All Levels' }: VulnerabilitiesPageProps) {
  // State Management
  const [data, setData] = useState<VulnerabilityElement[]>([]);
  const [severityCounts, setSeverityCounts] = useState<SeverityCount[]>([]);
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

  // Create ticket popup
  const [ticketVuln, setTicketVuln] = useState<VulnerabilityElement | null>(null);
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketNotes, setTicketNotes] = useState('');

  // --- Mock Data Fetching ---
  // Replace this block with your actual API calls (e.g., commonService.getAllVulnerability)
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // MOCK API DELAY
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK RESPONSE - more realistic looking data
      const vulnLibrary = [
        {
          cve: 'CVE-2026-10234',
          title: 'OpenSSL remote code execution',
          severity: 'Critical',
          product: 'OpenSSL 3.0.9',
        },
        {
          cve: 'CVE-2025-44121',
          title: 'Apache HTTP request smuggling',
          severity: 'High',
          product: 'Apache httpd 2.4.58',
        },
        {
          cve: 'CVE-2024-99312',
          title: 'Deserialization in Spring Boot API',
          severity: 'Medium',
          product: 'Spring Boot 3.x',
        },
        {
          cve: 'CVE-2023-7812',
          title: 'Outdated TLS configuration',
          severity: 'Low',
          product: 'Nginx gateway',
        },
      ];

      const agentPool = [
        { agentId: 'AGT-1021', agentName: 'auth-gateway-1', host: '10.0.10.21' },
        { agentId: 'AGT-2043', agentName: 'payment-api-2', host: '10.0.12.8' },
        { agentId: 'AGT-3309', agentName: 'customer-portal-01', host: '10.0.20.15' },
        { agentId: 'AGT-4110', agentName: 'db-core-01', host: '10.0.30.4' },
        { agentId: 'AGT-5877', agentName: 'edge-proxy-eu-1', host: '10.2.10.19' },
      ];

      const startIndex = (page - 1) * pageSize;

      const mockDocs: VulnerabilityElement[] = Array.from({ length: pageSize }).map((_, i) => {
        const vuln = vulnLibrary[(startIndex + i) % vulnLibrary.length];
        const agent = agentPool[(startIndex + i) % agentPool.length];

        const numericId = (startIndex + i + 1).toString().padStart(4, '0');

        return {
          _id: `VULN-${numericId}`,
          agentId: agent.agentId,
          agentName: agent.agentName,
          title: `${vuln.title} (${vuln.cve}) detected on ${agent.agentName}`,
          severity: vuln.severity,
          host: agent.host,
          product: vuln.product,
          cve: vuln.cve,
        };
      });

      // derive counts from current page
      const countsMap: Record<string, number> = {};
      mockDocs.forEach((v) => {
        countsMap[v.severity] = (countsMap[v.severity] || 0) + 1;
      });

      setData(mockDocs);
      setTotalItems(128); // mock total across all pages
      setSeverityCounts([
        { severity: 'Critical', count: countsMap['Critical'] || 0 },
        { severity: 'High', count: countsMap['High'] || 0 },
        { severity: 'Medium', count: countsMap['Medium'] || 0 },
        { severity: 'Low', count: countsMap['Low'] || 0 },
      ]);
    } catch (err) {
      setError('Failed to load vulnerabilities data. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [page, pageSize, sort, searchQuery]);

  // Initial Load & Dependencies
  useEffect(() => {
    loadData();
  }, [loadData]);

  // --- Handlers ---
  const handleSort = (column: string) => {
    setSort(prevSort => prevSort === column ? `-${column}` : column);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleCreateTicket = (element: VulnerabilityElement) => {
    setTicketVuln(element);
    setTicketTitle(element.title);
    setTicketNotes('');
  };

  const closeTicketModal = () => {
    setTicketVuln(null);
  };

  const submitTicket = () => {
    // Placeholder - replace with real ticket creation
    // eslint-disable-next-line no-console
    console.log('Create ticket', {
      vulnerability: ticketVuln,
      title: ticketTitle,
      notes: ticketNotes,
    });
    setTicketVuln(null);
  };

  const downloadCsv = () => {
    const source =
      severityFilter && severityFilter !== 'All Levels'
        ? data.filter(d => d.severity === severityFilter)
        : data;

    if (!source || source.length === 0) return alert('No data to export.');

    const headers = ['Agent ID', 'Agent Name', 'Title', 'Severity', 'Host', 'CVE'];
    const escapeCsv = (v: any) => `"${String(v || '').replace(/"/g, '""')}"`;

    const rows = source.map(d => [
      escapeCsv(d.agentId),
      escapeCsv(d.agentName),
      escapeCsv(d.title),
      escapeCsv(d.severity),
      escapeCsv(d.product || d.host || 'N/A'),
      escapeCsv(d.cve)
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');

    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    a.href = url;
    a.download = `vulnerabilities_${date}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // --- Helpers ---
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'High': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Low': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const truncateText = (text: string, length = 60) => {
    return text?.length > length ? `${text.substring(0, length)}...` : text;
  };

  const filteredData =
    severityFilter && severityFilter !== 'All Levels'
      ? data.filter(row => row.severity === severityFilter)
      : data;

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950 mb-4 md:mb-0">Vulnerabilities</h1>
        <button
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
          {/* Severity Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {severityCounts.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{item.severity}</p>
                  <p className="text-3xl font-bold text-blue-950">{item.count}</p>
                </div>
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${getSeverityStyles(item.severity)}`}>
                  <span className="font-bold text-lg">{item.severity.charAt(0)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Table Container */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden">

            {/* Table Toolbar */}
            <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between gap-4 bg-blue-50/30">
              <input
                type="text"
                placeholder="Search vulnerabilities..."
                data-guide-id="cyber-vulnerability-controls"
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-xs"
              />
              <button
                data-guide-id="cyber-vulnerability-export"
                onClick={downloadCsv}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <DownloadIcon /> Export CSV
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto" data-guide-id="cyber-vulnerability-table">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('ID')}>Agent ID</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('AgentName')}>Agent Name</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Title')}>Title</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Severity')}>Severity</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Host')}>Host</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('CVE')}>CVE</th>
                    <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row._id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.agentId}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.agentName}</td>
                        <td className="px-6 py-4 text-sm text-slate-700" title={row.title}>
                          {truncateText(row.title)}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyles(row.severity)}`}>
                            {row.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.product || row.host || 'N/A'}</td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">{row.cve}</td>
                        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                          <button
                            onClick={() => handleCreateTicket(row)}
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                          >
                            Create Ticket
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                        No Vulnerabilities Found
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

          {/* Create Ticket Popup */}
          {ticketVuln && (
            <div
              className="fixed inset-0 z-[120] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="create-ticket-title"
            >
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={closeTicketModal}
                aria-hidden="true"
              />
              <div className="relative w-full max-w-xl bg-white rounded-xl border border-slate-200 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                  <h2
                    id="create-ticket-title"
                    className="text-lg font-semibold text-slate-900"
                  >
                    Create Ticket
                  </h2>
                  <button
                    type="button"
                    onClick={closeTicketModal}
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
                  {/* Context summary */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Agent
                      </p>
                      <p className="text-slate-900 font-medium">
                        {ticketVuln.agentId} • {ticketVuln.agentName}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Severity
                      </p>
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyles(
                          ticketVuln.severity
                        )}`}
                      >
                        {ticketVuln.severity}
                      </span>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        Host / Product
                      </p>
                      <p className="text-slate-800">
                        {ticketVuln.product || ticketVuln.host || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                        CVE
                      </p>
                      <p className="text-slate-800">{ticketVuln.cve}</p>
                    </div>
                  </div>

                  {/* Ticket fields */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Ticket title
                    </label>
                    <input
                      type="text"
                      value={ticketTitle}
                      onChange={(e) => setTicketTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Short summary for this ticket"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wide mb-1">
                      Notes / instructions
                    </label>
                    <textarea
                      value={ticketNotes}
                      onChange={(e) => setTicketNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add context, remediation guidance, or links for the assignee."
                    />
                  </div>
                </div>
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeTicketModal}
                    className="px-4 py-2 text-sm font-medium text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={submitTicket}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Ticket
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
