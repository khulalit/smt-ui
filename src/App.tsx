
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
function App() {
  return (
    <BrowserRouter>
      <div>
        <main>
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
