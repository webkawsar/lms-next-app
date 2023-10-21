

import Link from "next/link";

const Navbar = async () => {
  // const {data: session, status} = useSession();

  // console.log(status, 'status')
  
  // const session = await getServerSession(authOptions);

  // console.log(session, 'session')

  return (
    <div>
      <nav>
        <ul className="flex justify-evenly">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/server">Server</Link></li>
          <li><Link href="/client">Client</Link></li>
          <li><Link href="/extra">Extra</Link></li>
          <li><Link href="/api/auth/signin">Sign In</Link></li>
          <li><Link href="/login">Login</Link></li>
          <li><Link href="/api/auth/signout">Sign Out</Link></li>
          <li><Link href="/register">Register</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar