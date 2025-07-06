import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectsDashboard from "./pages/ProjectsDashboard";
import BlogsDashboard from "./pages/BlogsDashboard";
import { Toaster } from "react-hot-toast";
import AdminLayout from "./pages/AdminLayout";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<ProjectsDashboard />} />
          <Route path="blogs" element={<BlogsDashboard />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        {/* <Route path="*" element={<NotFound />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
