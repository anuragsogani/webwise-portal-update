import { useState, useEffect, useCallback, useMemo, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Maximize2,
  Plus,
  Trash2,
  ShieldAlert,
  Bell,
  HardDrive,
  FileText,
  BrainCircuit,
  Crosshair,
  AlertTriangle,
  LayoutDashboard
} from "lucide-react";
import AiratShell from "../components/AiratShell";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { SeverityBadge } from "../components/cyber/SeverityBadge";
import VulnerabilitiesPage from "./VulnerabilitiesPage";
import AlertsPage from "./AlertsPage";
import AssetsPage from "./AssetsPage";
import ReportsPage from "./ReportsPage";
import IncidentsPage from "./IncidentsPage";
import AiratDashboard from "./AiratDashboard";
import OverviewDashboard, { OverviewStats } from "./OverviewDashboard";
import "../styles/tokens.css";
import "../styles/shared-page.css";
import "../styles/demo-page.css";
import "../styles/demo-cyber-page.css";

// --- Monitor (same structure as demoEcom / DemoXdrPage) ---
const Monitor = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const screenRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            screenRef.current?.requestFullscreen().catch((err: any) => console.log(err));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="cyber-ui xdr-ui w-full bg-transparent flex flex-col font-sans max-w-[1400px] mx-auto">
            <div className="relative w-full">
                <div className="bg-black rounded-md md:rounded-lg p-2 md:p-3 pb-1.5 md:pb-2 shadow-2xl border-b-4 md:border-b-[6px] border-black ring-1 ring-white/10 relative z-10">
                    {/* Menu dots */}
                    <div className="w-full flex justify-center mb-1.5 md:mb-2 items-center gap-1.5 md:gap-2 opacity-50">
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full"></div>
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full ring-1 ring-white/20"></div>
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 bg-white/20 rounded-full"></div>
                    </div>

                    {/* screen */}
                    <div
                        ref={screenRef}
                        style={{
                            position: 'relative',
                            overflow: 'hidden',
                            borderRadius: '6px',
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: '#141413',
                            height: 'min(80vh, 850px)',
                            minHeight: '500px',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        {children}
                        
                        <button
                            onClick={toggleFullscreen}
                            style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', zIndex: 9999, padding: '0.5rem', borderRadius: '0.375rem', background: 'rgba(20,20,19,0.8)', color: 'var(--dim)', border: '1px solid rgba(255,255,255,0.1)' }}
                            title="Toggle Fullscreen"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>

                    {/* Monitor title bar */}
                    <div className="w-full flex justify-center mt-1.5 md:mt-2 pb-0.5">
                        <div className="text-[8px] md:text-[9px] font-bold tracking-[0.3em] text-white/30 uppercase">{title}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Types ---
export interface ThreatEvent {
  id: string;
  title: string;
  description: string;
  module: string;
  severity: string;
  threat_type: string;
  asset_type: string;
  target_ip: string;
  risk_score: number;
  timestamp: string;
}

interface IncidentItem extends ThreatEvent { }

interface Toast {
  id: number;
  message: string;
}

const MODULES: { id: string; name: string; icon: React.ElementType }[] = [
  { id: "overview", name: "Overview", icon: LayoutDashboard },
  { id: "vulnerability", name: "Vulnerability", icon: ShieldAlert },
  { id: "alerts", name: "Alerts", icon: Bell },
  { id: "assets", name: "Assets", icon: HardDrive },
  { id: "detection", name: "Detection", icon: Crosshair },
  { id: "reports", name: "Reports", icon: FileText },
  { id: "airat", name: "AiRAT", icon: BrainCircuit },
  { id: "incidents", name: "Incidents", icon: AlertTriangle },
];

const SEVERITIES = ["All Levels", "Critical", "High", "Medium", "Low"];

const ITEMS_PER_PAGE = 15;

function generateMockThreats(): ThreatEvent[] {
  const modules = MODULES.map((m) => m.name);
  const severities = ["Critical", "High", "Medium", "Low"];
  const threatTypes = [
    "Malware",
    "Phishing",
    "Lateral Movement",
    "Data Exfil",
    "Privilege Escalation",
    "Ransomware",
    "C2 Beacon",
    "Brute Force",
  ];
  const assetTypes = ["Server", "Workstation", "Cloud", "IoT", "Network"];
  const titles = [
    "Suspicious PowerShell execution",
    "Unusual login from new geography",
    "CVE-2024-1234 exploitation attempt",
    "Anomalous outbound traffic spike",
    "Credential stuffing pattern detected",
    "Malicious macro in document",
    "Port scan from internal host",
    "Sensitive file access anomaly",
    "Disabled EDR tampering",
    "Scheduled task persistence",
  ];
  const out: ThreatEvent[] = [];
  for (let i = 0; i < 150; i++) {
    const severity = severities[i % severities.length];
    const module = modules[i % modules.length];
    out.push({
      id: `threat-${i + 1}`,
      title: titles[i % titles.length] + (i > 9 ? ` #${i}` : ""),
      description: `Detected on asset, requires triage. Module: ${module}, severity: ${severity}.`,
      module,
      severity,
      threat_type: threatTypes[i % threatTypes.length],
      asset_type: assetTypes[i % assetTypes.length],
      target_ip: `192.168.${(i % 255) >> 0}.${i % 253 + 1}`,
      risk_score: 20 + (i % 80),
      timestamp: new Date(Date.now() - i * 3600000).toISOString(),
    });
  }
  return out;
}

// --- Context ---
interface CyberContextType {
  allItems: ThreatEvent[];
  items: ThreatEvent[];
  setItems: React.Dispatch<React.SetStateAction<ThreatEvent[]>>;
  activeModule: string;
  setActiveModule: (m: string) => void;
  activeSeverity: string;
  setActiveSeverity: (s: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isIncidentQueueOpen: boolean;
  setIsIncidentQueueOpen: (v: boolean) => void;
  incidentQueue: IncidentItem[];
  addToQueue: (item: ThreatEvent) => void;
  removeFromQueue: (id: string) => void;
  toasts: Toast[];
  addToast: (message: string) => void;
  filteredItems: ThreatEvent[];
  searchTime: number;
  currentPage: number;
  setCurrentPage: (p: number) => void;
  totalPages: number;
  totalResults: number;
}

const CyberContext = createContext<CyberContextType | undefined>(undefined);

function useCyber() {
  const ctx = useContext(CyberContext);
  if (ctx === undefined) throw new Error("useCyber must be used within CyberProvider");
  return ctx;
}

function CyberProvider({ children }: { children: React.ReactNode }) {

  const [allItems, setAllItems] = useState<ThreatEvent[]>(() => generateMockThreats());
  const [items, setItems] = useState<ThreatEvent[]>(allItems);
  const [activeModule, setActiveModule] = useState(MODULES[0].id);
  const [activeSeverity, setActiveSeverity] = useState(SEVERITIES[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isIncidentQueueOpen, setIsIncidentQueueOpen] = useState(false);
  const [incidentQueue, setIncidentQueue] = useState<IncidentItem[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchTime, setSearchTime] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const toastIdRef = useRef(0);

  useEffect(() => {
    setAllItems(generateMockThreats());
    setItems(generateMockThreats());
  }, []);

  const addToast = useCallback((message: string) => {
    toastIdRef.current += 1;
    const id = toastIdRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const addToQueue = useCallback(
    (item: ThreatEvent) => {
      setIncidentQueue((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
      addToast(`Added "${item.title}" to incident queue`);
    },
    [addToast]
  );

  const removeFromQueue = useCallback((id: string) => {
    setIncidentQueue((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const filteredItems = useMemo(() => {
    const start = performance.now();
    let list = [...items];
    if (activeModule) {
      const moduleName = MODULES.find((m) => m.id === activeModule)?.name;
      if (moduleName) list = list.filter((i) => i.module === moduleName);
    }
    if (activeSeverity && activeSeverity !== "All Levels") {
      list = list.filter((i) => i.severity === activeSeverity);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.target_ip.includes(searchQuery)
      );
    }
    setSearchTime(performance.now() - start);
    return list;
  }, [items, activeModule, activeSeverity, searchQuery]);

  const totalResults = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [filteredItems, currentPage]
  );

  const value: CyberContextType = {
    allItems,
    items,
    setItems,
    activeModule,
    setActiveModule,
    activeSeverity,
    setActiveSeverity,
    searchQuery,
    setSearchQuery,
    isIncidentQueueOpen,
    setIsIncidentQueueOpen,
    incidentQueue,
    addToQueue,
    removeFromQueue,
    toasts,
    addToast,
    filteredItems: paginatedItems,
    searchTime,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults,
  };

  return (
    <CyberContext.Provider value={value}>
      {children}
    </CyberContext.Provider>
  );
}

// --- Top navbar (tabs inside monitor) ---
function TopNavbar() {
  const { activeModule, setActiveModule, incidentQueue, setIsIncidentQueueOpen } = useCyber();
  return (
    <div data-guide-id="cyber-sidebar" className="flex items-center justify-between border-b border-[var(--cyber-border)] bg-[var(--cyber-surface-2)]/80 px-3 py-2 shrink-0">
      <div className="flex flex-wrap items-center gap-1">
        {MODULES.map((m) => {
          const Icon = m.icon;
          const isActive = activeModule === m.id;
          return (
            <button
              key={m.id}
              data-module-id={m.id}
              onClick={() => setActiveModule(m.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${isActive
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-[var(--cyber-surface-1)] text-[var(--cyber-text-muted)] hover:bg-slate-100 border border-[var(--cyber-border)]"
                }`}
            >
              <Icon size={14} />
              {m.name}
            </button>
          );
        })}
      </div>
      <button
        onClick={() => setIsIncidentQueueOpen(true)}
        className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100"
      >
        <AlertTriangle size={14} />
        Queue ({incidentQueue.length})
      </button>
    </div>
  );
}

// --- Filter bar ---
function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    activeSeverity,
    setActiveSeverity,
    totalResults,
    searchTime,
  } = useCyber();
  return (
    <div data-guide-id="cyber-severity-filter" className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-[var(--cyber-surface-1)] px-3 py-2 shrink-0">
      <div className="relative flex-1 min-w-[140px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[var(--cyber-text-muted)]" />
        <input
          type="text"
          placeholder="Search threats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-[var(--cyber-border)] bg-[var(--cyber-surface-2)]/50 py-1.5 pl-8 pr-2 text-xs text-slate-800 placeholder:text-[var(--cyber-text-muted)] focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {SEVERITIES.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSeverity(s)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeSeverity === s
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-[var(--cyber-text-muted)] hover:bg-slate-200"
              }`}
          >
            {s}
          </button>
        ))}
      </div>
      <span className="text-[10px] font-medium text-[var(--cyber-text-muted)] whitespace-nowrap">
        {totalResults} hits ({searchTime.toFixed(0)}ms)
      </span>
    </div>
  );
}

// --- Threat table (for Detection tab or overview) ---
function ThreatTable() {
  const { filteredItems, addToQueue } = useCyber();
  return (
    <div className="flex-1 overflow-auto" data-guide-id="cyber-detection-table">
      <div className="min-w-[640px]">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 bg-[var(--cyber-surface-2)] border-b border-[var(--cyber-border)] text-[var(--cyber-text-muted)] font-semibold uppercase tracking-wider">
            <tr>
              <th className="py-2 px-3">Title</th>
              <th className="py-2 px-3">Module</th>
              <th className="py-2 px-3">Severity</th>
              <th className="py-2 px-3">Risk</th>
              <th className="py-2 px-3">Time</th>
              <th className="py-2 px-3 w-24">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--cyber-surface-2)]/80">
                <td className="py-2 px-3 font-medium text-[var(--cyber-text)] max-w-[200px] truncate" title={row.title}>
                  {row.title}
                </td>
                <td className="py-2 px-3 text-[var(--cyber-text-muted)]">{row.module}</td>
                <td className="py-2 px-3">
                  <SeverityBadge severity={row.severity} size="xs" />
                </td>
                <td className="py-2 px-3 font-mono text-slate-700">{row.risk_score}</td>
                <td className="py-2 px-3 text-[var(--cyber-text-muted)]">
                  {new Date(row.timestamp).toLocaleString(undefined, {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-2 px-3">
                  <button
                    onClick={() => addToQueue(row)}
                    className="inline-flex items-center gap-1 rounded bg-blue-50 text-blue-700 px-2 py-1 hover:bg-blue-100 text-[10px] font-medium"
                  >
                    <Plus size={12} />
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// --- Pagination ---
function Pagination() {
  const { currentPage, setCurrentPage, totalPages, totalResults } = useCyber();
  return (
    <div className="flex items-center justify-between border-t border-[var(--cyber-border)] bg-[var(--cyber-surface-1)] px-3 py-2 shrink-0 text-xs text-[var(--cyber-text-muted)]">
      <span>
        Page {currentPage} of {totalPages} ({totalResults} total)
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage <= 1}
          className="rounded border border-[var(--cyber-border)] bg-[var(--cyber-surface-1)] px-2 py-1 text-[var(--cyber-text-soft)] disabled:opacity-50 hover:bg-[var(--cyber-surface-2)]"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage >= totalPages}
          className="rounded border border-[var(--cyber-border)] bg-[var(--cyber-surface-1)] px-2 py-1 text-[var(--cyber-text-soft)] disabled:opacity-50 hover:bg-[var(--cyber-surface-2)]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// --- Incident panel (slide-out queue) ---
function IncidentPanel() {
  const {
    isIncidentQueueOpen,
    setIsIncidentQueueOpen,
    incidentQueue,
    removeFromQueue,
  } = useCyber();
  return (
    <AnimatePresence>
      {isIncidentQueueOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsIncidentQueueOpen(false)}
            className="absolute inset-0 bg-black/20 z-[100]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[var(--cyber-surface-1)] border-l border-[var(--cyber-border)] shadow-xl z-[101] flex flex-col"
          >
            <div className="flex items-center justify-between border-b border-[var(--cyber-border)] px-4 py-3">
              <h3 className="font-semibold text-[var(--cyber-text)]">Incident Queue</h3>
              <button
                onClick={() => setIsIncidentQueueOpen(false)}
                className="rounded p-1.5 hover:bg-slate-100 text-[var(--cyber-text-muted)]"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3 space-y-2">
              {incidentQueue.length === 0 ? (
                <p className="text-sm text-[var(--cyber-text-muted)]">No items in queue.</p>
              ) : (
                incidentQueue.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-[var(--cyber-border)] bg-[var(--cyber-surface-2)]/50 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[var(--cyber-text)] truncate">{item.title}</p>
                        <p className="text-xs text-[var(--cyber-text-muted)] mt-0.5">
                          <SeverityBadge severity={item.severity} size="xs" /> · {item.module}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromQueue(item.id)}
                        className="shrink-0 rounded p-1 text-[var(--cyber-text-muted)] hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// --- Main content: sub-pages or threat table ---
function MainContent() {
  const { activeModule, activeSeverity, allItems, incidentQueue } = useCyber();

  const overviewStats: OverviewStats = useMemo(() => {
    const bySeverity: OverviewStats["bySeverity"] = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
    };

    const byModule: OverviewStats["byModule"] = {
      Vulnerability: 0,
      Alerts: 0,
      Assets: 0,
      Detection: 0,
      Reports: 0,
      AiRAT: 0,
      Incidents: 0,
    };

    const moduleDetails: OverviewStats["moduleDetails"] = {
      Vulnerability: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      Alerts: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      Assets: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      Detection: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      Reports: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      AiRAT: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
      Incidents: { total: 0, critical: 0, high: 0, medium: 0, low: 0, sampleTitle: null },
    };

    allItems.forEach((item) => {
      if (item.severity in bySeverity) {
        bySeverity[item.severity as keyof OverviewStats["bySeverity"]] += 1;
      }
      if (item.module in byModule) {
        byModule[item.module as keyof OverviewStats["byModule"]] += 1;
      }

      if (item.module in moduleDetails) {
        const key = item.module as keyof OverviewStats["moduleDetails"];
        const detail = moduleDetails[key];
        detail.total += 1;
        if (item.severity === "Critical") detail.critical += 1;
        else if (item.severity === "High") detail.high += 1;
        else if (item.severity === "Medium") detail.medium += 1;
        else if (item.severity === "Low") detail.low += 1;
        if (!detail.sampleTitle) {
          detail.sampleTitle = item.title;
        }
      }
    });

    return {
      totalThreats: allItems.length,
      bySeverity,
      byModule,
      incidentQueueCount: incidentQueue.length,
      moduleDetails,
    };
  }, [allItems, incidentQueue]);

  if (activeModule === "overview")
    return (
      <div className="flex-1 overflow-auto p-2 bg-[var(--cyber-surface-2)]">
        <OverviewDashboard stats={overviewStats} />
      </div>
    );
  if (activeModule === "vulnerability")
    return (
      <div className="flex-1 overflow-auto p-2">
        <VulnerabilitiesPage severityFilter={activeSeverity} />
      </div>
    );
  if (activeModule === "alerts")
    return (
      <div className="flex-1 overflow-auto p-2">
        <AlertsPage severityFilter={activeSeverity} />
      </div>
    );
  if (activeModule === "assets")
    return (
      <div className="flex-1 overflow-auto p-2">
        <AssetsPage />
      </div>
    );
  if (activeModule === "detection")
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <ThreatTable />
        <Pagination />
      </div>
    );
  if (activeModule === "reports")
    return (
      <div className="flex-1 overflow-auto p-2">
        <ReportsPage />
      </div>
    );
  if (activeModule === "airat")
    return (
      <div className="flex-1 overflow-auto p-2">
        <AiratDashboard />
      </div>
    );
  if (activeModule === "incidents")
    return (
      <div className="flex-1 overflow-auto p-2">
        <IncidentsPage severityFilter={activeSeverity} />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <FilterBar />
      <ThreatTable />
      <Pagination />
    </div>
  );
}

// --- Toasts ---
function ToastList() {
  const { toasts } = useCyber();
  return (
    <div className="absolute bottom-4 right-4 z-[200] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="rounded-lg bg-slate-900 text-white px-4 py-2 text-sm shadow-lg"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// --- Hero ---


// --- Demo content (inside monitor) ---
function DemoContent() {
  return (
    <div className="flex flex-col h-full min-h-0 bg-[var(--cyber-surface-1)]">
      <TopNavbar />
      <FilterBar />
      <MainContent />
    </div>
  );
}

// --- Page ---
export default function CyberSecurity({ isEmbedded }: { isEmbedded?: boolean }) {
  if (isEmbedded) {
    return (
      <div className="cyber-demo-page cyber-demo-page--embedded w-full flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-[1400px]">
          <Monitor title="AiRat Cybersecurity Demo">
            <div id="demo-cyber-root" className="cyber-ui xdr-ui h-full flex flex-col">
              <CyberProvider>
                <DemoContent />
                <IncidentPanel />
                <ToastList />
              </CyberProvider>
            </div>
          </Monitor>
        </div>
      </div>
    );
  }

  return (
    <AiratShell>
      <SiteHeader />

      <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
        <section className="sp-hero dp-hero">
          <span className="sp-eyebrow">Cybersecurity Operations</span>
          <h1 className="sp-hero__h1">SOC Monitoring & Incident Response.</h1>
          <p className="sp-hero__body">
            Centralized operational view for alerts, attack-chain visibility, and 
            investigation workflows across critical systems. Built for speed and clarity.
          </p>
        </section>

        <div className="px-6 w-full relative z-10" style={{ marginTop: '2rem' }}>
          <Monitor title="AiRat Cybersecurity Demo">
            <div id="demo-cyber-root" className="cyber-ui xdr-ui h-full flex flex-col">
              <CyberProvider>
                <DemoContent />
                <IncidentPanel />
                <ToastList />
              </CyberProvider>
            </div>
          </Monitor>
        </div>
      </main>

      <SiteFooter />
    </AiratShell>
  );
}
