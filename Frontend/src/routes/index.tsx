import Home from "@/app/home";
import AppLayout from "@/app/layouts/app-layout";
import WebsiteLayout from "@/app/layouts/website-layout";
import LoginPage from "@/app/login";
import NotFound from "@/app/not-found";
import ProfilePage from "@/app/profile";
import RegistrationPage from "@/app/register";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const routes = createRoutesFromElements(
  <>
    <Route element={<WebsiteLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
    </Route>
    <Route element={<AppLayout />}>
      <Route path="/profile" element={<ProfilePage />} />
    </Route>
    <Route path="/*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);