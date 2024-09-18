import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

function SignUp() {
  const [formData , setFormData] = useState({})
  const [error , setError] = useState(null)
  const [loading  , setLoading] = useState(false)
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setFormData({
      ...formData , 
      [e.target.id] : e.target.value
    })

  }
  const handleSubmit  = async (e)=>{
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/auth/signin" ,{
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData)
    } )
    const data = await res.json()
    if(data.success=== false){
      setError(data.message)
      setLoading(false)
      return
    }
    setLoading(false)
    setError(null)
    navigate("/")
    console.log(data)
  }
  return (
    <div className="p-3 mx-auto max-w-lg">
      <h1 className="text-3xl font-semibold text-center my-7 ">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
        <input
          placeholder="email"
          id="email"
          className="w-full focus:outline-none p-3 border rounded-lg"
          type="email"
          onChange={handleChange}
        />

        <input
          placeholder="password"
          id="password"
          className="w-full p-3 border rounded-lg"
          type="password"
          onChange={handleChange}
        />
        <p className=  "text-red-600  pl-2 text-sm">{error}</p>
        <button disabled={loading} className="bg-purple-800 uppercase p-3 hover:bg-purple-600 text-white rounded-lg disabled:bg-purple-400 ">
          {loading ?"Loading..." :"Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>create new account?</p>
        <Link className="text-purple-800 underline " to={"/sign-up"}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default SignUp;

