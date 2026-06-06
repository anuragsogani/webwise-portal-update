import React, { useState, useEffect, useCallback } from 'react';
import '../styles/demo-cyber-page.css';

// --- Types ---
interface IncidentElement {
  ticketNumber: string;
  title: string;
  severity: string;
  status: string;
  assignedTo: string;
  age: string;
}

interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
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

const AddIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
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
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Sub-Component: Incident Details Modal ---
const IncidentDetailsModal = ({
  incident,
  onClose
}: {
  incident: IncidentElement | null,
  onClose: () => void
}) => {
  if (!incident) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-blue-100">

        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-50 flex justify-between items-center bg-blue-50/50">
          <h2 className="text-lg font-semibold text-blue-950">
            {incident.ticketNumber ? `${incident.ticketNumber}: ${incident.title}` : incident.title}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Body (Mocked Details) */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-50 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Ticket Number</p>
              <p className="font-semibold text-slate-800">{incident.ticketNumber}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Severity</p>
              <p className="font-semibold text-slate-800">{incident.severity}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Status</p>
              <p className="font-semibold text-slate-800">{incident.status}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Assigned To</p>
              <p className="font-semibold text-slate-800">{incident.assignedTo || 'Unassigned'}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3 border-b pb-2">Description & Notes</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              This is a generated placeholder for the incident details view. In a real application, this would contain the full log payload, timeline events, and investigator notes associated with ticket {incident.ticketNumber}.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button onClick={onClose} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium">
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-white hover:bg-blue-700 transition-colors text-sm font-medium">
            Update Incident
          </button>
        </div>
      </div>
    </div>
  );
};

interface IncidentsPageProps {
  severityFilter?: string;
}

// --- Main Component ---
export default function IncidentsPage({ severityFilter = 'All Levels' }: IncidentsPageProps) {
  // State Management
  const [data, setData] = useState<IncidentElement[]>([]);
  const [severityCounts, setSeverityCounts] = useState<SeverityCounts>({ critical: 0, high: 0, medium: 0, low: 0 });
  const [totalItems, setTotalItems] = useState(0);

  // UI State
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Table Controls
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [sort, setSort] = useState('-TicketNumber');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [selectedIncident, setSelectedIncident] = useState<IncidentElement | null>(null);

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      // MOCK API DELAY
      await new Promise((resolve) => setTimeout(resolve, 800));

      // MOCK RESPONSE
      const mockDocs = Array.from({ length: pageSize }).map((_, i) => ({
        ticketNumber: `INC-${1000 + (page - 1) * pageSize + i}`,
        title: `Suspicious activity detected on host ${i + 1} - Potential unauthorized access attempt on sensitive data.`,
        severity: ['Critical', 'High', 'Medium', 'Low'][i % 4],
        status: ['Open', 'In Progress', 'Resolved', 'Closed', 'Pending Approval'][i % 5],
        assignedTo: i % 3 === 0 ? '' : `Analyst ${i + 1}`,
        age: `${i + 1} hours ago`,
      }));

      setData(mockDocs);
      setTotalItems(145);
      setSeverityCounts({ critical: 12, high: 34, medium: 56, low: 43 });
    } catch (err) {
      setError('Failed to load incidents. Please try again.');
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

  const openIncidentDetails = (incident: IncidentElement) => {
    setSelectedIncident(incident);
  };

  const downloadCsv = () => {
    alert('Exporting incidents to CSV...');
  };

  const openCreateTicket = () => {
    alert('Opening Create Ticket modal...');
  };

  // --- Helpers ---
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
    if (s.includes('closed')) return 'bg-slate-100 text-slate-700';
    if (s.includes('open')) return 'bg-blue-100 text-blue-700';
    if (s.includes('progress')) return 'bg-purple-100 text-purple-700';
    if (s.includes('resolved')) return 'bg-emerald-100 text-emerald-700';
    if (s.includes('pending') || s.includes('hold')) return 'bg-amber-100 text-amber-700';
    if (s.includes('cancelled')) return 'bg-red-100 text-red-700';
    return 'bg-slate-100 text-slate-700';
  };

  const filteredData =
    severityFilter && severityFilter !== 'All Levels'
      ? data.filter((row) => row.severity === severityFilter)
      : data;

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-blue-950">Incidents</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            className="px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
          />
          <button
            data-guide-id="cyber-incident-refresh"
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm disabled:opacity-70 font-medium"
          >
            {isRefreshing ? 'Loading...' : <><RefreshIcon /> Refresh</>}
          </button>
          <button
            data-guide-id="cyber-incident-create"
            onClick={openCreateTicket}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <AddIcon /> Create Ticket
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
          {/* Severity Dashboard Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6" data-guide-id="cyber-incident-severities">
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

          {/* Table Container */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-incidents-table">

            {/* Table Toolbar */}
            <div className="p-4 border-b border-blue-100 flex flex-col sm:flex-row justify-between gap-4 bg-blue-50/30">
              <input
                type="text"
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={handleSearch}
                className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:max-w-md bg-white shadow-sm"
              />
              <button
                onClick={downloadCsv}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors font-medium shadow-sm"
              >
                <DownloadIcon /> Export CSV
              </button>
            </div>

            {/* Responsive Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100 whitespace-nowrap">
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('TicketNumber')}>Ticket Number</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Title')}>Title</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Severity')}>Severity</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" data-guide-id="cyber-incident-status" onClick={() => handleSort('Status')}>Status</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('AssignedTo')}>Assigned To</th>
                    <th className="px-6 py-4 font-semibold text-sm cursor-pointer hover:bg-blue-100" onClick={() => handleSort('Age')}>Age</th>
                    <th className="px-6 py-4 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredData.length > 0 ? (
                    filteredData.map((row) => (
                      <tr key={row.ticketNumber} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-blue-600 whitespace-nowrap cursor-pointer hover:underline" onClick={() => openIncidentDetails(row)}>
                          {row.ticketNumber || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 max-w-[280px] truncate" title={row.title}>
                          {row.title}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${getSeverityStyles(row.severity)}`}>
                            {row.severity}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
                          {row.assignedTo || <span className="text-slate-400 italic">Unassigned</span>}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 whitespace-nowrap">{row.age}</td>
                        <td className="px-6 py-4 text-sm text-center whitespace-nowrap">
                          <button
                            onClick={() => openIncidentDetails(row)}
                            className="text-blue-600 font-medium hover:text-blue-800 hover:underline px-3 py-1 bg-white border border-blue-100 rounded shadow-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                        No Incidents Found
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
                    className="px-3 py-1.5 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page * pageSize >= totalItems}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1.5 border border-blue-200 rounded-lg text-sm font-medium text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <IncidentDetailsModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
