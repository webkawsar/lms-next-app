"use client"

import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const Login = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const result = await signIn('credentials', {
        redirect: false,
        identifier: 'web.kawsarahmed@gmail.com',
        password: 'abc123',
      });

      console.log(result, 'result');

      if(result.ok) {

        // show success message
        toast.success("Login success!");
      } else {

        // show error message
        toast.error("Invalid email or password!");
      }
      
    } catch (error) {
      
      // show error message
      toast.error(error?.response?.data?.error?.message ?? 'Something went wrong!');
    }
  }



  return (
    <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
  )
}

export default Login