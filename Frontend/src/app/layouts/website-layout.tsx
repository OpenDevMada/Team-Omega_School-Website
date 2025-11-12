import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function WebsiteLayout() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Toaster position="bottom-center" richColors />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}