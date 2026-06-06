import React, { useState, useEffect, useRef } from 'react';
import {
    Maximize2
} from 'lucide-react';
import AiratShell from '../components/AiratShell';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import XdrDashboard from './XdrDashboard';
import WindowsReplica from './WindowsReplica'
import '../styles/demo-xdr-page.css';

// Design dimensions – content is authored at this size and scaled to fit
const DESIGN_W = 1280;
const DESIGN_H = 720; // 16:9 of 1280

const Monitor = ({ children, title }: { children: React.ReactNode, title: string }) => {
    const screenRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const el = screenRef.current;
        if (!el) return;
        const update = (rect: DOMRectReadOnly) => {
            const scaleW = rect.width / DESIGN_W;
            const scaleH = rect.height / DESIGN_H;
            setScale(Math.min(scaleW, scaleH));
        };
        const obs = new ResizeObserver(entries => update(entries[0].contentRect));
        obs.observe(el);
        update(el.getBoundingClientRect());
        return () => obs.disconnect();
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            screenRef.current?.requestFullscreen().catch((err: any) => console.log(err));
        } else {
            document.exitFullscreen();
        }
    };

    return (
        <div className="w-full bg-transparent flex flex-col font-sans">
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
                            background: '#0a0d0e',
                            aspectRatio: '16/9',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: `${DESIGN_W}px`,
                                height: `${DESIGN_H}px`,
                                transform: `translate(-50%, -50%) scale(${scale})`,
                                transformOrigin: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            {children}
                        </div>

                        <button
                            onClick={toggleFullscreen}
                            style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, padding: '0.5rem', borderRadius: '0.375rem', background: 'rgba(20,20,19,0.8)', color: 'var(--dim)', border: '1px solid rgba(255,255,255,0.1)' }}
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

const HeroSection = () => {
    return (
        <section className="sp-hero dp-hero">
            <span className="sp-eyebrow">Extended Detection & Response</span>
            <h1 className="sp-hero__h1">Unified Security Operations & Response.</h1>
            <p className="sp-hero__body">
                Experience the unified security operations center. Correlate telemetry across endpoints,
                network, and cloud instantly with AI-powered detection and automated response.
            </p>
        </section>
    );
};

// --- MAIN DEMO PAGE ---
export default function DemoXdrPage({ isEmbedded }: { isEmbedded?: boolean }) {
    const monitorRef = useRef<HTMLDivElement>(null);
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [logs, setLogs] = useState([
        "Feb 19 14:21:05 DESKTOP-2R2QRNG Preparing Installation Environment...",
        "Feb 19 14:21:10 DESKTOP-2R2QRNG Installing AiRAT-XDR Agent v2.5.3",
        "Feb 19 14:21:15 DESKTOP-2R2QRNG Registering service with UUID: 4C4C4544-0058-4310-8048-B1C04F523933",
        "Feb 19 14:21:20 DESKTOP-2R2QRNG Connecting to XDR Console at xdr.airat.io:8443...",
        "Feb 19 14:21:25 DESKTOP-2R2QRNG Agent successfully onboarded. Status: ACTIVE",
        "Feb 20 03:35:11 DESKTOP-2R2QRNG XDR_QUARANTINE_FILE file=D:\\Viamedici\\CI\\sample.xml"
    ]);

    // AiRAT agent installation state shared between endpoint and XDR console
    const [airatInstalled, setAiratInstalled] = useState(false);
    const [airatOnboardedOn, setAiratOnboardedOn] = useState<string | null>(null);
    const [airatAgentName, setAiratAgentName] = useState<string>('DESKTOP-2R2QRNG');

    if (isEmbedded) {
        return (
            <div className="xdr-demo-page xdr-demo-page--embedded xdr-ui w-full flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-[1400px]">
                    <Monitor title="AIRAT XDR CONSOLE">
                        <XdrDashboard
                            onExecuteCommand={() => { }}
                            airatInstalled={airatInstalled}
                            airatOnboardedOn={airatOnboardedOn}
                            airatAgentName={airatAgentName}
                        />
                    </Monitor>
                </div>
            </div>
        );
    }

    // Called by the WindowsReplica installer when AiRAT successfully onboards
    const handleAiratInstalled = (onboardedOn: string, agentName: string) => {
        setAiratInstalled(true);
        setAiratOnboardedOn(onboardedOn);
        setAiratAgentName(agentName);
    };

    // Translate UI commands into Log entries
    const handleExecuteCommand = (commandName: string) => {
        if (!openWindows.includes('logs')) setOpenWindows(prev => [...prev, 'logs']);

        const now = new Date();
        const month = now.toLocaleString('en-US', { month: 'short' });
        const day = String(now.getDate()).padStart(2, '0');
        const time = now.toTimeString().split(' ')[0];

        let newLog = `${month} ${day} ${time} ${airatAgentName} `;

        switch (commandName) {
            case 'AR-quarantine file': newLog += "XDR_QUARANTINE_FILE file=C:\\Users\\Netizens\\Downloads\\Suspicious.exe"; break;
            case 'AR-block_user': newLog += "XDR_BLOCK_USER user=SYSTEM\\Netizens"; break;
            case 'AR-block_ip': newLog += "XDR_BLOCK_IP srcip=192.168.1.101"; break;
            case 'AR-isolate_host': newLog += "XDR_ISOLATE_HOST"; break;
            case 'osquery': newLog += "XDR_OSQUERY_EXEC SELECT * FROM processes;"; break;
            case 'sysmon': newLog += "XDR_SYSMON_POLL status=success"; break;
            case 'Scan System': newLog += "XDR_SCAN_INITIATED target=FULL_SYSTEM"; break;
            case 'Fetch Logs': newLog += "XDR_LOG_COLLECTION status=compressing"; break;
            case 'Update Agent': newLog += "XDR_AGENT_UPDATE version=latest"; break;
            default: newLog += `XDR_EXECUTE cmd=${commandName}`;
        }

        setLogs(prev => [...prev, newLog]);
    };

    return (
        <AiratShell>
            <SiteHeader />
            <main className="sp-main dp-main" id="main-content" style={{ paddingBottom: '6rem' }}>
                <HeroSection />

                <div
                    ref={monitorRef}
                    data-guide-id="xdr-monitors"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',       // ← force row always
                        alignItems: 'flex-start',   // ← flex-start, not center (center causes height issues)
                        justifyContent: 'center',
                        gap: '1.5rem',
                        padding: '0 1.5rem',
                        paddingTop: '3rem',
                        width: '100%',
                        maxWidth: '1800px',
                        margin: '0 auto',
                        boxSizing: 'border-box',
                    }}
                >
                    {/* MONITOR 1: DASHBOARD (LEFT - 3/4 WIDTH) */}
                    <div style={{ flex: '2 1 0%', minWidth: 0, overflow: 'hidden' }} data-guide-id="monitor-1">

                        <Monitor title="AIRAT XDR CONSOLE">
                            <XdrDashboard
                                onExecuteCommand={handleExecuteCommand}
                                airatInstalled={airatInstalled}
                                airatOnboardedOn={airatOnboardedOn}
                                airatAgentName={airatAgentName}
                            />
                        </Monitor>
                    </div>

                    {/* MONITOR 2: ENDPOINT REPLICA (RIGHT - 1/4 WIDTH) */}
                    <div style={{ flex: '1 1 0%', minWidth: 0, overflow: 'hidden' }} data-guide-id="monitor-2">
                        <Monitor title={airatAgentName}>
                            <WindowsReplica
                                logs={logs}
                                openWindows={openWindows}
                                setOpenWindows={setOpenWindows}
                                airatInstalled={airatInstalled}
                                onInstallAirat={handleAiratInstalled}
                            />
                        </Monitor>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </AiratShell>
    );
}
