import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckSquare, Sparkles } from 'lucide-react';
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/register', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (err) {
      const errMsgs = err.response?.data?.errors?.map((errorItem) => errorItem.msg).join(', ') || err.response?.data?.error;
      setError(errMsgs || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-5xl items-center justify-center">
      <div className="grid w-full overflow-hidden rounded-3xl border border-white/70 bg-white/85 shadow-soft backdrop-blur lg:grid-cols-2">
        <aside className="hidden bg-gradient-to-br from-brand-700 via-brand-600 to-indigo-500 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 text-white">
              <CheckSquare size={22} />
            </div>
            <h2 className="text-3xl font-bold leading-tight">Build your personal command center.</h2>
            <p className="mt-4 text-sm leading-6 text-indigo-100">
              Track deadlines, priorities, and progress in one polished workflow.
            </p>
          </div>

          <ul className="space-y-2 text-sm text-indigo-100">
            <li className="inline-flex items-center gap-2">
              <Sparkles size={14} />
              Smart and clean dashboard experience
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles size={14} />
              Fast task create, edit, and status updates
            </li>
            <li className="inline-flex items-center gap-2">
              <Sparkles size={14} />
              Beautiful interface tuned for focus
            </li>
          </ul>
        </aside>

        <section className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-600">Get started</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Create Your Account</h1>
            <p className="mt-2 text-sm text-slate-500">Set up your workspace in under a minute.</p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="input-base"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="input-base"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700" htmlFor="password">
                Password (min 6 chars)
              </label>
              <input
                id="password"
                type="password"
                className="input-base"
                value={formData.password}
                onChange={handleChange}
                minLength="6"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Register;
