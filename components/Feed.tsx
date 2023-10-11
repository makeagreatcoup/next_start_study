'use client'
import React, { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList: React.FC<Record<any, any>> = ({data,handleTagClick}) =>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((item: any,index: React.Key | null | undefined)=>(
        <PromptCard key={item.id} post={item} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}
  
const Feed = () => {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  
  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type='text'
          placeholder='What are you doing?'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        ></input>
      </form>
      <PromptCardList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed