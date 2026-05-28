import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router";
import { Navbar } from "./components/Navbar";
import { InsightsDashboard } from "./pages/Insights";
import { QueryProvider } from "./providers/QueryProviders";
import { EmployeeDirectory } from "./pages/EmployeeDirectory";
import { LoginPage } from "./pages/Login";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8 text-slate-700">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
      {!isLoginPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<RequireAuth />}>
            <Route path="/" element={<Navigate to="/insights" replace />} />
            <Route path="/insights" element={<InsightsDashboard />} />
            <Route path="/employees" element={<EmployeeDirectory />} />
          </Route>

          <Route path="*" element={<Navigate to="/insights" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
