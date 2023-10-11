'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState , useEffect } from 'react'
import {signIn , signOut , useSession , getProviders, ClientSafeProvider,} from 'next-auth/react'

type ProviderState = {
  // 定义 providers 类型
  google: ClientSafeProvider;
  facebook: ClientSafeProvider; 
  twitter: ClientSafeProvider;
};

const Nav = () => {
  const {data:session} = useSession()
  const isLogged = session?.user
  const [providers, setProviders] = useState<ProviderState | null>(null);

  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    const setThisProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }
    setThisProviders()
  },[])

  return (
    <>
      <nav className='flex-between w-full mb-16 pt-3 tracking-widest'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image src='/vercel.svg' width={50} height={50} alt='log' className='object-contain'/>
          <p className='logo_text'>AI智能搜索</p>
        </Link>
        <div className='sm:flex hidden'>
          {isLogged ? (
            <>
              <div className='flex gap-3 md:gap-5'>
                <Link href='/create-prompt' className='black_btn'>
                  开始创建
                </Link>
                <button type='button' onClick={()=>signOut()} className='outline_btn'>登出</button>
                <Link href='/profile'>
                  <Image src={session?.user?.image as string} width={30} height={30} alt='profile' className='rounded-full'/>

                </Link>
              </div>
            </>
          ):(
            <>
              {providers&&
                Object.values(providers).map((provider)=>{
                  return (
                    <button 
                      type='button' 
                      key={provider.id}
                      onClick={()=>{
                        signIn()}
                      }
                      className='black_btn'>
                        登录
                    </button>)
                })
              }
            </>
          )}
        </div>

        <div className='sm:hidden flex relative'>
          {isLogged ? (
            <>
              <div className='flex gap-3 md:gap-5'>
                <Image src={session?.user?.image as string} width={30} height={30} alt='profile' className='rounded-full'
                  onClick={()=>setToggle((prev)=>!prev)}/>
              </div>
              {toggle&&(
                <div className='dropdown'>
                  <Link href='/profile' className='dropdown_link'
                    onClick={()=>setToggle(false)}>
                      我的
                  </Link>
                  <Link href='/create-prompt' className='dropdown_link'onClick={()=>setToggle(false)}>
                      创建
                  </Link>
                  <button type='button' onClick={()=>{
                    setToggle(false)
                    signOut()
                  }} className='mt-5 w-full black_btn'>登出</button>
                </div>
              )}
              </>
          ):(
            <>
              {providers&&
                Object.values(providers).map((provider)=>{
                  return (
                    <button 
                      type='button' 
                      key={provider.id}
                      onClick={()=>{
                        signIn(provider.id)}
                      }
                      className='black_btn'>
                        登录
                    </button>)
                })
              }
            </>
          )}
        </div>
      </nav>
    </>

  )
}

export default Nav