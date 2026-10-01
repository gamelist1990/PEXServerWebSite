import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  NavLink,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { SiteHeader } from "./components/layout/SiteHeader";
import { DISCORD_INVITE_URL } from "./app/constants";
import { AboutPage } from "./pages/AboutPage";
import { BedrockTexturePage } from "./pages/BedrockTexturePage";
import { GuidePage } from "./pages/GuidePage";
import { HomePage } from "./pages/HomePage";
import { MinecraftSoundPage } from "./pages/MinecraftSoundPage";
import { FerrumProxyPage } from "./pages/FerrumProxyPage";
import { PexServerSoftwarePage } from "./pages/PexServerSoftwarePage";
import { StaffPage } from "./pages/StaffPage";
import { StatusPage } from "./pages/StatusPage";
import { DownloadsPage } from "./pages/DownloadsPage";
import { SurvivalPage } from "./pages/SurvivalPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppLayout />
    </BrowserRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);
  const isToolsRoute = location.pathname.startsWith("/tools");

  return (
    <div className="app-shell">
      <div className="page-noise" />
      <a className="skip-link" href="#main-content">
        本文へスキップ
      </a>
      <SiteHeader />
      <main
        id="main-content"
        className={isToolsRoute ? "app-main app-main-wide" : "app-main"}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/survival" element={<SurvivalPage />} />
          <Route
            path="/downloads/pexserver"
            element={<PexServerSoftwarePage />}
          />
          <Route
            path="/downloads/pexserver/ferrumproxy"
            element={<FerrumProxyPage />}
          />
          <Route path="/tools" element={<Navigate to="/downloads" replace />} />
          <Route
            path="/tools/pexserver"
            element={<Navigate to="/downloads/pexserver" replace />}
          />
          <Route
            path="/tools/pexserver/ferrumproxy"
            element={<Navigate to="/downloads/pexserver/ferrumproxy" replace />}
          />
          <Route
            path="/tools/bedrock-textures"
            element={<BedrockTexturePage />}
          />
          <Route path="/tools/sounds" element={<MinecraftSoundPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route
            path="*"
            element={
              <section className="panel section-hero">
                <p className="eyebrow">404</p>
                <h1>ページが見つかりません</h1>
                <NavLink className="primary-button" to="/">
                  ホームへ戻る
                </NavLink>
              </section>
            }
          />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <strong>PEXserver</strong>
        <span>Minecraft Java / Bedrock Network</span>
      </div>
      <nav className="site-footer-links" aria-label="フッターナビゲーション">
        <NavLink to="/status">Status</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        <NavLink to="/downloads">Downloads</NavLink>
        <NavLink to="/survival">Survival</NavLink>
        <NavLink to="/staff">Staff</NavLink>
        <a href={DISCORD_INVITE_URL} target="_blank" rel="noreferrer">
          Discord
        </a>
      </nav>
      <p className="site-footer-copy">© {new Date().getFullYear()} PEXserver</p>
    </footer>
  );
}

export default App;
