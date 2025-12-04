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
import { ProtectedRoute } from "@/app/_components/protected-route";

import CoursesPage from "@/app/courses";
import StudentsPage from "@/app/students";
import TeachersPage from "@/app/teachers";
import { AnnouncementsPage } from "@/app/announcement";
import AppCoursesPage from "@/app/app-courses";
import DashboardPage from "@/app/dashboard";
import GroupsAndLevelsPage from "@/app/groupsAndLevels";
import SiteAnnouncementsPage from "@/app/site-announcement";
import SettingsPage from "@/app/advanced";
import { Error } from "./error";
import ForgetPasswordPage from "@/app/forget-password";
import GradesPage from "@/app/grades";
import { ROUTES } from "@/utils/constants";

const routes = createRoutesFromElements(
  <>
    <Route element={<WebsiteLayout />}>
      <Route index element={<Home />} />
      <Route path={ROUTES.WEBSITE.AUTH.SIGN_IN} element={<LoginPage />} />
      <Route
        path={ROUTES.WEBSITE.AUTH.SIGN_UP}
        element={<RegistrationPage />}
      />
      <Route path={ROUTES.WEBSITE.COURSES} element={<CoursesPage />} />
      <Route
        path={ROUTES.WEBSITE.ANNOUNCEMENT}
        element={<SiteAnnouncementsPage />}
      />
      <Route
        path={ROUTES.WEBSITE.AUTH.FORGET_PASSWORD}
        element={<ForgetPasswordPage />}
      />
    </Route>
    <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />} errorElement={<Error />} hasErrorBoundary>
      <Route path={ROUTES.APP.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.APP.PROFILE} element={<ProfilePage />} />
      <Route path={ROUTES.APP.STUDENTS} element={<StudentsPage />} />
      <Route path={ROUTES.APP.TEACHERS} element={<TeachersPage />} />
      <Route path={ROUTES.APP.COURSES} element={<AppCoursesPage />} />
      <Route path={ROUTES.APP.GRADES} element={<GradesPage />} />
      <Route path={ROUTES.APP.ANNOUNCEMENT} element={<AnnouncementsPage />} />
      <Route
        path={ROUTES.APP.LEVELSANDGROUPS}
        element={<GroupsAndLevelsPage />}
      />
      <Route path={ROUTES.APP.SETTINGS} element={<SettingsPage />} />
    </Route>
    </Route>
    <Route path="/*" element={<NotFound />} />
  </>
);

export const router = createBrowserRouter(routes);
