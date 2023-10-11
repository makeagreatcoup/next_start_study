import prisma from '@/prisma/prisma'

// export default async function handle(
//   req,
//   res
// ) {
//   const { userId,prompt,tag } = req.body
//   console.log(userId)
//   console.log(prompt)
//   console.log(tag)
//   const obj=await prisma.prompt.create({
//     data:{
//       userId,
//       prompt,
//       tag
//     }
//   })
//   return res.status(201).json(obj)
// }

export const POST = async (req,res)=>{
  console.log(req)
  console.log(res)
  const {userId,prompt,tag} = req.json();
  console.log(userId)
  console.log(prompt)
  console.log(tag)
  const obj=await prisma.prompt.create({
    data:{
      userId,
      prompt,
      tag
    }
  })
  return res.status(201).json(obj)

}

// export async function create(request){
//   const {name}=await request.json()
//   const prompt=await prisma.prompt.create({
//     data:{name}
//   })
//   return new Response(JSON.stringify(prompt),{status:200})
// }

// // 获取
// export async function userList(request){
//   const prompts=await prisma.prompt.findMany()
//   return new Response(JSON.stringify(prompts),{status:200})
// }

// // 删除
// export async function remove(request){
//   const {id}=await request.json()
//   const prompt=await prisma.prompt.delete({
//     where:{id}
//   })
//   return new Response(JSON.stringify(prompt),{status:200})
// }

// // 更新
// export async function update(request){
//   const {id,name}=await request.json()
//   const prompt=await prisma.prompt.update({
//     where:{id},
//     data:{name}
//   })
//   return new Response(JSON.stringify(prompt),{status:200})
// }

// //查询
// export async function getObj(request){
//   const {id,email}=await request.json()
//   const prompt=await prisma.prompt.findUnique({
//     where:{id,email}
//   })
//   return new Response(JSON.stringify(prompt),{status:200})
// }