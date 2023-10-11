import React from 'react'
import Link from 'next/link'

const Form : React.FC<Record<any, any>> = ({type,
  post,
  setPost,
  submitting,
  handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} 文章</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type}并分享惊人的提示词，与世界的人工智能驱动的平台交流
      </p>
      <form className='w-full flex-col mt-10 max-w-2xl flex gap-7 glassmorphism' onSubmit={handleSubmit}>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            你的AI提示词
          </span>
          <textarea 
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
            placeholder='在这里写下你的提示词'
            className='form_textarea'
          ></textarea>
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            标签
            </span>
          <input 
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
            placeholder='#tag'
            
            className='form_input'
          ></input>
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
            取消
          </Link>
          <button type='submit' className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting?`${type}...`:type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form