"use client"

import { useSession } from 'next-auth/react'


const ClientPage = () => {
  const session = useSession()

  console.log(session, 'client session')



  return (
    <div>ClientPage</div>
  )
}

export default ClientPage