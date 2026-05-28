import React from "react";
import { NavLink, Link } from "react-router";
import { Users, BarChart3, Wallet, LogOut, LogIn } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  console.log("Navbar render - user:", user);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo and Brand */}
        <NavLink to="/" className="flex items-center gap-2 focus:outline-none">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-200">
            <Wallet className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              PayScale
            </span>
            <span className="ml-1 rounded bg-indigo-50 px-1.5 py-0.5 text-xxs font-semibold uppercase tracking-wider text-indigo-700">
              HR
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1" aria-label="Tabs">
          {user ? (
            <>
              <NavLink
                to="/insights"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <BarChart3 className="h-4.5 w-4.5" />
                Salary Insights
              </NavLink>
              <NavLink
                to="/employees"
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Users className="h-4.5 w-4.5" />
                Employee Directory
              </NavLink>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden text-right sm:block">
                <div className="text-xs font-semibold text-slate-900">
                  {user.email}
                </div>
                <div className="text-xxs text-slate-500">HR User</div>
              </div>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-100"
            >
              <LogIn className="h-4 w-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
