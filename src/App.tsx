
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { Navbar } from './components/Navbar';
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/insights" replace />} />
            <Route path="/insights" element={"Insights"} />
            <Route path="/employees" element={"Employees "} />
            <Route path="*" element={<Navigate to="/insights" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
