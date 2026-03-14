import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { seedDatabase } from "./data/storage";
import { AuthProvider } from "./lib/AuthContext";
import PageNotFound from "./lib/PageNotFound";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Favorites from "./pages/Favorites";
import AddProperty from "./pages/AddProperty";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import MapSearch from "./pages/MapSearch";
import Compare from "./pages/Compare";
import AgentProfile from "./pages/AgentProfile";
import AdminLeads from "./pages/AdminLeads";
import SeoLocationPage from "./pages/SeoLocationPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import FloatingWhatsApp from "./components/layout/FloatingWhatsApp";
import { useAuth } from "./lib/AuthContext";

seedDatabase();

function AdminRoute({ children }) {
  const { isReady, user } = useAuth();

  if (!isReady) {
    return null;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
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
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetail />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/map-search" element={<MapSearch />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/agent/epr-groups" element={<AgentProfile />} />
              <Route
                path="/add-property"
                element={
                  <AdminRoute>
                    <AddProperty />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add-property"
                element={
                  <AdminRoute>
                    <AddProperty />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/leads"
                element={
                  <AdminRoute>
                    <AdminLeads />
                  </AdminRoute>
                }
              />
              <Route path="/:seoSlug" element={<SeoLocationPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
