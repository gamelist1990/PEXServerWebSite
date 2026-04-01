import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/layout/SiteHeader";
import { AboutPage } from "./pages/AboutPage";
import { BedrockTexturePage } from "./pages/BedrockTexturePage";
import { GuidePage } from "./pages/GuidePage";
import { HomePage } from "./pages/HomePage";
import { StaffPage } from "./pages/StaffPage";
import { StatusPage } from "./pages/StatusPage";
import { ToolsPage } from "./pages/ToolsPage";

function App() {
  return (
    <HashRouter>
      <AppLayout />
    </HashRouter>
  );
}

function AppLayout() {
  const location = useLocation();
  const isToolsRoute = location.pathname.startsWith("/tools");

  return (
    <>
      <div className="page-shell">
        <div className="page-noise" />
        <SiteHeader />
        <main className={isToolsRoute ? "site-main site-main-wide" : "site-main"}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/status" element={<StatusPage />} />
            <Route path="/guide" element={<GuidePage />} />
            <Route path="/tools" element={<ToolsPage />} />
            <Route path="/tools/bedrock-textures" element={<BedrockTexturePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
