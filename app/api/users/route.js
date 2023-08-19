import { PrismaClient  } from '@prisma/client'
const prisma = new PrismaClient()

export async function create(request){
  const {name}=await request.json()
  const user=await prisma.user.create({
    data:{name}
  })
  return new Response(JSON.stringify(user),{status:200})
}

// 获取用户列表
export async function userList(request){
  const users=await prisma.user.findMany()
  return new Response(JSON.stringify(users),{status:200})
}

// 删除用户
export async function remove(request){
  const {id}=await request.json()
  const user=await prisma.user.delete({
    where:{id}
  })
  return new Response(JSON.stringify(user),{status:200})
}

// 更新用户
export async function update(request){
  const {id,name}=await request.json()
  const user=await prisma.user.update({
    where:{id},
    data:{name}
  })
  return new Response(JSON.stringify(user),{status:200})
}

//查询用户
export async function getUser(request){
  const {id,email}=await request.json()
  const user=await prisma.user.findUnique({
    where:{id,email}
  })
  return new Response(JSON.stringify(user),{status:200})
}