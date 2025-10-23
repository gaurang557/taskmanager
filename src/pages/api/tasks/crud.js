import React from 'react'
// filepath: /pages/api/deleteTask.js
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        var tasks = await prisma.task.findMany();
        res.status(200).json(tasks);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get tasks' });
      }
    }

    if (req.method === 'POST') {
        try {
            var response = await prisma.task.create({data: req.body});
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add tasks' });
            console.log(error.message);
        }
    }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.task.delete({ where: { id } });
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }

}
