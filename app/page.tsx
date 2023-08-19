import Image from 'next/image'
import Feed from '@/components/Feed'
import Nav from '@/components/Nav'
export default function Home() {
  return (
    <>
      <section className="flex-col text-center h-screen tracking-widest">
        <h1 className='head_text text-center' >一个好的程序
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI智能搜索</span>
        
        </h1>
        <p className='desc text-center'>
          现代世界发现、创造和分享创意的提示工具
        </p>
        <Feed></Feed>
      </section>
    </>
  )
}
