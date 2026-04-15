import React from 'react';
import { Pencil, Trash2, Clock, CheckCircle } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusStyles = {
    pending: {
      badge: 'border-amber-200 bg-amber-50 text-amber-700',
      icon: Clock,
      label: 'Pending',
    },
    'in-progress': {
      badge: 'border-sky-200 bg-sky-50 text-sky-700',
      icon: Clock,
      label: 'In Progress',
    },
    completed: {
      badge: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      icon: CheckCircle,
      label: 'Completed',
    },
  };

  const currentStatus = statusStyles[task.status] ?? statusStyles.pending;
  const StatusIcon = currentStatus.icon;
  const createdDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold leading-snug text-slate-900" title={task.title}>
          {task.title}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${currentStatus.badge}`}
        >
          <StatusIcon size={12} />
          {currentStatus.label}
        </span>
      </div>

      <p className="mb-5 flex-grow whitespace-pre-wrap text-sm leading-6 text-slate-600">
        {task.description || 'No description added yet.'}
      </p>

      <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {createdDate}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-brand-50 hover:text-brand-600"
            title="Edit Task"
          >
            <Pencil size={17} />
          </button>

          <button
            onClick={() => onDelete(task._id)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600"
            title="Delete Task"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
