// filepath: src/app/api/deleteTask/route.js
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

/* ----------------------------- GET ----------------------------- */
export async function GET() {
  try {
    const tasks = await prisma.task.findMany();
    return Response.json(tasks, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Failed to get tasks" }, { status: 500 });
  }
}

/* ----------------------------- POST ----------------------------- */
export async function POST(req) {
  try {
    const data = await req.json();

    const response = await prisma.task.create({
      data,
    });

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.log(error.message);
    return Response.json({ error: "Failed to add tasks" }, { status: 500 });
  }
}

/* ----------------------------- DELETE ----------------------------- */
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    await prisma.task.delete({
      where: { id },
    });

    return Response.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
