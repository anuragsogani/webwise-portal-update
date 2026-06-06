import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import AiVisibilityPage from "./pages/AiVisibilityPage";
import BlogArticlePage from "./pages/BlogArticlePage";
import BlogCategoryPage from "./pages/BlogCategoryPage";
import BlogIndexPage from "./pages/BlogIndexPage";
import ContactPage from "./pages/ContactPage";
import GeoAeoServicePage from "./pages/GeoAeoServicePage";
import GlossaryFintechPage from "./pages/GlossaryFintechPage";
import GlossaryIndexPage from "./pages/GlossaryIndexPage";
import GlossaryPage from "./pages/GlossaryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MethodologyPage from "./pages/MethodologyPage";
import NotFoundPage from "./pages/NotFoundPage";
import PortfolioCaseStudyPage from "./pages/PortfolioCaseStudyPage";
import PortfolioIndustryPage from "./pages/PortfolioIndustryPage";
import PortfolioPage from "./pages/PortfolioPage";
import PrivacyPage from "./pages/PrivacyPage";
import ResourcesPage from "./pages/ResourcesPage";
import SeoServicePage from "./pages/SeoServicePage";
import ServicesPage from "./pages/ServicesPage";
import SxoServicePage from "./pages/SxoServicePage";
import TechnologyExpertisePage from "./pages/TechnologyExpertisePage";
import TermsPage from "./pages/TermsPage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SocProductPage from "./pages/SocProductPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import TrustPage from "./pages/TrustPage";
import { authApi } from "./api/auth";

const ApacCybersecurityPage = lazy(() => import("./pages/ApacCybersecurityPage"));
const ForMsspsPage = lazy(() => import("./pages/ForMsspsPage"));
const DemoPage = lazy(() => import("./pages/DemoPage"));
const DemoXdrPage = lazy(() => import("./pages/DemoXdrPage"));
const XdrDashboard = lazy(() => import("./pages/XdrDashboard"));
const WindowsReplica = lazy(() => import("./pages/WindowsReplica"));
const VulnerabilitiesPage = lazy(() => import("./pages/VulnerabilitiesPage"));
const ReportsPage = lazy(() => import("./pages/ReportsPage"));
const PropertySearch = lazy(() => import("./pages/PropertySearch"));
const OverviewDashboard = lazy(() => import("./pages/OverviewDashboard"));
const JobSearch = lazy(() => import("./pages/JobSearch"));
const IncidentsPage = lazy(() => import("./pages/IncidentsPage"));
const DetectionPage = lazy(() => import("./pages/DetectionPage"));
const DemoEcom = lazy(() => import("./pages/DemoEcom"));
const CyberSecurity = lazy(() => import("./pages/CyberSecurity"));
const AssetsPage = lazy(() => import("./pages/AssetsPage"));
const AndroidDemo = lazy(() => import("./pages/AndroidDemo"));
const AlertsPage = lazy(() => import("./pages/AlertsPage"));
const AiratDashboard = lazy(() => import("./pages/AiratDashboard"));
const BlogManagementPage = lazy(() => import("./pages/BlogManagementPage"));
const BlogEditorPage = lazy(() => import("./pages/BlogEditorPage"));

const mockStats = {
  totalThreats: 150,
  bySeverity: { Critical: 12, High: 34, Medium: 56, Low: 48 },
  byModule: {
    Vulnerability: 30,
    Alerts: 45,
    Assets: 20,
    Detection: 25,
    Reports: 10,
    AiRAT: 15,
    Incidents: 5,
  },
  incidentQueueCount: 8,
  moduleDetails: {
    Vulnerability: { total: 30, critical: 5, high: 10, medium: 10, low: 5, sampleTitle: "CVE-2024-1234" },
    Alerts: { total: 45, critical: 10, high: 15, medium: 15, low: 5, sampleTitle: "Brute force attempt" },
    Assets: { total: 20, critical: 2, high: 5, medium: 8, low: 5, sampleTitle: "Unsupported OS" },
    Detection: { total: 25, critical: 5, high: 8, medium: 7, low: 5, sampleTitle: "Suspicious PowerShell" },
    Reports: { total: 10, critical: 0, high: 2, medium: 5, low: 3, sampleTitle: "Monthly Summary" },
    AiRAT: { total: 15, critical: 3, high: 4, medium: 5, low: 3, sampleTitle: "Auto-triage active" },
    Incidents: { total: 5, critical: 2, high: 1, medium: 1, low: 1, sampleTitle: "Lateral movement" },
  },
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  if (!authApi.isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

const lazySuspense = <div className="section" style={{ minHeight: "40vh" }} />;

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/soc" element={<SocProductPage />} />
      <Route path="/products/:productId" element={<ProductDetailPage />} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/services/aeo-geo" element={<GeoAeoServicePage />} />
      <Route path="/services/technical-seo" element={<SeoServicePage />} />
      <Route path="/services/sxo" element={<SxoServicePage />} />
      <Route path="/services/ai-visibility" element={<AiVisibilityPage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resources/trust" element={<TrustPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/blog" element={<BlogIndexPage />} />
      <Route path="/blog/:slug" element={<BlogArticlePage />} />
      <Route path="/blog/category/:category" element={<BlogCategoryPage />} />
      <Route path="/technology-expertise" element={<TechnologyExpertisePage />} />
      <Route path="/portfolio/industry/:industrySlug" element={<PortfolioIndustryPage />} />
      <Route path="/portfolio/:slug" element={<PortfolioCaseStudyPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/apac-cybersecurity-ai-soc-automation" element={<Suspense fallback={lazySuspense}><ApacCybersecurityPage /></Suspense>} />
      <Route path="/for-mssps" element={<Suspense fallback={lazySuspense}><ForMsspsPage /></Suspense>} />
      <Route path="/glossary" element={<GlossaryIndexPage />} />
      <Route path="/glossary/:term" element={<GlossaryPage />} />
      <Route path="/industries/fintech" element={<GlossaryFintechPage />} />
      <Route path="/methodology" element={<MethodologyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/demo" element={<Suspense fallback={lazySuspense}><DemoPage /></Suspense>} />
      <Route path="/demo/demoxdrpage" element={<Suspense fallback={lazySuspense}><DemoXdrPage /></Suspense>} />
      <Route path="/demo/xdrdashboard" element={<Suspense fallback={lazySuspense}><XdrDashboard onExecuteCommand={() => {}} /></Suspense>} />
      <Route path="/demo/windowsreplica" element={<Suspense fallback={lazySuspense}><WindowsReplicaWrapper /></Suspense>} />
      <Route path="/demo/vulnerabilitiespage" element={<Suspense fallback={lazySuspense}><VulnerabilitiesPage /></Suspense>} />
      <Route path="/demo/reportspage" element={<Suspense fallback={lazySuspense}><ReportsPage /></Suspense>} />
      <Route path="/demo/propertysearch" element={<Suspense fallback={lazySuspense}><PropertySearch /></Suspense>} />
      <Route path="/demo/overviewdashboard" element={<Suspense fallback={lazySuspense}><OverviewDashboard stats={mockStats} /></Suspense>} />
      <Route path="/demo/jobsearch" element={<Suspense fallback={lazySuspense}><JobSearch /></Suspense>} />
      <Route path="/demo/incidentspage" element={<Suspense fallback={lazySuspense}><IncidentsPage /></Suspense>} />
      <Route path="/demo/detectionpage" element={<Suspense fallback={lazySuspense}><DetectionPage /></Suspense>} />
      <Route path="/demo/demoecom" element={<Suspense fallback={lazySuspense}><DemoEcom /></Suspense>} />
      <Route path="/demo/cybersecurity" element={<Suspense fallback={lazySuspense}><CyberSecurity /></Suspense>} />
      <Route path="/demo/assetspage" element={<Suspense fallback={lazySuspense}><AssetsPage /></Suspense>} />
      <Route path="/demo/androiddemo" element={<Suspense fallback={lazySuspense}><AndroidDemo /></Suspense>} />
      <Route path="/demo/alertspage" element={<Suspense fallback={lazySuspense}><AlertsPage /></Suspense>} />
      <Route path="/demo/airatdashboard" element={<Suspense fallback={lazySuspense}><AiratDashboard /></Suspense>} />
      <Route
        path="/admin/manage-blogs"
        element={
          <PrivateRoute>
            <Suspense fallback={lazySuspense}><BlogManagementPage /></Suspense>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create-blog"
        element={
          <PrivateRoute>
            <Suspense fallback={lazySuspense}><BlogEditorPage /></Suspense>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function WindowsReplicaWrapper() {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  return (
    <WindowsReplica
      logs={[]}
      openWindows={openWindows}
      setOpenWindows={setOpenWindows}
    />
  );
}
