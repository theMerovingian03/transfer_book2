// misc imports
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./misc/Navbar";
import NotFound from "./misc/NotFound";
import Contact from "./misc/Contact";

// user pages
import LoginForm from "./user/LoginForm";
import RegisterForm from "./user/RegisterForm";
import GetProfile from "./user/GetProfile";

// record pages
import AddRecord from "./records/AddRecord";
import ViewRecords from "./records/ViewRecords";
import RecordDetail from "./records/RecordDetail";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Misc views */}
        <Route path="/"></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="*" element={<NotFound />}></Route>
        {/* User Views */}
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/register" element={<RegisterForm />}></Route>
        <Route path="/profile" element={<GetProfile />}></Route>
        {/*Record*/}
        <Route path="/add" element={<AddRecord />}></Route>
        <Route path="/records" element={<ViewRecords></ViewRecords>}></Route>
        <Route path="/record" element={<RecordDetail></RecordDetail>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
