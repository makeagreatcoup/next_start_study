/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental:{
    appDir : true
  },
  images: {  
    domains: ['avatars.githubusercontent.com'], // 在这里添加你的hostname  
  }, 
}

module.exports = nextConfig
