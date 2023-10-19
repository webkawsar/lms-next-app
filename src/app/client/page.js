"use client"

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'


const ClientPage = () => {
  const session = useSession({
      required: true,
      onUnauthenticated() {
          redirect('/api/auth/signin?callbackUrl=/client')
      }
  })

  // console.log(session, 'client session')



  return (
    <div>ClientPage</div>
  )
}

export default ClientPage