"use client"

import axios from "axios";
import { toast } from "react-toastify";





const Register = () => {

  const handleSubmit = async () => {
    try {

      const result = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_SERVER_URL}/api/auth/local/register`, {
        username: 'webkawsar123',
        email: 'web.kawsarahmed123@gmail.com',
        password: 'abc123',
      })
  
      console.log(result, 'result')

      // show success message
      toast.success("Registration successful!");

    } catch (error) {

      console.log(error?.response?.data?.error, 'error')

      // show error message
      toast.error(error?.response?.data?.error?.message ?? 'Something went wrong!');
    }
  }

  return (
    <div className="p-10">
      <p>Please register</p>
      <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Register</button>
    </div>
  )
}

export default Register