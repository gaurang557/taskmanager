import React from 'react'

export default function TaskList({ tasks = [], onEdit, onDelete, onToggle }) {
if (!tasks.length) return <div className="text-muted">No tasks yet.</div>
return (
<ul className="space-y-2">
{tasks.map(task => (
<li key={task.id} className="p-3 border rounded flex justify-between items-start">
<div>
<div className="flex items-center gap-2">
<input type="checkbox" checked={!!task.completed} onChange={() => onToggle(task)} />
<h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.title}</h3>
</div>
{task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
<div className="text-xs text-gray-400 mt-1">Created: {new Date(task.createdAt).toLocaleString()}</div>
</div>
<div className="flex flex-col gap-2">
<button onClick={() => onEdit(task)} className="px-3 py-1 border rounded">Edit</button>
<button onClick={() => onDelete(task)} className="px-3 py-1 rounded border bg-red-50">Delete</button>
</div>
</li>
))}
</ul>
)
}