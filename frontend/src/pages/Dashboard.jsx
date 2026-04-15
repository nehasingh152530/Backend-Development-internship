import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Activity,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LayoutDashboard,
  Plus,
  Search,
} from 'lucide-react';
import api from '../services/api';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

const limit = 6;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalTasks, setTotalTasks] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/tasks?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`);
      const fetchedTasks = Array.isArray(response.data?.data) ? response.data.data : [];

      setTasks(fetchedTasks);
      setHasNextPage(Boolean(response.data?.pagination?.next));

      const apiTotal =
        typeof response.data?.total === 'number'
          ? response.data.total
          : typeof response.data?.totalTasks === 'number'
            ? response.data.totalTasks
            : typeof response.data?.count === 'number'
              ? response.data.count
              : fetchedTasks.length;

      setTotalTasks(apiTotal);
    } catch {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchTasks();
    }, 350);

    return () => clearTimeout(debounceTimer);
  }, [fetchTasks]);

  const statusSummary = useMemo(() => {
    return tasks.reduce(
      (summary, task) => {
        if (task.status === 'pending') summary.pending += 1;
        if (task.status === 'in-progress') summary.inProgress += 1;
        if (task.status === 'completed') summary.completed += 1;
        return summary;
      },
      { pending: 0, inProgress: 0, completed: 0 },
    );
  }, [tasks]);

  const statCards = [
    {
      label: 'Pending',
      value: statusSummary.pending,
      icon: Clock3,
      tone: 'border-amber-100 text-amber-700 from-amber-50 to-white',
    },
    {
      label: 'In Progress',
      value: statusSummary.inProgress,
      icon: Activity,
      tone: 'border-sky-100 text-sky-700 from-sky-50 to-white',
    },
    {
      label: 'Completed',
      value: statusSummary.completed,
      icon: CheckCircle2,
      tone: 'border-emerald-100 text-emerald-700 from-emerald-50 to-white',
    },
    {
      label: 'Visible Tasks',
      value: tasks.length,
      icon: LayoutDashboard,
      tone: 'border-slate-200 text-slate-700 from-slate-50 to-white',
    },
  ];

  const openCreateForm = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const handleCreateOrUpdate = async (formData, id) => {
    try {
      if (id) {
        await api.put(`/tasks/${id}`, formData);
      } else {
        await api.post('/tasks', formData);
      }

      closeForm();
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch {
        alert('Failed to delete task');
      }
    }
  };

  return (
    <div className="space-y-6">
      <section className="glass-card p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">Control center</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Task Dashboard</h1>
            <p className="mt-2 text-sm text-slate-500">
              {totalTasks > 0
                ? `${totalTasks} tasks in your workflow.`
                : 'Create your first task and start tracking progress.'}
            </p>
          </div>
          <button onClick={openCreateForm} className="btn-primary">
            <Plus size={17} />
            New Task
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map(({ label, value, icon, tone }) => (
            <div key={label} className={`rounded-2xl border bg-gradient-to-br p-4 ${tone}`}>
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide">{label}</p>
                {React.createElement(icon, { size: 16 })}
              </div>
              <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="glass-card p-4 sm:p-5">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks by title or description..."
            className="input-base pl-11"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </section>

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, index) => (
            <div key={index} className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white/60" />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass-card py-20 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Search size={28} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">No tasks found</h3>
          <p className="mt-2 text-sm text-slate-500">Try a different search or create a new task.</p>
          <button onClick={openCreateForm} className="btn-secondary mt-6">
            <Plus size={16} />
            Create Task
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} onEdit={openEditForm} onDelete={handleDelete} />
            ))}
          </div>

          <div className="glass-card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-medium text-slate-500">
              Page <span className="font-semibold text-slate-700">{page}</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((currentPage) => currentPage - 1)}
                className="btn-secondary px-3"
              >
                <ChevronLeft size={16} />
                Prev
              </button>
              <button
                type="button"
                disabled={!hasNextPage}
                onClick={() => setPage((currentPage) => currentPage + 1)}
                className="btn-secondary px-3"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {isFormOpen && (
        <TaskForm
          key={editingTask?._id ?? 'new-task'}
          onSubmit={handleCreateOrUpdate}
          onClose={closeForm}
          initialData={editingTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
