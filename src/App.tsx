
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { NewsProvider } from "./contexts/NewsContext";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Video = lazy(() => import("./pages/Video"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminEdit = lazy(() => import("./pages/AdminEdit"));
const AdminManage = lazy(() => import("./pages/AdminManage"));
const AdminManageVideos = lazy(() => import("./pages/AdminManageVideos"));
const Staff = lazy(() => import("./pages/Staff"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <NewsProvider>
          <TooltipProvider>
            <Toaster />
            <Router>
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/video" element={<Video />} />
                  <Route path="/news/:id" element={<NewsDetail />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin/edit/:id" element={<AdminEdit />} />
                  <Route path="/admin/manage" element={<AdminManage />} />
                  <Route path="/admin/manage-videos" element={<AdminManageVideos />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Category routes */}
                  <Route path="/:category" element={<CategoryPage />} />
                  
                  {/* 404 Route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Router>
          </TooltipProvider>
        </NewsProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;