import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectsLayout from "./pages/ProjectsLayout";
import ProjectsIndex from "./pages/Projects";
import ProjectCollection from "./pages/ProjectCollection";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import { lazy, Suspense } from "react";

// Risk dashboard prototype: lazy-loaded so its code, CSS and fonts only download on that route
const RiskPrototype = lazy(() => import("./prototypes/risk-dashboard/RiskPrototype"));

const queryClient = new QueryClient();

// Get basename from import.meta.env.BASE_URL (set by Vite)
// This will be "/" for both development and production (custom domain)
const basename = import.meta.env.BASE_URL;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={basename}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<ProjectsLayout />}>
            <Route index element={<ProjectsIndex />} />
            <Route path=":collection" element={<ProjectCollection />} />
            <Route path=":collection/:projectId" element={<ProjectDetail />} />
          </Route>
          <Route
            path="/projects/digital/risk-triage-tool/prototype/*"
            element={
              <Suspense fallback={null}>
                <RiskPrototype />
              </Suspense>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
