import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Folder, FileText, Settings, RefreshCw, ChevronUp, Wifi, Volume2, Battery, 
  Search, X, Minus, Square, Check
} from 'lucide-react';
import '../styles/demo-xdr-page.css';

interface WindowsProps {
  logs: string[];
  openWindows: string[];
  setOpenWindows: React.Dispatch<React.SetStateAction<string[]>>;
  airatInstalled?: boolean;
  onInstallAirat?: (onboardedOn: string, agentName: string) => void;
  onTriggerAttack?: () => void;
}

export default function WindowsReplica({ 
  logs, 
  openWindows, 
  setOpenWindows,
  airatInstalled,
  onInstallAirat,
  onTriggerAttack
}: WindowsProps) {
  const [showHiddenIcons, setShowHiddenIcons] = useState(false);
  const [contextMenu, setContextMenu] = useState<{x: number, y: number} | null>(null);
  const [windowZIndices, setWindowZIndices] = useState<Record<string, number>>({});
  
  const logContainerRef = useRef<HTMLDivElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);

  // Installer wizard state for AiRAT.exe
  const [showInstaller, setShowInstaller] = useState(false);
  const [installerStep, setInstallerStep] = useState(0); // 0–3 = 4 pages
  const [installPath, setInstallPath] = useState('C:\\Program Files (x86)\\AiRAT-XDRAgent');
  const [agentName, setAgentName] = useState('DESKTOP-2R2QRNG');
  const [isInstalling, setIsInstalling] = useState(false);
  const [progress, setProgress] = useState(0);


  // Fake CMD flash state for attack simulation
  const [showCmdFlash, setShowCmdFlash] = useState(false);

  // Invoices folder open/close state
  const [invoicesOpen, setInvoicesOpen] = useState(false);

  // Scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, openWindows]);

  // Animate installer progress bar and notify parent when complete
  useEffect(() => {
    if (!isInstalling) return;

    setProgress(0);
    const startedAt = Date.now();
    const interval = window.setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startedAt;
        const approx = Math.min(100, Math.max(prev + 8, (elapsed / 2000) * 100));

        if (approx >= 100) {
          window.clearInterval(interval);
          setIsInstalling(false);

          // Only notify once, and only if not already installed
          if (onInstallAirat && !airatInstalled) {
            const dateString = new Date().toISOString().split('T')[0];
            onInstallAirat(dateString, agentName);
          }

          return 100;
        }

        return approx;
      });
    }, 180);

    return () => window.clearInterval(interval);
  }, [isInstalling, onInstallAirat, airatInstalled, agentName]);

  const startInstaller = () => {
    setShowInstaller(true);
    setInstallerStep(0);
    setIsInstalling(false);
    setProgress(0);
  };

  const handleDesktopClick = () => {
    setShowHiddenIcons(false);
    setContextMenu(null);
  };

  const handleHawkEyeRightClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    // Calculate position precisely within the desktop bounds so it never overflows
    if (!desktopContainerRef.current) return;
    const rect = desktopContainerRef.current.getBoundingClientRect();
    
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const menuWidth = 200; 
    const menuHeight = 220; 

    // Prevent spilling over the right edge
    if (x + menuWidth > rect.width) {
        x = rect.width - menuWidth - 10;
    }

    // Prevent spilling over the bottom edge (force it to pop upwards)
    if (y + menuHeight > rect.height) {
        y = rect.height - menuHeight - 50; // -50 accounts for the taskbar height
    }

    setContextMenu({ x, y });
  };

  const toggleWindow = (windowName: string) => {
    if (openWindows.includes(windowName)) {
      setOpenWindows(prev => prev.filter(w => w !== windowName));
    } else {
      setOpenWindows(prev => [...prev, windowName]);
      // When opening a window, bring it to front
      bringWindowToFront(windowName);
    }
  };

  // Bring window to front when clicked
  const bringWindowToFront = (windowName: string) => {
    setWindowZIndices(prev => {
      const maxZ = Math.max(0, ...Object.values(prev));
      return { ...prev, [windowName]: maxZ + 1 };
    });
  };

  // Get z-index for a window
  const getWindowZIndex = (windowName: string): number => {
    return windowZIndices[windowName] || 20;
  };

  // Open Settings Modal
  const openSettings = () => {
      setContextMenu(null);
      setShowHiddenIcons(false);
      if (!openWindows.includes('settings')) {
          setOpenWindows(prev => [...prev, 'settings']);
          bringWindowToFront('settings');
      }
  };

  // Trigger fake attack simulation when URGENT_Invoice_Q3.exe is double-clicked
  const handleInvoiceExeDoubleClick = () => {
    // Flash CMD window for ~1.8 seconds
    setShowCmdFlash(true);
    setTimeout(() => setShowCmdFlash(false), 1800);
    // Notify parent (Dashboard) to spike CPU + show toast + populate action center
    if (onTriggerAttack) onTriggerAttack();
  };

  return (
  <div 
      ref={desktopContainerRef}
      className="xdr-ui xdr-windows w-full h-full bg-cover bg-center flex flex-col relative text-[var(--xdr-text)] select-none font-[var(--font-display)] overflow-hidden"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")' }} 
      onClick={handleDesktopClick}
      onContextMenu={(e) => { if(contextMenu) e.preventDefault() }}
      data-guide-id="win-desktop"
    >
      {/* Desktop Icons */}
      <div className="flex-1 p-4 flex flex-col gap-4 items-start">
        {/* Original folder-style shortcut to open Explorer */}
        <div
          className="flex flex-col items-center gap-1 cursor-pointer hover:bg-[var(--xdr-surface-4)] p-2 rounded"
          onDoubleClick={() => toggleWindow('explorer')}
        >
          <Folder size={36} className="text-yellow-400 fill-yellow-400/20" />
          <span className="text-xs font-medium drop-shadow-md">AiRAT</span>
        </div>

        {/* Desktop application icon appears only after successful install */}
        {airatInstalled && (
          <div className="flex flex-col items-center gap-1 cursor-pointer hover:bg-white/10 p-2 rounded mt-2">
            <div className="w-10 h-10 rounded-md bg-slate-900/80 border border-slate-700 shadow-lg flex items-center justify-center overflow-hidden">
              <img
                src="/logo/airat.png"
                alt="AiRAT Agent"
                className="w-9 h-9 object-contain"
              />
            </div>
            <span className="text-[11px] font-medium drop-shadow-md text-center leading-tight">
              AiRAT Agent
            </span>
          </div>
        )}
      </div>

      {/* WINDOW 1: File Explorer */}
      {openWindows.includes('explorer') && (
        <motion.div 
          data-guide-id="win-explorer"
          drag
          dragMomentum={false}
          dragElastic={0}
          className="absolute top-10 left-4 md:left-20 w-[90%] md:w-[600px] bg-[var(--xdr-surface-2)] border border-[var(--xdr-border)] rounded-lg shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing" 
          style={{ zIndex: getWindowZIndex('explorer') }}
          onClick={(e) => { e.stopPropagation(); bringWindowToFront('explorer'); }}
        >
          <div className="bg-[var(--xdr-surface-1)] p-2 flex justify-between items-center border-b border-[var(--xdr-border)]">
            <span className="text-xs text-slate-300 ml-2">AiRAT-XDRAgent</span>
            <div className="flex gap-2">
              <Minus size={14} className="hover:text-white cursor-pointer" onClick={() => toggleWindow('explorer')}/>
              <Square size={12} className="hover:text-white cursor-pointer"/>
              <X size={14} className="hover:text-red-500 cursor-pointer" onClick={() => toggleWindow('explorer')}/>
            </div>
          </div>
          <div className="p-2 border-b border-[var(--xdr-border)] flex items-center gap-2 text-[10px] md:text-xs bg-[var(--xdr-surface-1)]">
            <span className="text-slate-400 truncate">This PC {'>'} Local Disk (C:) {'>'} Program Files (x86) {'>'}</span>
            <span className="text-white whitespace-nowrap">AiRAT-XDRAgent</span>
          </div>
          <div className="p-4 bg-[var(--xdr-surface-2)] h-64 overflow-y-auto">
            <table className="w-full text-xs text-left">
              <thead className="text-[var(--xdr-text-muted)] border-b border-[var(--xdr-border)]">
                <tr>
                  <th className="pb-2 font-normal">Name</th>
                  <th className="pb-2 font-normal hidden md:table-cell">Date modified</th>
                  <th className="pb-2 font-normal hidden md:table-cell">Type</th>
                  <th className="pb-2 font-normal">Size</th>
                </tr>
              </thead>
              <tbody>
                {['dependency', 'icon', 'logs'].map(folder => (
                  <tr key={folder} className="hover:bg-white/5 cursor-pointer">
                    <td className="py-2 flex items-center gap-2"><Folder size={14} className="text-yellow-400 fill-yellow-400" /> {folder}</td>
                    <td className="py-2 text-slate-400 hidden md:table-cell">2/19/2026 10:22 AM</td>
                    <td className="py-2 text-slate-400 hidden md:table-cell">File folder</td>
                    <td className="py-2"></td>
                  </tr>
                ))}
                {/* Invoices folder - expandable, contains the malicious .exe */}
                <tr
                  className="hover:bg-white/5 cursor-pointer group"
                  onDoubleClick={() => setInvoicesOpen(prev => !prev)}
                >
                  <td className="py-2 flex items-center gap-2">
                    <Folder size={14} className="text-yellow-300 fill-yellow-300/80" />
                    <span className="text-yellow-200 font-medium">Invoices</span>
                    <span className="text-[9px] text-slate-500 ml-1">(double-click to open)</span>
                  </td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">3/6/2026 09:41 AM</td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">File folder</td>
                  <td className="py-2"></td>
                </tr>
                {invoicesOpen && (
                  <tr
                    className="hover:bg-red-900/20 cursor-pointer border-l-2 border-red-500/40"
                    onDoubleClick={handleInvoiceExeDoubleClick}
                  >
                    <td className="py-2 pl-6 flex items-center gap-2">
                      <div className="w-3.5 h-3.5 bg-red-600 rounded-sm flex items-center justify-center shrink-0">
                        <span className="text-[8px] font-bold text-white">!</span>
                      </div>
                      <span className="text-red-400 font-medium">URGENT_Invoice_Q3.exe</span>
                      <span className="text-[9px] text-slate-500">(double-click to run)</span>
                    </td>
                    <td className="py-2 text-slate-400 hidden md:table-cell">3/6/2026 08:17 AM</td>
                    <td className="py-2 text-slate-400 hidden md:table-cell">Application</td>
                    <td className="py-2 text-slate-400">2,847 KB</td>
                  </tr>
                )}
                <tr className="hover:bg-white/5 cursor-pointer">
                  <td className="py-2 flex items-center gap-2"><FileText size={14} className="text-slate-300" /> config.ini</td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">2/23/2026 11:15 AM</td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">Configuration</td>
                  <td className="py-2 text-slate-400">2 KB</td>
                </tr>
                {/* AiRAT installer executable */}
                <tr
                  className="hover:bg-white/5 cursor-pointer"
                  onClick={startInstaller}
                >
                  <td className="py-2 flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">A</span>
                    </div>
                    <span className="text-blue-400">AiRAT.exe</span>
                  </td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">2/19/2026 10:23 AM</td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">Application</td>
                  <td className="py-2 text-slate-400">19,412 KB</td>
                </tr>
                {/* Other executables */}
                <tr className="hover:bg-white/5 cursor-pointer">
                  <td className="py-2 flex items-center gap-2">
                    <div className="w-3.5 h-3.5 bg-slate-500 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] font-bold text-white">H</span>
                    </div>
                    <span>HE_Service.exe</span>
                  </td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">2/19/2026 10:23 AM</td>
                  <td className="py-2 text-slate-400 hidden md:table-cell">Application</td>
                  <td className="py-2 text-slate-400">12,004 KB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* WINDOW 2: Log Viewer */}
      {openWindows.includes('logs') && (
        <motion.div
          data-guide-id="win-logs"
          drag
          dragMomentum={false}
          dragElastic={0}
          className="absolute top-20 md:top-24 left-4 md:left-32 w-[90%] md:w-[750px] h-[300px] md:h-[350px] bg-[var(--xdr-surface-1)] border border-[var(--xdr-border)] rounded-lg shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing" 
          style={{ zIndex: getWindowZIndex('logs') }}
          onClick={(e) => { e.stopPropagation(); bringWindowToFront('logs'); }}
        >
          <div className="bg-[var(--xdr-surface-2)] p-2 flex justify-between items-center border-b border-[var(--xdr-border)] text-[var(--xdr-text)]">
            <div className="flex items-center gap-2 text-[10px] md:text-xs truncate">
              <FileText size={14} className="text-blue-500 shrink-0" /> Notepad++ - active_response.log
            </div>
            <div className="flex gap-2 shrink-0">
              <Minus size={14} className="hover:text-black cursor-pointer" onClick={() => toggleWindow('logs')}/>
              <Square size={12} className="hover:text-black cursor-pointer"/>
              <X size={14} className="hover:bg-red-500 hover:text-white cursor-pointer" onClick={() => toggleWindow('logs')}/>
            </div>
          </div>
          <div className="flex text-xs bg-[var(--xdr-surface-2)] border-b border-[var(--xdr-border)] text-[var(--xdr-text-muted)] overflow-x-auto no-scrollbar">
            <div className="px-3 py-1 bg-[var(--xdr-surface-1)] border-t-2 border-orange-500 font-medium text-[var(--xdr-text)] flex items-center gap-2 whitespace-nowrap">
              <FileText size={12} className="text-blue-500"/> active_response.log <X size={10} className="text-slate-400 hover:text-red-500 cursor-pointer"/>
            </div>
            <div className="px-3 py-1 hover:bg-white/50 cursor-pointer flex items-center gap-2 whitespace-nowrap">
            <FileText size={12}/> AiRAT_Service.log
            </div>
          </div>
          <div ref={logContainerRef} className="flex-1 bg-[var(--xdr-surface-1)] p-2 overflow-y-auto font-mono text-[10px] md:text-[12px] text-[var(--xdr-text)] leading-relaxed whitespace-nowrap scroll-smooth">
            {logs.map((log, i) => (
              <div key={i} className={`hover:bg-[var(--xdr-accent-soft)] px-1 ${i === logs.length - 1 ? 'bg-[var(--xdr-accent-soft)] text-[var(--xdr-accent)]' : ''}`}>{log}</div>
            ))}
          </div>
        </motion.div>
      )}

      {/* WINDOW 3: Settings/Configuration */}
      {openWindows.includes('settings') && (
        <motion.div
          data-guide-id="win-settings-window"
          drag
          dragMomentum={false}
          dragElastic={0}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[420px] bg-[var(--xdr-surface-1)] border border-[var(--xdr-border)] rounded-xl shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing" 
          style={{ zIndex: getWindowZIndex('settings') }}
          onClick={(e) => { e.stopPropagation(); bringWindowToFront('settings'); }}
        >
          <div className="bg-[var(--xdr-surface-2)] p-2.5 flex justify-between items-center border-b border-[var(--xdr-border)] text-[var(--xdr-text)]">
            <div className="flex items-center gap-2">
              <img src="/logo/airat_load.png" alt="AiRAT" className="w-4 h-4 object-contain" />
              <span className="text-xs font-semibold">AiRAT-XDR Agent Configuration</span>
            </div>
            <div className="flex gap-3">
              <Minus size={14} className="text-slate-400 hover:text-slate-800 cursor-pointer" onClick={() => toggleWindow('settings')}/>
              <Square size={12} className="text-slate-400 hover:text-slate-800 cursor-pointer"/>
              <X size={14} className="text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => toggleWindow('settings')}/>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-4 bg-[var(--xdr-surface-1)] text-[var(--xdr-text)] overflow-y-auto max-h-[65vh]">
            <h2 className="text-lg font-bold tracking-tight">Configuration</h2>

            {/* Installation Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-2 border-b border-slate-100 pb-1">Installation</h3>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100">
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-slate-500 font-medium">Service Name:</span>
                  <span className="font-medium text-slate-800">AiRAT-XDRAgent</span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-slate-500 font-medium">Install Path:</span>
                  <span className="font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 truncate text-[11px]">C:\Program Files (x86)\AiRAT-XDRAgent</span>
                </div>
              </div>
            </div>

            {/* Application Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-2 border-b border-slate-100 pb-1">Application</h3>
              <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100">
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-slate-500 font-medium">UUID:</span>
                  <span className="font-mono text-slate-700 bg-white px-2 py-1 rounded border border-slate-200 text-[11px]">4C4C4544-0058-4310-8048-B1C04F523933</span>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-slate-500 font-medium">Agent Name:</span>
                  <span className="font-medium text-slate-800">{agentName}</span>
                </div>
              </div>
            </div>

            {/* Services Enabled Section */}
            <div>
              <h3 className="text-xs font-bold text-blue-600 mb-2 border-b border-slate-100 pb-1 flex items-center justify-between">
                <span>Service Enabled</span>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
                  5 / 5 Active
                </span>
              </h3>
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 grid grid-cols-1 gap-2">
                {['HE-Query', 'HE-XDR-Agent', 'HE-Sysmon', 'HE-DFIR', 'Active-Response'].map((service) => (
                  <label key={service} className="flex items-center gap-2 cursor-default group">
                    <input
                      type="checkbox"
                      checked={true}
                      readOnly
                      className="w-3 h-3 accent-blue-600 rounded border-slate-300 cursor-default pointer-events-none"
                    />
                    <span className="text-xs font-medium text-slate-700">{service}</span>
                    <span className="ml-auto text-[9px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">running</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Footer Buttons */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button 
                onClick={() => toggleWindow('settings')}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => toggleWindow('settings')}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95"
              >
                Apply
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* WINDOW 4: AiRAT Installation Wizard */}
      {showInstaller && (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[520px] bg-white border border-slate-200 rounded-xl shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ zIndex: 65 }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-50 p-3 flex justify-between items-center border-b border-slate-200 text-slate-800">
            <div className="flex items-center gap-2">
              <img src="/logo/airat_load.png" alt="AiRAT" className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold">AiRAT-XDR Agent Setup</span>
                <span className="text-[10px] text-slate-500">{`Step ${installerStep + 1} of 4`}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <X
                size={14}
                className="text-slate-400 hover:text-red-500 cursor-pointer"
                onClick={() => setShowInstaller(false)}
              />
            </div>
          </div>

          {/* Body */}
          <div className="p-6 bg-white text-slate-800 flex flex-col gap-4 max-h-[70vh] overflow-y-auto">
            {installerStep === 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight mb-1">Welcome to AiRAT-XDR Agent Setup</h2>
                <p className="text-sm text-slate-600">
                  This wizard will guide you through the installation of the AiRAT endpoint agent.
                </p>
                <div className="mt-3 bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-2 text-sm">
                  <p className="text-slate-700 font-semibold">The setup wizard will:</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Install the AiRAT service and background components.</li>
                    <li>Configure secure communication with the XDR console.</li>
                    <li>Create a desktop shortcut for quick access.</li>
                  </ul>
                </div>
              </div>
            )}

            {installerStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight mb-1">Agent Configuration</h2>
                <p className="text-sm text-slate-600">
                  Configure your agent name and install location.
                </p>
                
                {/* Agent Name Input */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Agent Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={agentName}
                    onChange={e => setAgentName(e.target.value)}
                    placeholder="Enter agent name"
                  />
                  <p className="text-[11px] text-slate-500">
                    This name will appear in the XDR dashboard to identify this endpoint.
                  </p>
                </div>

                {/* Install Path */}
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3">
                  <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    Destination folder
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      className="flex-1 border border-slate-300 rounded-md px-3 py-1.5 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={installPath}
                      onChange={e => setInstallPath(e.target.value)}
                    />
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-md border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Browse...
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    At least <span className="font-semibold">150 MB</span> of free disk space is required.
                  </p>
                </div>
              </div>
            )}

            {installerStep === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight mb-1">Ready to Install</h2>
                <p className="text-sm text-slate-600">
                  Setup is now ready to begin installing <span className="font-semibold">AiRAT-XDR Agent</span> on
                  your computer with the following settings.
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-32 text-slate-500 font-medium">Agent Name:</span>
                    <span className="font-semibold text-slate-800">{agentName}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-slate-500 font-medium">Destination folder:</span>
                    <span className="font-mono text-slate-800 break-all text-xs">{installPath}</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-slate-500 font-medium">Components:</span>
                    <span className="text-slate-800">Core Agent, Telemetry, Active Response, Auto-Update</span>
                  </div>
                  <div className="flex">
                    <span className="w-32 text-slate-500 font-medium">Startup type:</span>
                    <span className="text-slate-800">Automatic (recommended)</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500">
                  Click <span className="font-semibold">Install</span> to begin the installation. This may take a few
                  moments.
                </p>
              </div>
            )}

            {installerStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold tracking-tight mb-1">
                  {progress < 100 ? 'Installing AiRAT-XDR Agent...' : 'Installation Completed'}
                </h2>
                <p className="text-sm text-slate-600">
                  {progress < 100
                    ? 'Please wait while Setup installs AiRAT-XDR Agent on your computer.'
                    : 'AiRAT-XDR Agent has been successfully installed and onboarded to the XDR console.'}
                </p>
                <div className="space-y-3">
                  <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-600 font-mono">
                    <span>{progress < 100 ? 'Copying files...' : 'Finalizing configuration'}</span>
                    <span>{progress}%</span>
                  </div>
                </div>
                {progress >= 100 && (
                  <div className="mt-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg px-3 py-2 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>
                      Agent <span className="font-semibold">{agentName}</span> is now reporting to the XDR
                      dashboard.
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
            <div className="text-[11px] text-slate-400 font-mono">
              {installerStep === 3 && progress >= 100 ? 'Status: Completed' : 'Status: Waiting for user input'}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-1.5 rounded-md text-xs font-semibold text-slate-700 border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60"
                disabled={installerStep === 0 || isInstalling}
                onClick={() => setInstallerStep(prev => Math.max(0, prev - 1))}
              >
                Back
              </button>
              {installerStep < 2 && (
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-60"
                  disabled={isInstalling}
                  onClick={() => setInstallerStep(prev => Math.min(3, prev + 1))}
                >
                  Next
                </button>
              )}
              {installerStep === 2 && (
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-60"
                  disabled={isInstalling}
                  onClick={() => {
                    setInstallerStep(3);
                    setIsInstalling(true);
                  }}
                >
                  Install
                </button>
              )}
              {installerStep === 3 && (
                <button
                  type="button"
                  className="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm disabled:opacity-60"
                  disabled={progress < 100}
                  onClick={() => setShowInstaller(false)}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* HIDDEN ICONS FLYOUT */}
      {showHiddenIcons && (
        <div className="absolute bottom-14 right-4 w-48 bg-[#202020]/95 backdrop-blur-md border border-[#333] rounded-xl p-3 shadow-2xl z-40 grid grid-cols-4 gap-3">
           <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer"><div className="w-4 h-4 bg-blue-500 rounded-full"></div></div>
           <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer"><div className="w-4 h-4 bg-purple-500 rounded-full"></div></div>
           <div className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer"><div className="w-4 h-4 bg-orange-500 rounded-sm"></div></div>
           
           <div 
            className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-md cursor-pointer relative"
            onContextMenu={handleHawkEyeRightClick}
            onClick={(e) => e.stopPropagation()}
           >
              <div className="w-5 h-5 bg-blue-600/20 text-blue-500 rounded flex items-center justify-center shadow-[0_0_8px_rgba(37,99,235,0.5)]">
                <span className="text-[10px] font-bold">A</span>
              </div>
           </div>
        </div>
      )}

      {/* AiRAT CONTEXT MENU */}
      {contextMenu && (
        <div 
          className="absolute bg-white border border-slate-200 shadow-xl rounded-md py-1.5 z-[70] text-black text-xs w-48 font-sans"
          style={{ top: contextMenu.y, left: contextMenu.x }} 
          onClick={(e) => e.stopPropagation()}
        >
          {['HE-QUERY', 'HE-XDR-AGENT', 'HE-SYSMON', 'HE-DFIR', 'AiRAT'].map(item => (
            <div key={item} className="px-4 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between items-center group">
              <span className="font-medium text-black group-hover:text-blue-600 transition-colors">{item}</span> 
              <Check size={12} className="text-black" />
            </div>
          ))}
          <div className="h-px bg-slate-200 my-1.5"></div>
          <div className="px-4 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between items-center group">
            <span className="font-medium text-black group-hover:text-blue-600 transition-colors">Update Status</span> 
            <RefreshCw size={12} className="text-black" />
          </div>
          {/* Settings Trigger */}
          <div 
            className="px-4 py-1.5 hover:bg-slate-100 cursor-pointer flex justify-between items-center group"
            onClick={(e) => { e.stopPropagation(); openSettings(); }}
          >
            <span className="font-medium text-black group-hover:text-blue-600 transition-colors">Settings</span> 
            <Settings size={12} className="text-black" />
          </div>
        </div>
      )}

      {/* FAKE CMD FLASH - appears briefly when URGENT_Invoice_Q3.exe is run */}
      {showCmdFlash && (
        <motion.div
          data-guide-id="win-attack-sim"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] md:w-[540px] bg-black border border-gray-600 rounded shadow-2xl font-mono text-[11px] text-gray-200 z-[80] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-[#1a1a1a] px-3 py-1.5 flex items-center justify-between border-b border-gray-700">
            <span className="text-xs text-gray-300">C:\Windows\System32\cmd.exe</span>
            <div className="flex gap-2 text-gray-500">
              <Minus size={12} /><Square size={10} /><X size={12} />
            </div>
          </div>
          <div className="p-3 space-y-1 leading-relaxed">
            <p className="text-gray-400">Microsoft Windows [Version 10.0.19045.4651]</p>
            <p className="text-gray-400">(c) Microsoft Corporation. All rights reserved.</p>
            <p className="mt-2">C:\Users\Admin\Downloads\Invoices&gt; <span className="text-white">URGENT_Invoice_Q3.exe</span></p>
            <p className="text-yellow-400 animate-pulse">Extracting payload... initializing encryption routines...</p>
            <p className="text-red-400">{'>'} vssadmin delete shadows /all /quiet</p>
            <p className="text-red-400">{'>'} net stop "Windows Defender" /y</p>
            <p className="text-gray-500 animate-pulse">_</p>
          </div>
        </motion.div>
      )}

      {/* TASKBAR */}
      <div className="h-12 bg-[var(--xdr-surface-0)] border-t border-[var(--xdr-border)] flex items-center justify-between px-2 md:px-4 z-50">
        <div className="flex items-center gap-1 md:gap-2 absolute left-1/2 -translate-x-1/2">
          <div className="w-8 h-8 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer transition-colors">
            <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
              <div className="bg-blue-400 rounded-sm"></div><div className="bg-blue-400 rounded-sm"></div>
              <div className="bg-blue-400 rounded-sm"></div><div className="bg-blue-400 rounded-sm"></div>
            </div>
          </div>
          <div className="w-8 h-8 hover:bg-white/10 rounded flex items-center justify-center cursor-pointer transition-colors">
            <Search size={18} />
          </div>
          <div 
            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openWindows.includes('explorer') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            onClick={(e) => { e.stopPropagation(); toggleWindow('explorer'); }}
          >
            <Folder size={20} className="text-yellow-400 fill-yellow-400/20" />
          </div>
          <div 
            className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors ${openWindows.includes('logs') ? 'bg-white/10' : 'hover:bg-white/10'}`}
            onClick={(e) => { e.stopPropagation(); toggleWindow('logs'); }}
          >
            <FileText size={18} className="text-blue-400" />
          </div>
          {/* Settings Icon in Taskbar (shows when open) */}
          {openWindows.includes('settings') && (
            <div 
              className={`w-8 h-8 rounded flex items-center justify-center cursor-pointer transition-colors bg-white/10`}
              onClick={(e) => { e.stopPropagation(); toggleWindow('settings'); }}
            >
              <Settings size={18} className="text-slate-300" />
            </div>
          )}
        </div>

        <div></div> 

        <div className="flex items-center gap-0.5 md:gap-1 text-[10px] md:text-xs" data-guide-id="win-tray">
          <div 
            className={`h-10 px-1 md:px-2 rounded flex items-center justify-center cursor-pointer transition-colors ${showHiddenIcons ? 'bg-white/10' : 'hover:bg-white/10'}`}
            onClick={(e) => { e.stopPropagation(); setShowHiddenIcons(!showHiddenIcons); setContextMenu(null); }}
          >
            <ChevronUp size={16} />
          </div>
          <div className="h-10 px-1 md:px-2 hover:bg-white/10 rounded hidden sm:flex items-center gap-2 cursor-pointer transition-colors">
            <Wifi size={14} /><Volume2 size={14} /><Battery size={14} />
          </div>
          <div className="h-10 px-1 md:px-2 hover:bg-white/10 rounded flex flex-col items-end justify-center cursor-pointer transition-colors leading-tight">
            <span>3:12 PM</span>
            <span>3/5/2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
