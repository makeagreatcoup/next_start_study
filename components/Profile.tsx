import React from 'react'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export default function Profile ({children, session}: {children:React.ReactNode ,session: Session }) {
  return (
    
    <>
      {children}
      {session}
    </>
  )
}
