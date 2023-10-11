'use client'

import {useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Form from '@/components/Form'
import router from 'next/router'
interface user{
  id:string
  name:string
  email:string
  password:string
}
const CreatePrompt = () => {
  const [submitting,setSubmitting] = useState(false)
  const {data:session} = useSession()
  const [post,setPost] = useState({
    
  })

  const createPrompt = async (e:any) => {
    e.preventDefault();
    setSubmitting(true)
    console.log('开始创建')
    const data= {...post,userId:(session?.user as user).id}
    console.log(data)
    try{
      // 创建prompt
      const res = await fetch('/api/prompt/create',{
        method: 'POST',

        body:JSON.stringify(data),
      })
      console.log(res)
      if(res.ok){
        router.push('/')
      }
    }catch(e){
      console.log('创建失败')
      console.log(e)
    }finally{
      setSubmitting(false)
      console.log('结束创建')
    }
  }
  return (
    <Form 
      type='创建'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
      />
  )
}

export default CreatePrompt