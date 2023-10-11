import prisma from '@/prisma/prisma'

export const GET = async (request) => {
  const prompts=await prisma.prompt.findMany()
  return new Response(JSON.stringify(prompts),{status:200})
} 