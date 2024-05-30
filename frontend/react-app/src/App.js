// Misc imports
import { Route, Routes } from "react-router-dom";
import Navbar from "./misc/Navbar";
import NotFound from "./misc/NotFound";
import Contact from "./misc/Contact";

// User pages
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";
import GetProfile from "./user/GetProfile";

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
        <Route path="/" element={<ViewRecords />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />

        {/* User Views */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<GetProfile />} />

        {/* Record Views */}
        <Route path="/add" element={<AddRecord />} />
        <Route path="/edit/:id" element={<AddRecord />} />
        <Route path="/records" element={<ViewRecords />} />
        <Route path="/records/:id" element={<RecordDetail />} />
        <Route path="/edit/:id" element={<AddRecord />} />
      </Routes>
    </>
  );
}

export default App;
