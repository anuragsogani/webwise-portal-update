import { useState, useEffect, useRef } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
  Activity, Shield, Terminal, ArrowLeft, Eye, Download, RotateCcw, AlertCircle, XCircle 
} from 'lucide-react';
import '../styles/demo-xdr-page.css';

// --- COMPREHENSIVE MOCK DATA ---
const mockAgents = [
  { agentUuid: '550e8400-e29b-41d4-a716-446655440000', agentName: 'DESKTOP-HR-04', agentIp: '192.168.1.101', osInfo: 'Windows 10', lastSeen: '2 mins ago', status: 'Active', onboardedOn: '2026-02-10' },
  { agentUuid: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', agentName: 'SRV-PROD-01', agentIp: '192.168.1.102', osInfo: 'Ubuntu 20.04', lastSeen: '5 mins ago', status: 'Inactive', onboardedOn: '2026-02-07' },
  { agentUuid: '7ba7b810-9dad-11d1-80b4-00c04fd430c9', agentName: 'SRV-DC-WIN01', agentIp: '192.168.1.103', osInfo: 'Windows Server 2019', lastSeen: '1 hour ago', status: 'Active', onboardedOn: '2026-01-29' },
  { agentUuid: '8ba7b810-9dad-11d1-80b4-00c04fd430c0', agentName: 'MBPRO-DEV-JD', agentIp: '192.168.1.104', osInfo: 'MacOS Monterey', lastSeen: '10 mins ago', status: 'Disconnected', onboardedOn: '2026-02-15' },
  { agentUuid: '9ba7b810-9dad-11d1-80b4-00c04fd430c1', agentName: 'LNX-ANALYST-02', agentIp: '192.168.1.105', osInfo: 'Debian 11', lastSeen: 'Just now', status: 'Active', onboardedOn: '2026-03-01' }
];

const mockLogs = [
  { timestamp: '2026-03-06 10:00:00', agentUuid: '550e8400-e29b-41d4-a716-446655440000', level: 'INFO', category: 'Authentication', message: 'User login successful' },
  { timestamp: '2026-03-06 10:05:00', agentUuid: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', level: 'WARN', category: 'Network', message: 'High latency detected' },
  { timestamp: '2026-03-06 10:10:00', agentUuid: '550e8400-e29b-41d4-a716-446655440000', level: 'ERROR', category: 'Security', message: 'Unauthorized access attempt' },
  { timestamp: '2026-03-06 10:15:00', agentUuid: '7ba7b810-9dad-11d1-80b4-00c04fd430c9', level: 'INFO', category: 'System', message: 'Service started' },
  { timestamp: '2026-03-06 10:20:00', agentUuid: '9ba7b810-9dad-11d1-80b4-00c04fd430c1', level: 'DEBUG', category: 'Application', message: 'Processing request' },
  { timestamp: '2026-03-06 10:25:00', agentUuid: '550e8400-e29b-41d4-a716-446655440000', level: 'INFO', category: 'Authentication', message: 'User logout' },
  { timestamp: '2026-03-06 10:30:00', agentUuid: '8ba7b810-9dad-11d1-80b4-00c04fd430c0', level: 'CRITICAL', category: 'Database', message: 'Connection lost' }
];

const ALERT_DESCRIPTIONS = [
  'Brute-force login attempts detected on RDP port 3389',
  'Lateral movement via Pass-the-Hash identified',
  'Suspicious PowerShell encoded command execution',
  'Outbound connection to known C2 IP 185.220.101.47',
  'Privilege escalation via token impersonation',
  'Large data exfiltration to external S3 bucket',
  'Mimikatz credential dumping detected in memory',
  'Ransomware-like file rename activity (.locked extension)',
  'Anomalous LSASS memory access by non-system process',
  'New scheduled task created by unknown user',
  'DNS tunneling activity detected on port 53',
  'Unauthorized registry key modification in HKLM\\Run',
  'SMB lateral movement to 3 internal hosts',
  'Living-off-the-land: certutil.exe used to download payload',
  'DLL side-loading in C:\\Users\\Public detected',
  'Suspicious WMI subscription created for persistence',
  'Port scan from internal host 192.168.1.104',
  'Shadow copy deletion attempt via vssadmin',
  'Abnormal parent-child process: Word → cmd.exe → powershell',
  'Kerberoasting SPN enumeration observed',
];

const mockAlerts = Array.from({ length: 30 }).map((_, i) => ({
  alertId: `ALT-${2100 + i}`,
  severity: i % 5 === 0 ? 'Critical' : i % 4 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : i % 2 === 0 ? 'High' : 'Low',
  description: ALERT_DESCRIPTIONS[i % ALERT_DESCRIPTIONS.length],
  timestamp: new Date(Date.now() - i * 900000).toISOString().replace('T', ' ').substring(0, 19)
}));

const basePieData = [
  { name: 'Active', value: 44, color: '#2563eb' }, // Primary Blue
  { name: 'Inactive', value: 55, color: '#ef4444' }, // Red
  { name: 'Disconnected', value: 13, color: '#94a3b8' } // Slate
];

// Color palette for per-agent area chart series
const AGENT_CHART_COLORS = [
  '#2563eb', '#10b981', '#f59e0b',
];

// Generate last-24-hours data in 1-hour slots with real HH:00 timestamps.
const generateRealtimeChartData = (agentKeys: string[], agentStartTimes: Record<string, Date | null>) => {
  const SLOTS = 24;
  const INTERVAL_MS = 60 * 60 * 1000;
  const now = new Date();
  return Array.from({ length: SLOTS }, (_, i) => {
    const slotTime = new Date(now.getTime() - (SLOTS - 1 - i) * INTERVAL_MS);
    const label = `${String(slotTime.getHours()).padStart(2, '0')}:00`;
    const point: Record<string, any> = { time: label };
    agentKeys.forEach((key, agentIdx) => {
      const startTime = agentStartTimes[key];
      if (startTime && slotTime < startTime) { point[key] = null; return; }
      const base = 20 + (agentIdx * 12);
      const wave1 = Math.sin((i / SLOTS) * Math.PI * 4 + agentIdx * 1.8) * 14;
      const wave2 = Math.sin((i / SLOTS) * Math.PI * 7 + agentIdx * 0.9) * 8;
      const wave3 = Math.cos((i / SLOTS) * Math.PI * 2.5 + agentIdx * 2.4) * 10;
      const noise = ((agentIdx * 31 + i * 17) % 11) - 5;
      const spike = (i === 6 || i === 14 || i === 20) ? (agentIdx % 2 === 0 ? 28 : 18) : 0;
      point[key] = Math.max(3, Math.round(base + wave1 + wave2 + wave3 + noise + spike));
    });
    return point;
  });
};

const actionCommands = [
  'AR-quarantine file', 'AR-block_user', 'AR-block_ip', 'AR-isolate_host',
  'osquery', 'sysmon', 'velociraptor', 'status'
];

interface XdrDashboardProps {
    onExecuteCommand: (command: string) => void;
    airatInstalled?: boolean;
    airatOnboardedOn?: string | null;
    airatAgentName?: string;
}

export default function XdrDashboard({ onExecuteCommand, airatInstalled, airatOnboardedOn, airatAgentName }: XdrDashboardProps) {
    const [currentView, setCurrentView] = useState<'dashboard' | 'agentDetail'>('dashboard');
    const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
    const [selectedLog, setSelectedLog] = useState<any | null>(null);
    
    // Action Center State
    const [selectedCommand, setSelectedCommand] = useState('');
    const [commandResponse, setCommandResponse] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    
    // Track executed commands for agent details page
    const [executedCommands, setExecutedCommands] = useState<Array<{
        timestamp: string;
        action: string;
        command: string;
        status: string;
        response: string;
        responseType: string;
        agentUuid: string;
    }>>([]);

    // Track log entries generated by executed commands
    const [executedLogs, setExecutedLogs] = useState<Array<{
        timestamp: string;
        agentUuid: string;
        level: string;
        category: string;
        message: string;
    }>>([]);

    // Live stat counters
    const [activeAlerts, setActiveAlerts] = useState(347);
    const [eventsLogged, setEventsLogged] = useState(847);

    // Alerts tick up every 4–8s by 1–3
    useEffect(() => {
        const tick = () => {
            setActiveAlerts(prev => prev + Math.floor(Math.random() * 3) + 1);
            const next = 4000 + Math.random() * 4000;
            alertTimer.current = setTimeout(tick, next);
        };
        alertTimer.current = setTimeout(tick, 5000);
        return () => clearTimeout(alertTimer.current!);
    }, []);

    // Events tick up every 6–12s by 1–2
    useEffect(() => {
        const tick = () => {
            setEventsLogged(prev => prev + Math.floor(Math.random() * 2) + 1);
            const next = 6000 + Math.random() * 6000;
            eventsTimer.current = setTimeout(tick, next);
        };
        eventsTimer.current = setTimeout(tick, 8000);
        return () => clearTimeout(eventsTimer.current!);
    }, []);

    const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const eventsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const navigateToAgent = (id: string) => {
        if (id) {
            setSelectedAgentId(id);
            setCurrentView('agentDetail');
        }
    };

    const handleSendCommand = () => {
        if (!selectedCommand) return;
        setIsExecuting(true);
        setCommandResponse(`Sending command: ${selectedCommand}...\n`);
        
        // Triggers the mock Windows Monitor
        onExecuteCommand(selectedCommand);

        setTimeout(() => {
            setIsExecuting(false);
            const taskId = `TSK-${Math.floor(Math.random() * 10000)}`;
            const responseText = `Command executed successfully.\nResponse: Agent ${selectedAgentId} acknowledged command.\nTask ID: ${taskId}\n`;
            setCommandResponse(prev => prev + responseText);

            const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

            // Determine activity response type based on command
            const isAR = selectedCommand.startsWith('AR-');
            const responseType = isAR ? 'rollback' : 'json';
            const responsePayload = isAR
                ? `{"status": "executed", "action": "${selectedCommand}", "taskId": "${taskId}"}`
                : `{"status": "executed", "taskId": "${taskId}"}`;

            // Add to executed commands history (tagged with agentUuid)
            const newCommand = {
                timestamp: now,
                action: selectedCommand,
                command: selectedCommand,
                status: 'Successful',
                response: responsePayload,
                responseType,
                agentUuid: selectedAgentId ?? '',
            };
            setExecutedCommands(prev => [newCommand, ...prev]);

            // Derive a log entry from the command
            const logCategory = isAR ? 'Active Response'
                : selectedCommand === 'osquery' ? 'OSQuery'
                : selectedCommand === 'sysmon' ? 'Sysmon'
                : selectedCommand === 'velociraptor' ? 'Velociraptor'
                : selectedCommand === 'status' ? 'System'
                : 'Command';
            const logMessage = `Command '${selectedCommand}' executed - Task ID: ${taskId}`;

            const newLog = {
                timestamp: now,
                agentUuid: selectedAgentId ?? '',
                level: 'INFO',
                category: logCategory,
                message: logMessage,
            };
            setExecutedLogs(prev => [newLog, ...prev]);
        }, 1500);
    };

    // --- BADGE HELPERS ---
    const getAgentStatusBadge = (status: string) => {
        if (status === 'Active') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">{status}</span>;
        if (status === 'Inactive') return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">{status}</span>;
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    };

    const getSeverityBadge = (severity: string) => {
        switch(severity) {
            case 'Critical': return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800 w-20">Critical</span>;
            case 'High': return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800 w-20">High</span>;
            case 'Medium': return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 w-20">Medium</span>;
            case 'Low': return <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 w-20">Low</span>;
            default: return <span>{severity}</span>;
        }
    };

    const getLogLevelBadge = (level: string) => {
        switch(level) {
            case 'CRITICAL': return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200">CRITICAL</span>;
            case 'ERROR': return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-orange-100 text-orange-800 border border-orange-200">ERROR</span>;
            case 'WARN': return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">WARN</span>;
            case 'INFO': return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">INFO</span>;
            case 'DEBUG': return <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">DEBUG</span>;
            default: return <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">{level}</span>;
        }
    };

    const getActivityStatusBadge = (status: string) => {
        if (status === 'Successful') return <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">Successful</span>;
        if (status === 'Failed') return <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">Failed</span>;
        if (status === 'In-Queue') return <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">In-Queue</span>;
        return <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">{status}</span>;
    };

    // Add AiRAT agent to list if installed
    const allAgents = airatInstalled && airatOnboardedOn 
        ? [
            { 
                agentUuid: 'airat-agent-001', 
                agentIp: '192.168.1.100', 
                osInfo: 'Windows 10 Pro', 
                lastSeen: 'Just now', 
                status: 'Active', 
                onboardedOn: airatOnboardedOn,
                agentName: airatAgentName || 'DESKTOP-2R2QRNG'
            },
            ...mockAgents
          ]
        : mockAgents;

    // Update pie data based on AiRAT installation
    const pieData = airatInstalled 
        ? [
            { name: 'Active', value: 45, color: '#2563eb' },
            { name: 'Inactive', value: 55, color: '#ef4444' },
            { name: 'Disconnected', value: 13, color: '#94a3b8' }
          ]
        : basePieData;

    // Per-agent area chart - top 3 agents only, real-time 5-min slots
    const top3Agents = allAgents.slice(0, 3);
    const chartAgentKeys = top3Agents.map((a: any) => a.agentName);
    const agentStartTimes: Record<string, Date | null> = {};
    top3Agents.forEach((a: any) => {
        if (a.agentUuid === 'airat-agent-001' && airatOnboardedOn) {
            // Use the exact install timestamp so airat line starts from now
            agentStartTimes[a.agentName] = new Date();
        } else {
            agentStartTimes[a.agentName] = null; // always active
        }
    });
    const [chartData, setChartData] = useState(
        () => generateRealtimeChartData(chartAgentKeys, agentStartTimes)
    );

    // Re-seed chart when agent list changes
    const chartAgentKeysStr = chartAgentKeys.join(',');
    useEffect(() => {
        setChartData(generateRealtimeChartData(chartAgentKeys, agentStartTimes));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartAgentKeysStr, airatOnboardedOn]);

    // Real-time tick: every 3 s, drop oldest point and append a new one
    useEffect(() => {
        const ticker = setInterval(() => {
            setChartData(prev => {
                const now = new Date();
                const label = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
                const newPoint: Record<string, any> = { time: label };
                chartAgentKeys.forEach((key, agentIdx) => {
                    const last = prev[prev.length - 1]?.[key] ?? (20 + agentIdx * 12);
                    const delta = Math.round((Math.random() - 0.45) * 12);
                    newPoint[key] = Math.max(2, Math.min(90, last + delta));
                });
                return [...prev.slice(1), newPoint];
            });
        }, 3000);
        return () => clearInterval(ticker);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chartAgentKeysStr]);

    // --- VIEW: DASHBOARD ---
    const DashboardView = () => (
        <div className="space-y-6">
            {/* TOP STATS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5" data-guide-id="xdr-header-stats">
                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm hover:shadow-md transition-all hover:border-blue-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200">+{airatInstalled ? '6' : '5'}%</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--xdr-text)] mb-1">{airatInstalled ? 113 : 112}</h3>
                    <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider">Total Agents</p>
                </div>

                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm hover:shadow-md transition-all hover:border-red-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-red-50 text-red-700 rounded-full border border-red-200">Live</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--xdr-text)] mb-1">{activeAlerts}</h3>
                    <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider">Active Alerts</p>
                </div>

                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm hover:shadow-md transition-all hover:border-green-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                            <Activity className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-green-50 text-green-700 rounded-full border border-green-200">24h</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--xdr-text)] mb-1">{eventsLogged}</h3>
                    <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider">Events Logged</p>
                </div>

                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm hover:shadow-md transition-all hover:border-amber-300 cursor-pointer group">
                    <div className="flex items-center justify-between mb-3">
                        <div className="p-2.5 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                            <Terminal className="w-5 h-5 text-amber-600" />
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-200">Today</span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[var(--xdr-text)] mb-1">{12 + executedCommands.length}</h3>
                    <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider">Actions Executed</p>
                </div>
            </div>

            {/* CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* AREA CHART - top 3 agents, last 24h hourly */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm lg:col-span-2" data-guide-id="xdr-agent-activity-chart">
                    <h3 className="text-sm font-bold text-[var(--xdr-text-soft)] mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-blue-600" /> Top 3 Agents - Alert Activity (Last 24 Hours)
                    </h3>
                    <p className="text-[11px] text-slate-400 mb-3">Alerts per hour · live</p>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                {chartAgentKeys.map((key, idx) => (
                                    <linearGradient key={key} id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={AGENT_CHART_COLORS[idx % AGENT_CHART_COLORS.length]} stopOpacity={0.35}/>
                                        <stop offset="95%" stopColor={AGENT_CHART_COLORS[idx % AGENT_CHART_COLORS.length]} stopOpacity={0.03}/>
                                    </linearGradient>
                                ))}
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis 
                                dataKey="time"
                                tick={{ fontSize: 10, fill: '#94a3b8' }}
                                stroke="#e2e8f0"
                                interval={3}
                                tickLine={false}
                            />
                            <YAxis 
                                tick={{ fontSize: 10, fill: '#94a3b8' }}
                                stroke="#e2e8f0"
                                tickLine={false}
                                axisLine={false}
                            />
                            <RechartsTooltip 
                                contentStyle={{ 
                                    backgroundColor: 'var(--xdr-surface-1)', 
                                    border: '1px solid var(--xdr-border)', 
                                    borderRadius: '8px',
                                    fontSize: '11px',
                                    color: 'var(--xdr-text)',
                                    padding: '8px 12px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                labelStyle={{ color: 'var(--xdr-text)', fontWeight: 'bold', marginBottom: 4 }}
                            />
                            <Legend 
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ fontSize: '10px', paddingTop: '8px' }}
                            />
                            {chartAgentKeys.map((key, idx) => (
                                <Area
                                    key={key}
                                    type="natural"
                                    dataKey={key}
                                    name={key}
                                    stroke={AGENT_CHART_COLORS[idx % AGENT_CHART_COLORS.length]}
                                    strokeWidth={1.5}
                                    fill={`url(#grad-${idx})`}
                                    dot={false}
                                    activeDot={{ r: 3 }}
                                    connectNulls={false}
                                    isAnimationActive={false}
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* PIE CHART */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-5 border border-[var(--xdr-border)] shadow-sm flex flex-col lg:col-span-1" data-guide-id="xdr-agent-status-donut">
                    <h3 className="text-sm font-bold text-[var(--xdr-text-soft)] mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" /> Agent Status Distribution
                    </h3>
                    <div className="flex flex-row items-center justify-between flex-1 gap-3 mt-1">
                        {/* SVG Donut - fills the card height */}
                        <div className="shrink-0">
                        <svg width="200" height="200" viewBox="0 0 200 200">
                            {(() => {
                                const total = pieData.reduce((s, d) => s + d.value, 0);
                                const cx = 100, cy = 100, R = 88, r = 56;
                                const gap = 2.5;
                                let angle = -Math.PI / 2;
                                return pieData.map((seg, i) => {
                                    const frac = seg.value / total;
                                    const sweep = frac * 2 * Math.PI - (gap * Math.PI / 180);
                                    const x1 = cx + R * Math.cos(angle);
                                    const y1 = cy + R * Math.sin(angle);
                                    const x2 = cx + R * Math.cos(angle + sweep);
                                    const y2 = cy + R * Math.sin(angle + sweep);
                                    const ix1 = cx + r * Math.cos(angle + sweep);
                                    const iy1 = cy + r * Math.sin(angle + sweep);
                                    const ix2 = cx + r * Math.cos(angle);
                                    const iy2 = cy + r * Math.sin(angle);
                                    const large = sweep > Math.PI ? 1 : 0;
                                    const d = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${r} ${r} 0 ${large} 0 ${ix2} ${iy2} Z`;
                                    const midAngle = angle + sweep / 2;
                                    angle += sweep + (gap * Math.PI / 180);
                                    return (
                                        <g key={i}>
                                            <path d={d} fill={seg.color} opacity="0.92" />
                                            {frac > 0.08 && (
                                                <text x={cx + (R + r) / 2 * Math.cos(midAngle)} y={cy + (R + r) / 2 * Math.sin(midAngle)} textAnchor="middle" dominantBaseline="middle" fontSize="10" fontWeight="700" fill="white">
                                                    {Math.round(frac * 100)}%
                                                </text>
                                            )}
                                        </g>
                                    );
                                });
                            })()}
                            <text x="100" y="93" textAnchor="middle" fontSize="24" fontWeight="800" fill="var(--xdr-text)">
                                {pieData.reduce((s, d) => s + d.value, 0)}
                            </text>
                            <text x="100" y="110" textAnchor="middle" fontSize="8" fontWeight="600" fill="#94a3b8" letterSpacing="1">
                                TOTAL
                            </text>
                        </svg>
                        </div>
                        {/* Legend - right, vertically centered, no excess gap */}
                        <div className="flex flex-col justify-center gap-4 self-stretch pr-1">
                            {pieData.map((item, idx) => {
                                const total = pieData.reduce((s, d) => s + d.value, 0);
                                const pct = Math.round((item.value / total) * 100);
                                return (
                                    <div key={idx} className="flex flex-col gap-0.5">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                                            <span className="text-[10px] font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider">{item.name}</span>
                                        </div>
                                        <div className="pl-3.5 flex items-baseline gap-1">
                                            <span className="text-base font-extrabold text-[var(--xdr-text)] leading-tight">{item.value}</span>
                                            <span className="text-[10px] text-slate-400">{pct}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* AGENTS TABLE */}
            <div className="bg-[var(--xdr-surface-1)] rounded-xl border border-[var(--xdr-border)] shadow-sm overflow-hidden" data-guide-id="xdr-agents-table">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[var(--xdr-surface-2)]">
                    <h3 className="text-sm font-bold text-[var(--xdr-text)] flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" /> Registered Agents
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                        {allAgents.length} Total
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--xdr-surface-2)] border-b border-slate-100 text-xs font-bold text-[var(--xdr-text-muted)] uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Agent Name</th>
                                <th className="p-4">Agent UUID</th>
                                <th className="p-4">IP Address</th>
                                <th className="p-4">OS</th>
                                <th className="p-4">Last Seen</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Onboarded On</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-[var(--xdr-text-soft)] divide-y divide-slate-100">
                            {allAgents.map((agent: any) => (
                                <tr key={agent.agentUuid} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="p-4 font-semibold text-[var(--xdr-text)]">
                                        {agent.agentName || agent.osInfo.split(' ')[0]}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-blue-600 cursor-default"
                                            title={agent.agentUuid}
                                        >
                                            {agent.agentUuid.substring(0, 8)}...
                                        </span>
                                    </td>
                                    <td className="p-4 font-mono text-xs text-[var(--xdr-text-muted)]">{agent.agentIp}</td>
                                    <td className="p-4">{agent.osInfo}</td>
                                    <td className="p-4 text-[var(--xdr-text-muted)] text-xs">{agent.lastSeen}</td>
                                    <td className="p-4">{getAgentStatusBadge(agent.status)}</td>
                                    <td className="p-4 text-[var(--xdr-text-muted)] text-xs whitespace-nowrap">{agent.onboardedOn || '-'}</td>
                                    <td className="p-4">
                                        <button 
                                            onClick={() => navigateToAgent(agent.agentUuid)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-md shadow-sm transition-colors text-xs"
                                        >
                                            <Eye className="w-4 h-4" /> Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ALERTS TABLE */}
            <div className="bg-[var(--xdr-surface-1)] rounded-xl border border-[var(--xdr-border)] shadow-sm overflow-hidden" data-guide-id="xdr-alerts-table">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[var(--xdr-surface-2)]">
                    <h3 className="text-sm font-bold text-[var(--xdr-text)] flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600" /> Recent Security Alerts
                    </h3>
                    <span className="text-xs font-semibold px-3 py-1 bg-red-50 text-red-700 rounded-full border border-red-200">
                        {mockAlerts.length} Active
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[var(--xdr-surface-2)] border-b border-slate-100 text-xs font-bold text-[var(--xdr-text-muted)] uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Alert ID</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-[var(--xdr-text-soft)] divide-y divide-slate-100">
                            {mockAlerts.slice(0, 5).map(alert => (
                                <tr key={alert.alertId} className="hover:bg-red-50/30 transition-colors">
                                    <td className="p-4">
                                        <span className="font-mono text-xs bg-red-50 px-2 py-1 rounded text-red-700 font-bold border border-red-200">
                                            {alert.alertId}
                                        </span>
                                    </td>
                                    <td className="p-4">{getSeverityBadge(alert.severity)}</td>
                                    <td className="p-4 text-[var(--xdr-text)]">{alert.description}</td>
                                    <td className="p-4 text-[var(--xdr-text-muted)] text-xs whitespace-nowrap">{alert.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    // --- VIEW: AGENT DETAIL ---
    const AgentDetailView = () => {
        const agent = allAgents.find(a => a.agentUuid === selectedAgentId);
        if (!agent) return <div className="text-center text-[var(--xdr-text-muted)] py-10">Agent not found</div>;
        
        // Combine mock activities with executed commands for this agent
        const mockActivitiesBase = [
            { action: 'Services Report', command: 'none', status: 'Successful', response: '{"service": "running", "uptime": "99.9%"}', responseType: 'json', timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) },
            { action: 'Services Report', command: 'none', status: 'Failed', response: '/var/log/error_report_2412.zip', responseType: 'download', timestamp: new Date(Date.now() - 3600000).toISOString().replace('T', ' ').substring(0, 19) },
            { action: 'DFIR Report', command: 'none', status: 'In-Queue', response: 'Pending execution...', responseType: 'text', timestamp: new Date(Date.now() - 7200000).toISOString().replace('T', ' ').substring(0, 19) },
            { action: 'OSQuery', command: "SELECT * FROM processes WHERE name LIKE '%suspicious%'", status: 'Successful', response: '[{"pid": 1234, "name": "sus_proc"}]', responseType: 'json', timestamp: new Date(Date.now() - 10800000).toISOString().replace('T', ' ').substring(0, 19) },
            { action: 'Sysmon', command: 'none', status: 'Successful', response: 'Event ID 1: Process Creation...', responseType: 'text', timestamp: new Date(Date.now() - 14400000).toISOString().replace('T', ' ').substring(0, 19) },
            { action: 'Active Response', command: '[blockip 192.168.1.100]', status: 'Successful', response: '{"status": "blocked", "ip": "192.168.1.100"}', responseType: 'rollback', timestamp: new Date(Date.now() - 18000000).toISOString().replace('T', ' ').substring(0, 19) }
        ];
        
        // Show executed commands for the currently viewed agent (all agents, not just airat)
        const agentActivities = [
            ...executedCommands.filter(c => c.agentUuid === selectedAgentId),
            ...mockActivitiesBase,
        ];

        return (
            <div className="space-y-5" data-guide-id="xdr-agent-detail">
                {/* Back Button */}
                <button 
                    onClick={() => setCurrentView('dashboard')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </button>

                {/* Agent Info Card */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-6 border border-[var(--xdr-border)] shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-xl font-extrabold text-[var(--xdr-text)] flex items-center gap-3">
                            <Shield className="w-6 h-6 text-blue-600" />
                            {agent.agentName || agent.osInfo.split(' ')[0]}
                        </h2>
                        {getAgentStatusBadge(agent.status)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <div className="bg-[var(--xdr-surface-2)] p-4 rounded-lg border border-[var(--xdr-border)]">
                            <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider mb-2">Agent UUID</p>
                            <p className="font-mono text-xs text-blue-600 break-all bg-[var(--xdr-surface-1)] px-2 py-1 rounded border border-blue-100">{agent.agentUuid}</p>
                        </div>
                        <div className="bg-[var(--xdr-surface-2)] p-4 rounded-lg border border-[var(--xdr-border)]">
                            <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider mb-2">IP Address</p>
                            <p className="font-mono text-sm text-[var(--xdr-text)]">{agent.agentIp}</p>
                        </div>
                        <div className="bg-[var(--xdr-surface-2)] p-4 rounded-lg border border-[var(--xdr-border)]">
                            <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider mb-2">Operating System</p>
                            <p className="text-sm text-[var(--xdr-text)] font-medium">{agent.osInfo}</p>
                        </div>
                        <div className="bg-[var(--xdr-surface-2)] p-4 rounded-lg border border-[var(--xdr-border)]">
                            <p className="text-xs font-semibold text-[var(--xdr-text-muted)] uppercase tracking-wider mb-2">Onboarded On</p>
                            <p className="text-sm text-[var(--xdr-text)] font-medium">{agent.onboardedOn}</p>
                        </div>
                    </div>
                </div>

                {/* Action Center */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl p-6 border border-[var(--xdr-border)] shadow-sm" data-guide-id="xdr-action-center">
                    <h3 className="text-sm font-bold text-[var(--xdr-text)] mb-4 flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-blue-600" /> Action Center
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold text-[var(--xdr-text-muted)] mb-2">Select Command</label>
                            <select 
                                value={selectedCommand}
                                onChange={(e) => setSelectedCommand(e.target.value)}
                                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[var(--xdr-surface-1)]"
                            >
                                <option value="">-- Choose an action --</option>
                                {actionCommands.map(cmd => (
                                    <option key={cmd} value={cmd}>{cmd}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button 
                                onClick={handleSendCommand}
                                disabled={!selectedCommand || isExecuting}
                                className="w-full px-5 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
                            >
                                {isExecuting ? 'Executing...' : 'Execute'}
                            </button>
                        </div>
                    </div>
                    {commandResponse && (
                        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs leading-relaxed whitespace-pre-wrap border border-slate-700">
                            {commandResponse}
                        </div>
                    )}
                </div>

                {/* Logs Table */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl border border-[var(--xdr-border)] shadow-sm overflow-hidden" data-guide-id="xdr-agent-logs">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[var(--xdr-surface-2)]">
                        <h3 className="text-sm font-bold text-[var(--xdr-text)] flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-blue-600" /> Agent Logs
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                            {[...executedLogs.filter(l => l.agentUuid === agent.agentUuid), ...mockLogs.filter(log => log.agentUuid === agent.agentUuid)].length} Entries
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[var(--xdr-surface-2)] border-b border-slate-100 text-xs font-bold text-[var(--xdr-text-muted)] uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">Level</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4">Message</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-[var(--xdr-text-soft)] divide-y divide-slate-100">
                                {[...executedLogs.filter(l => l.agentUuid === agent.agentUuid), ...mockLogs.filter(log => log.agentUuid === agent.agentUuid)].map((log, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-4 text-[var(--xdr-text-muted)] whitespace-nowrap text-xs">{log.timestamp}</td>
                                        <td className="p-4">{getLogLevelBadge(log.level)}</td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-[var(--xdr-text-muted)] px-2 py-1 rounded text-xs font-medium">
                                                {log.category}
                                            </span>
                                        </td>
                                        <td className="p-4 max-w-md truncate">{log.message}</td>
                                        <td className="p-4">
                                            <button 
                                                onClick={() => setSelectedLog(log)}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-md shadow-sm transition-colors text-xs"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Activities Table */}
                <div className="bg-[var(--xdr-surface-1)] rounded-xl border border-[var(--xdr-border)] shadow-sm overflow-hidden" data-guide-id="xdr-recent-activities">
                    <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-[var(--xdr-surface-2)]">
                        <h3 className="text-sm font-bold text-[var(--xdr-text)] flex items-center gap-2">
                            <Activity className="w-4 h-4 text-blue-600" /> Recent Activities
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                            {agentActivities.length} Total
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[var(--xdr-surface-2)] border-b border-slate-100 text-xs font-bold text-[var(--xdr-text-muted)] uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">Action</th>
                                    <th className="p-4">Command</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Response</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-[var(--xdr-text-soft)] divide-y divide-slate-100">
                                {agentActivities.map((act, i) => (
                                    <tr key={i} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-4 text-[var(--xdr-text-muted)] whitespace-nowrap text-xs">{act.timestamp}</td>
                                        <td className="p-4 font-semibold text-[var(--xdr-text)]">{act.action}</td>
                                        <td className="p-4">
                                            <span className="bg-slate-100 text-[var(--xdr-text-muted)] px-2 py-1 rounded font-mono text-[11px] max-w-[200px] truncate inline-block" title={act.command}>
                                                {act.command}
                                            </span>
                                        </td>
                                        <td className="p-4">{getActivityStatusBadge(act.status)}</td>
                                        <td className="p-4">
                                            {act.responseType === 'download' && (
                                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-md shadow-sm transition-colors text-xs">
                                                    <Download className="w-4 h-4" /> Download
                                                </button>
                                            )}
                                            {act.responseType === 'rollback' && (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-bold bg-slate-100 text-[var(--xdr-text-muted)] px-1.5 py-0.5 rounded">JSON</span>
                                                    <button className="flex items-center gap-1 text-[11px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-1 rounded hover:bg-red-100 transition-colors">
                                                        <RotateCcw className="w-3 h-3" /> Rollback
                                                    </button>
                                                </div>
                                            )}
                                            {act.responseType === 'error' && (
                                                <span className="text-red-600 font-medium text-xs">{act.response}</span>
                                            )}
                                            {(act.responseType === 'json' || act.responseType === 'text') && (
                                                <span className="font-mono text-xs text-slate-500 truncate max-w-[250px] inline-block" title={act.response}>{act.response}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="xdr-ui xdr-dashboard h-full w-full bg-slate-50 flex flex-col overflow-hidden relative font-sans text-slate-900">
            {/* Fixed App Header */}
            <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-200 shrink-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-1.5 rounded-lg shadow-md shadow-blue-500/20">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Airat Security</h1>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full flex items-center gap-2 shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div> System Healthy
                    </span>
                </div>
            </header>

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
                <div className="max-w-7xl mx-auto pb-10">
                    {currentView === 'dashboard' ? <DashboardView /> : <AgentDetailView />}
                </div>
            </main>

            {/* Log Details Modal Overlay */}
            {selectedLog && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Terminal className="w-5 h-5 text-blue-600" /> Log Details
                            </h3>
                            <button onClick={() => setSelectedLog(null)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4 text-sm">
                            <div className="flex border-b border-slate-100 pb-3">
                                <span className="text-slate-500 font-semibold w-28 shrink-0">Timestamp:</span>
                                <span className="text-slate-800">{selectedLog.timestamp}</span>
                            </div>
                            <div className="flex border-b border-slate-100 pb-3">
                                <span className="text-slate-500 font-semibold w-28 shrink-0">Agent UUID:</span>
                                <span className="font-mono text-xs text-blue-600 break-all bg-blue-50 px-1 rounded">{selectedLog.agentUuid}</span>
                            </div>
                            <div className="flex border-b border-slate-100 pb-3 items-center">
                                <span className="text-slate-500 font-semibold w-28 shrink-0">Level:</span>
                                <span>{getLogLevelBadge(selectedLog.level)}</span>
                            </div>
                            <div className="flex border-b border-slate-100 pb-3">
                                <span className="text-slate-500 font-semibold w-28 shrink-0">Category:</span>
                                <span className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs font-medium">{selectedLog.category}</span>
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <span className="text-slate-500 font-semibold">Message:</span>
                                <div className="text-slate-800 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-xs leading-relaxed">
                                    {selectedLog.message}
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
                            <button onClick={() => setSelectedLog(null)} className="px-5 py-2 bg-white border border-slate-300 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-100 shadow-sm transition-colors">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
