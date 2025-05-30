// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import ManageUsersPage from './pages/ManageUsersPage';
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ManageUsersPage />} />
        <Route path="/manage-users" element={<ManageUsersPage />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* Fallback route */}
      </Routes>
      <Toaster richColors />
    </Router>
  );
}

export default App;
