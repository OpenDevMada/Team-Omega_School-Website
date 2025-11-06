import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function WebsiteLayout() {
  return (
    <div className="w-full min-h-screen">
      <Toaster position="bottom-center" richColors />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}