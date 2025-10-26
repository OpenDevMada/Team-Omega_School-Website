import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./app/home"
import WebsiteLayout from "./app/layouts/website-layout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WebsiteLayout><Home /></WebsiteLayout>} />
      </Routes>
    </Router>
  );
}