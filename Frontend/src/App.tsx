import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./app/home"
import WebsiteLayout from "./app/layouts/website-layout";
import LoginPage from "./app/login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebsiteLayout><Home /></WebsiteLayout>} />
        <Route path="/login" element={<WebsiteLayout><LoginPage /></WebsiteLayout>} />
      </Routes>
    </Router>
  );
}