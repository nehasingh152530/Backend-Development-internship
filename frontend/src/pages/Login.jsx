import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckSquare, ShieldCheck } from 'lucide-react';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-5xl items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-soft backdrop-blur lg:grid-cols-2">
        <aside className="hidden bg-slate-900 p-10 text-slate-100 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow">
              <CheckSquare size={22} />
            </div>
            <h2 className="text-3xl font-bold leading-tight">Own your day with a cleaner task workflow.</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Built for focused teams who want speed, clarity, and premium productivity.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-xs font-medium text-slate-300">
            <ShieldCheck size={14} />
            Enterprise-grade secured sessions
          </div>
        </aside>

        <section className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">Sign in</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-2 text-sm text-slate-500">Access your tasks and keep momentum going.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="input-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            New here?{' '}
            <Link to="/register" className="font-semibold text-brand-600 transition hover:text-brand-700">
              Create account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Login;
