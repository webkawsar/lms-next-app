"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  // const {data: session, status} = useSession();

  // console.log(status, 'status')

  // const session = await getServerSession(authOptions);

  // console.log(session, 'session')

  return (
    <div>
      <nav>
        <ul style={{ display: "flex", justifyContent: "space-evenly" }}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <br />
          <li>
            <Link href="/server">Server</Link>
          </li>
          <br />
          <li>
            <Link href="/client">Client</Link>
          </li>
          <br />

          <li>
            <Link href="/api/auth/signin">Sign In</Link>
          </li>
          <br />
          <li>
            <Link href="/login">Login</Link>
          </li>
          <br />
          <li>
            <button
              onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
            >
              Sign Out
            </button>
          </li>
          <br />
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
