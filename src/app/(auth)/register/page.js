"use client"

import axios from "axios";

const strapi = process.env.NEXT_PUBLIC_STRAPI_SERVER_URL;


const Register = () => {

  const handleSubmit = async () => {
    
    const result = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/local/register`, {
      username: 'webkawsar',
      email: 'web.kawsarahmed@gmail.com',
      password: 'abc123',
    })

    console.log(result, 'result')
  }

  return (
    <div className="p-10">
      <p>Please register</p>
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Register</button>
    </div>
  )
}

export default Register