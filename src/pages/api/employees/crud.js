import React from 'react'
// filepath: /pages/api/deleteemployee.js
import { PrismaClient } from '../../../generated/prisma';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
        var employees = await prisma.employee.findMany();
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ error: 'Failed to get employees' });
      }
    }

    if (req.method === 'POST') {
        console.log("hitting the api");
        try {
            var response = await prisma.employee.create({data: req.body});
            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add employees' });
            console.log(error.message);
        }
    }
  if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      await prisma.employee.delete({ where: { id } });
      res.status(200).json({ message: 'employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  }

}
