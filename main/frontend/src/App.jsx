import { AnimatePresence, motion } from "framer-motion";
import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./lib/AuthContext";
import PageNotFound from "./lib/PageNotFound";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { useAuth } from "./lib/AuthContext";

const Home = lazy(() => import("./pages/Home"));
const Properties = lazy(() => import("./pages/Properties"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SeoLocationPage = lazy(() => import("./pages/SeoLocationPage"));

function AdminRoute({ children }) {
  const { isReady, user } = useAuth();

  if (!isReady) {
    return null;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppShell() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#0b5d3b] text-white">
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Suspense
              fallback={
                <div className="container-shell py-16">
                  <LoadingSpinner label="Loading page..." />
                </div>
              }
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plots-for-sale-in-omr" element={<SeoLocationPage />} />
                <Route path="/flats-for-sale-in-padur" element={<SeoLocationPage />} />
                <Route path="/villas-for-sale-in-ecr" element={<SeoLocationPage />} />
                <Route path="/plots-in-siruseri" element={<SeoLocationPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
