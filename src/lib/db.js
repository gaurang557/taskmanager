import fs from 'fs'
import path from 'path'

const dbPath = path.join(process.cwd(), 'data', 'tasks.json')

export function readTasks() {
try {
const raw = fs.readFileSync(dbPath, 'utf-8')
return JSON.parse(raw)
} catch (e) {
return []
}
}

export function writeTasks(tasks) {
fs.writeFileSync(dbPath, JSON.stringify(tasks, null, 2), 'utf-8')
}

export function generateId(tasks) {
const max = tasks.reduce((m, t) => Math.max(m, Number(t.id || 0)), 0)
return String(max + 1)
}
