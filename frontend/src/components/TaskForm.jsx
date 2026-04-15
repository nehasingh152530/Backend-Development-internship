import React, { useState } from 'react';
import { ClipboardCheck, X } from 'lucide-react';

const getInitialFormData = (task) => ({
  title: task?.title ?? '',
  description: task?.description ?? '',
  status: task?.status ?? 'pending',
});

const TaskForm = ({ onSubmit, onClose, initialData = null }) => {
  const [formData, setFormData] = useState(() => getInitialFormData(initialData));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, initialData?._id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/70 bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <h2 className="inline-flex items-center gap-2 text-xl font-bold text-slate-900">
            <ClipboardCheck size={20} className="text-brand-600" />
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Close form"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Title</label>
            <input
              type="text"
              name="title"
              className="input-base"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Update onboarding flow"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
            <textarea
              name="description"
              className="input-base min-h-32 resize-y"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about this task..."
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Status</label>
            <select
              name="status"
              className="input-base cursor-pointer bg-white"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary px-5">
              Cancel
            </button>
            <button type="submit" className="btn-primary px-5">
              {initialData ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
