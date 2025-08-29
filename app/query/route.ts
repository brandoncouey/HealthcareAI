import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
	return await prisma.user.findMany();
}

export async function GET() {
  try {
  	return Response.json(await getUsers());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
