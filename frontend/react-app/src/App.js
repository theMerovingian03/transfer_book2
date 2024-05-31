// Misc imports
import { Route, Routes } from "react-router-dom";
import Navbar from "./misc/Navbar";
import NotFound from "./misc/NotFound";
import Contact from "./misc/Contact";

// User pages
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";
import GetProfile from "./user/GetProfile";
import Dashboard from "./user/Dashboard";
import ProtectedRoute from "./util/ProtectedRoute";
import PublicRoute from './util/PublicRoute'

// Record pages
import AddRecord from "./records/AddRecord";
import ViewRecords from "./records/ViewRecords";
import RecordDetail from "./records/RecordDetail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Misc views */}
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

        {/* User Views */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><LoginForm /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterForm /></PublicRoute>} />
        <Route path="/profile" element={<ProtectedRoute><GetProfile /></ProtectedRoute>} />

        {/* Record Views */}
        <Route path="/add" element={<ProtectedRoute><AddRecord /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><AddRecord /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><ViewRecords /></ProtectedRoute>} />
        <Route path="/records/:id" element={<ProtectedRoute><RecordDetail /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<AddRecord />} />
      </Routes>
    </>
  );
}

export default App;
