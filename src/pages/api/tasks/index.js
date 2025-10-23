import { readTasks, writeTasks, generateId } from '../../../lib/db'

export default function handler(req, res) {
if (req.method === 'GET') {
const tasks = readTasks()
return res.status(200).json(tasks)
}

if (req.method === 'POST') {
const { title, description } = req.body
if (!title) return res.status(400).json({ error: 'Title is required' })
const tasks = readTasks()
const newTask = {
id: generateId(tasks),
title,
description: description || '',
completed: false,
createdAt: new Date().toISOString()
}
tasks.push(newTask)
writeTasks(tasks)
return res.status(201).json(newTask)
}

res.setHeader('Allow', ['GET', 'POST'])
res.status(405).end(`Method ${req.method} Not Allowed`)
}