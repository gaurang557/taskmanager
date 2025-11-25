// filepath: src/app/api/deleteemployee/route.js
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

// Simple in-memory cache (works until server restarts)
const cache = {
  employees: null,
  timestamp: null,
  ttl: 60 * 1000 // 1 minute
};

/* ----------------------------- GET ----------------------------- */
export async function GET() {
  try {
    // Return cached data if valid
    if (cache.employees && Date.now() - cache.timestamp < cache.ttl) {
      console.log("Returning cached employees");
      return Response.json(cache.employees, { status: 200 });
    }

    // Fetch from DB
    const employees = await prisma.employee.findMany();

    // Update cache
    cache.employees = employees;
    cache.timestamp = Date.now();

    return Response.json(employees, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to get employees" }, { status: 500 });
  }
}

/* ----------------------------- POST ----------------------------- */
export async function POST(req) {
  try {
    const body = await req.json();

    console.log("hitting the api");

    const response = await prisma.employee.create({ data: body });

    // Invalidate cache
    cache.employees = null;
    cache.timestamp = null;

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to add employees" }, { status: 500 });
  }
}

/* ----------------------------- DELETE ----------------------------- */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await prisma.employee.delete({
      where: { id }
    });

    // Invalidate cache
    cache.employees = null;
    cache.timestamp = null;

    return Response.json(
      { message: "Employee deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
