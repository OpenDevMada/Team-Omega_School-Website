import { LoginForm } from "@/components/auth/login-form"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="md:min-h-screen min-h-[80vh] grid lg:grid-cols-2 bg-linear-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col justify-center items-center p-8">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="flex items-center justify-center gap-4 md:flex-row flex-col">
            <img
              src="/images/logo_opendev.jpg"
              alt="logo-opendev"
              className="md:rounded-full rounded-xl md:w-20 w-32 md:h-20 h-32"
            />
            <span className="md:text-5xl text-3xl ds-font font-extrabold text-(--blue) tracking-tight select-none">
              Omega School
            </span>
          </div>
        </Link>
        <div className="w-full max-w-md bg-white/50 dark:bg-gray-900 rounded-xl shadow-lg md:px-8 px-6 py-10">
          <LoginForm />
        </div>
      </div>
      <div className="relative hidden lg:block">
        <img
          src="/images/profile-bg.jpeg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover brightness-90 dark:brightness-[0.25] dark:grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-blue-900/40 dark:to-gray-900/80" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center px-10">
          <p className="text-white text-3xl font-bold text-center drop-shadow-lg">
            Heureux de te revoir chez <span className="text-blue-200">Omega School</span>
          </p>
          <p className="mt-4 text-white text-lg text-center max-w-sm opacity-80">
            Ensemble, donnons aux apprenants les moyens de batir l'avenir.
          </p>
        </div>
      </div>
    </div>
  )
}