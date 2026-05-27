
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Navbar } from './components/Navbar';
import { InsightsDashboard } from './pages/Insights';
import { QueryProvider } from './providers/QueryProviders';
function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/insights" replace />} />
              <Route path="/insights" element={<InsightsDashboard />} />
              <Route path="/employees" element={"Employees "} />
              <Route path="*" element={<Navigate to="/insights" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryProvider>
  );
}

export default App;
