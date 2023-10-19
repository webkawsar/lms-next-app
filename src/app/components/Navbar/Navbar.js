import Link from "next/link"

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="flex justify-evenly">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/client">Client</Link></li>
          <li><Link href="/extra">Extra</Link></li>
          <li><Link href="/api/auth/signin">Sign In</Link></li>
          <li><Link href="/api/auth/signout">Sign Out</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar