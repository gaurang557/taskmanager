import { useState, useEffect } from 'react'

export default function TaskForm({ initial = { title: '', description: '' }, onSave, onCancel }) {
const [title, setTitle] = useState(initial.title)
const [description, setDescription] = useState(initial.description)

useEffect(() => {
setTitle(initial.title)
setDescription(initial.description)
}, [initial])

function submit(e) {
e.preventDefault()
if (!title.trim()) return alert('Title required')
onSave({ title: title.trim(), description: description.trim() })
}

return (
<form onSubmit={submit} className="space-y-2">
<div>
<label className="block text-sm font-medium">Title</label>
<input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" />
</div>
<div>
<label className="block text-sm font-medium">Description</label>
<textarea value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full rounded-md border px-3 py-2" rows={3}></textarea>
</div>
<div className="flex gap-2">
<button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
<button type="button" onClick={onCancel} className="px-4 py-2 rounded border">Cancel</button>
</div>
</form>
)
}
