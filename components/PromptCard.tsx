'use client'
import {useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname,useRouter } from 'next/navigation'

const PromptCard : React.FC<Record<any, any>> =({post,handleTagClick,handleEdit,handleDelete}) => {
  const [copied,setCopied] = useState('')
  const handleCopy = ()=>{
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout(()=>setCopied(''),2000)
  }
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image
            src={post.imageUrl}
            alt='post'
            width={40}
            height={40}
            className='rounded-full object-contain'
          ></Image>
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.userName}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.email}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt ? '/icons/copy_icon.svg' : '/icons/copy_icon_gray.svg'}
            alt='copy'
            width={12}
            height={12}
          ></Image>
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p className='font-inter text-sm blue_gradient cusror-pointer'
        onClick={()=>handleTagClick&&handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  )
}

export default PromptCard