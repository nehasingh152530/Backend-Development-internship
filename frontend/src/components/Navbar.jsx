import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut, Sparkles, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 border-b border-white/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow transition group-hover:scale-105">
            <CheckSquare size={22} />
          </span>
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Premium Workspace
            </span>
            <span className="block text-xl font-bold text-slate-900">TaskFlow Pro</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {token ? (
            <>
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 sm:inline-flex">
                <User size={15} />
                <span className="font-medium">
                  {user?.name}
                  {user?.role === 'admin' && ' (Admin)'}
                </span>
              </div>
              <button onClick={handleLogout} className="btn-secondary px-3 sm:px-4">
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                Login
              </Link>
              <Link to="/register" className="btn-primary px-3 sm:px-4">
                <Sparkles size={16} />
                <span className="hidden sm:inline">Get Started</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
