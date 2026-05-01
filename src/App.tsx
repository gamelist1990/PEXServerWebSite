import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { SiteHeader } from "./components/layout/SiteHeader";
import { AboutPage } from "./pages/AboutPage";
import { BedrockTexturePage } from "./pages/BedrockTexturePage";
import { GuidePage } from "./pages/GuidePage";
import { HomePage } from "./pages/HomePage";
import { MinecraftSoundPage } from "./pages/MinecraftSoundPage";
import { FerrumProxyPage } from "./pages/FerrumProxyPage";
import { PexServerSoftwarePage } from "./pages/PexServerSoftwarePage";
import { StaffPage } from "./pages/StaffPage";
import { StatusPage } from "./pages/StatusPage";
import { ToolsPage } from "./pages/ToolsPage";

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppLayout />
    </BrowserRouter>
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
            <Route path="/tools/pexserver" element={<PexServerSoftwarePage />} />
            <Route path="/tools/pexserver/ferrumproxy" element={<FerrumProxyPage />} />
            <Route path="/tools/bedrock-textures" element={<BedrockTexturePage />} />
            <Route path="/tools/sounds" element={<MinecraftSoundPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/staff" element={<StaffPage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
