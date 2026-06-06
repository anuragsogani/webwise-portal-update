import React, { useState, useEffect, useCallback } from 'react';
import '../styles/demo-cyber-page.css';

// --- Types ---
interface ScheduledReport {
  id: string;
  title: string;
  range: string;
  subRange: string;
  owner: string;
  createdTime: string;
}

interface GeneratedReport {
  id: string;
  dashboard: string;
  owner: string;
  fileName: string;
  createdTime: string;
  type: 'PDF' | 'CSV';
}

interface ReportModalData {
  id?: string;
  reportName: string;
  reportType: string;
  range: string;
  subRange: string;
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

const ActionMenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 10.833H10.0083" />
    <path d="M10 5.00033H10.0083" />
    <path d="M10 16.667H10.0083" />
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

// --- Sub-Component: Modal ---
const CreateReportModal = ({
  isOpen,
  onClose,
  initialData
}: {
  isOpen: boolean,
  onClose: () => void,
  initialData?: ReportModalData
}) => {
  const [formData, setFormData] = useState<ReportModalData>({
    reportName: '',
    reportType: '',
    range: '',
    subRange: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || { reportName: '', reportType: '', range: '', subRange: '' });
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // MOCK API CALL
    await new Promise(res => setTimeout(res, 800));
    setLoading(false);
    onClose();
    alert(`Report ${initialData?.id ? 'updated' : 'created'} successfully!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-blue-100">

        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-50 flex justify-between items-center bg-blue-50/50">
          <h2 className="text-lg font-semibold text-blue-950">
            {initialData?.id ? 'Update Report' : 'New Report'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors">
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Report Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                placeholder="Type report name"
                value={formData.reportName}
                onChange={e => setFormData({ ...formData, reportName: e.target.value })}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {!initialData?.id && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Report Type <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.reportType}
                  onChange={e => setFormData({ ...formData, reportType: e.target.value })}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="" disabled>Select</option>
                  <option value="ondemand">On Demand</option>
                  <option value="Schedule">Schedule</option>
                </select>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Range <span className="text-red-500">*</span></label>
                <select
                  required
                  value={formData.range}
                  onChange={e => setFormData({ ...formData, range: e.target.value, subRange: '' })}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                >
                  <option value="" disabled>Select</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>

              {formData.range && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Sub Range <span className="text-red-500">*</span></label>
                  {formData.range === 'annually' ? (
                    <input
                      type="date"
                      required
                      value={formData.subRange}
                      onChange={e => setFormData({ ...formData, subRange: e.target.value })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  ) : (
                    <select
                      required
                      value={formData.subRange}
                      onChange={e => setFormData({ ...formData, subRange: e.target.value })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="" disabled>Select</option>
                      {formData.range === 'weekly' && ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                      {formData.range === 'monthly' && Array.from({ length: 31 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
                      {formData.range === 'daily' && Array.from({ length: 24 }, (_, i) => <option key={i} value={`${i}:00`}>{`${i}:00`}</option>)}
                    </select>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-blue-50 flex justify-end gap-3 bg-slate-50">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-lg text-white hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-70 flex items-center justify-center min-w-[80px]"
            >
              {loading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div> : (initialData?.id ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function ReportsPage() {
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [pdfReports, setPdfReports] = useState<GeneratedReport[]>([]);
  const [csvReports, setCsvReports] = useState<GeneratedReport[]>([]);

  // UI State
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ReportModalData | undefined>(undefined);

  // --- Mock Data Fetching ---
  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setScheduledReports(Array.from({ length: 3 }).map((_, i) => ({
        id: `SCH-${100 + i}`,
        title: `Weekly Threat Overview ${i + 1}`,
        range: 'Weekly',
        subRange: 'Monday',
        owner: 'Admin User',
        createdTime: new Date(Date.now() - (i * 86400000)).toLocaleString()
      })));

      setPdfReports(Array.from({ length: 4 }).map((_, i) => ({
        id: `PDF-${200 + i}`,
        dashboard: `Security Posture Dashboard ${i + 1}`,
        owner: 'System Auto',
        fileName: `security_posture_report_${i + 1}.pdf`,
        createdTime: new Date(Date.now() - (i * 3600000)).toLocaleString(),
        type: 'PDF'
      })));

      setCsvReports(Array.from({ length: 5 }).map((_, i) => ({
        id: `CSV-${300 + i}`,
        dashboard: `Vulnerabilities Extract ${i + 1}`,
        owner: 'Data Analyst',
        fileName: `vuln_extract_${i + 1}.csv`,
        createdTime: new Date(Date.now() - (i * 4200000)).toLocaleString(),
        type: 'CSV'
      })));

    } catch (err) {
      setError('Failed to load reports. Please try again.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial Load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handlers
  const handleOpenCreate = () => {
    setModalData(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setModalData({
      id: item.id,
      reportName: item.title,
      reportType: 'Schedule',
      range: item.range.toLowerCase(),
      subRange: item.subRange
    });
    setIsModalOpen(true);
  };

  const handleDownload = (fileName: string) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="cyber-ui xdr-ui min-h-screen bg-[#f8fafc] text-slate-800 p-6 font-sans">

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-950 mb-4 md:mb-0">Reports</h1>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="date"
            className="px-3 py-2 border border-blue-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button
            data-guide-id="cyber-reports-refresh"
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-50 transition-colors shadow-sm disabled:opacity-70 font-medium"
          >
            {isRefreshing ? 'Loading...' : <><RefreshIcon /> Refresh</>}
          </button>
          <button
            data-guide-id="cyber-reports-create"
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-transparent text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
          >
            <AddIcon /> Create Report
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center text-red-700">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-800 font-semibold underline">Dismiss</button>
        </div>
      )}

      {/* Loader Overlay */}
      {loading && !isRefreshing && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Tables Container */}
      {!loading && !error && (
        <div className="space-y-6">

          {/* Scheduled Reports Table */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-reports-scheduled">
            <div className="px-6 py-4 border-b border-blue-100 bg-blue-50/30 flex justify-between items-center" data-guide-id="cyber-reports-templates">
              <h2 className="text-lg font-semibold text-blue-900">Scheduled Reports</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-3 font-semibold text-sm">Title</th>
                    <th className="px-6 py-3 font-semibold text-sm">Range</th>
                    <th className="px-6 py-3 font-semibold text-sm">Sub Range</th>
                    <th className="px-6 py-3 font-semibold text-sm">Owner</th>
                    <th className="px-6 py-3 font-semibold text-sm">Created Time</th>
                    <th className="px-6 py-3 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scheduledReports.length > 0 ? scheduledReports.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-slate-700 max-w-[200px] truncate" title={row.title}>{row.title}</td>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.range}</td>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.subRange}</td>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.owner}</td>
                      <td className="px-6 py-3 text-sm text-slate-600">{row.createdTime}</td>
                      <td className="px-6 py-3 text-sm text-center">
                        <button onClick={() => handleEdit(row)} className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <ActionMenuIcon />
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No Scheduled Reports Found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generated PDF Reports Table */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden" data-guide-id="cyber-reports-generated">
            <div className="px-6 py-4 border-b border-blue-100 bg-blue-50/30 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-900">Generated PDF Reports</h2>
              <button data-guide-id="cyber-reports-generate" className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                <DownloadIcon /> Export List
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-3 font-semibold text-sm">Dashboard</th>
                    <th className="px-6 py-3 font-semibold text-sm">Owner</th>
                    <th className="px-6 py-3 font-semibold text-sm">File Name</th>
                    <th className="px-6 py-3 font-semibold text-sm">Create Date</th>
                    <th className="px-6 py-3 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pdfReports.length > 0 ? pdfReports.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-slate-700 max-w-[200px] truncate" title={row.dashboard}>{row.dashboard}</td>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.owner}</td>
                      <td className="px-6 py-3 text-sm text-slate-700 font-medium max-w-[200px] truncate" title={row.fileName}>{row.fileName}</td>
                      <td className="px-6 py-3 text-sm text-slate-600">{row.createdTime}</td>
                      <td className="px-6 py-3 text-sm text-center">
                        <button onClick={() => handleDownload(row.fileName)} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No PDF Reports Found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Generated CSV Reports Table */}
          <div className="bg-white border border-blue-100 rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-blue-100 bg-blue-50/30 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-blue-900">Generated CSV Reports</h2>
              <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                <DownloadIcon /> Export List
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-50 text-blue-900 border-b border-blue-100">
                    <th className="px-6 py-3 font-semibold text-sm">Dashboard</th>
                    <th className="px-6 py-3 font-semibold text-sm">Owner</th>
                    <th className="px-6 py-3 font-semibold text-sm">File Name</th>
                    <th className="px-6 py-3 font-semibold text-sm">Create Date</th>
                    <th className="px-6 py-3 font-semibold text-sm text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {csvReports.length > 0 ? csvReports.map(row => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-slate-700 max-w-[200px] truncate" title={row.dashboard}>{row.dashboard}</td>
                      <td className="px-6 py-3 text-sm text-slate-700">{row.owner}</td>
                      <td className="px-6 py-3 text-sm text-slate-700 font-medium max-w-[200px] truncate" title={row.fileName}>{row.fileName}</td>
                      <td className="px-6 py-3 text-sm text-slate-600">{row.createdTime}</td>
                      <td className="px-6 py-3 text-sm text-center">
                        <button onClick={() => handleDownload(row.fileName)} className="text-blue-600 hover:text-blue-800 font-medium hover:underline">
                          Download
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No CSV Reports Found</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Modal Component */}
      <CreateReportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={modalData}
      />

    </div>
  );
}
