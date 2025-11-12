import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import AppLayout from "@/app/layouts/app-layout";
import WebsiteLayout from "@/app/layouts/website-layout";

import Home from "@/app/home";
import LoginPage from "@/app/login";
import ProfilePage from "@/app/profile";
import RegistrationPage from "@/app/register";

import NotFound from "@/app/not-found";
// import { ProtectedRoute } from "@/app/_components/protected-route";

import CoursesPage from "@/app/courses";
import StudentsPage from "@/app/students";
import TeachersPage from "@/app/teachers";
import PagesPreviewAll from "@/app/page";
import { AnnouncementsPage } from "@/app/announcement";
import AppCoursesPage from "@/app/app-courses";

const routes = createRoutesFromElements(
  <>
    <Route element={<WebsiteLayout />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/all-courses" element={<CoursesPage />} />
      <Route path="/announcements" element={<AnnouncementsPage />} />
    </Route>
    {/* <Route element={<ProtectedRoute />}> */}{" "}
    {/* Reactive it when you finish to setup all UI */}
    <Route element={<AppLayout />}>
      <Route path="/dashboard" element={<ProfilePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/teachers" element={<TeachersPage />} />
      <Route path="/courses" element={<AppCoursesPage />} />
      <Route path="/view-all" element={<PagesPreviewAll />} />
      <Route path="/announcement" element={<AnnouncementsPage />} />
    </Route>
    {/* </Route> */}
    <Route path="/*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);
