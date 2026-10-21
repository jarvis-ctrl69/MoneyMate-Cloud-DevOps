import { NavLink } from "react-router-dom";
import { House, BookText, ChartColumn } from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex justify-center items-center text-white text-2xl">

            💰

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-800">

              MONEYMATE

            </h1>

            <p className="text-sm text-gray-500">

              Spend Smart. Save More.

            </p>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex gap-6 text-lg font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:bg-gray-100"
              }`
            }
          >
            <House size={20} />
            Home
          </NavLink>

          <NavLink
            to="/ledger"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:bg-gray-100"
              }`
            }
          >
            <BookText size={20} />
            Ledger
          </NavLink>

          <NavLink
            to="/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-700 hover:bg-gray-100"
              }`
            }
          >
            <ChartColumn size={20} />
            Reports
          </NavLink>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;