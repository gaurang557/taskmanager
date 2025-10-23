import { readTasks, writeTasks } from '../../../lib/db'

export default function handler(req, res) {
const {
query: { id },
method
} = req

const tasks = readTasks()
const idx = tasks.findIndex(t => String(t.id) === String(id))

if (method === 'GET') {
const task = tasks.find(t => String(t.id) === String(id))
if (!task) return res.status(404).json({ error: 'Not found' })
return res.status(200).json(task)
}

if (method === 'PUT') {
const { title, description, completed } = req.body
if (idx === -1) return res.status(404).json({ error: 'Not found' })
const updated = { ...tasks[idx], title: title ?? tasks[idx].title, description: description ?? tasks[idx].description, completed: completed ?? tasks[idx].completed }
tasks[idx] = updated
writeTasks(tasks)
return res.status(200).json(updated)
}

if (method === 'DELETE') {
if (idx === -1) return res.status(404).json({ error: 'Not found' })
const removed = tasks.splice(idx, 1)[0]
writeTasks(tasks)
return res.status(200).json(removed)
}

res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
res.status(405).end(`Method ${method} Not Allowed`)
}