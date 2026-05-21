import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Lock, CheckCircle2Icon } from "lucide-react"
import { toast } from "react-hot-toast"
import type RegisterData from "@/models/RegisterData"
import { registerUser } from "@/services/AuthService"
import { useNavigate } from "react-router"
import bg_environment from "@/assets/bg_environment.jpg"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import OAuth2Button from "@/components/OAuth2Button"


function Signup() {

  const [data, setData] = useState<RegisterData>({
      name: "",
      email: "",
      password: "", 
  })
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate= useNavigate();
  
  // handling form change
  const handleInputChange= (event: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target.name);
      // console.log(event.target.value);
    setData((value) => ({
      ...value,
      [event.target.name]: event.target.value
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent) =>{
    event.preventDefault();
    console.log(data);

    //validations
    if(data.name.trim() === ""){
      toast.error("Name is required!");
      return;
    }
    if(data.email.trim() === ""){
      toast.error("Email is required!");
      return;
    }
    if(data.password.trim() === ""){
      toast.error("Password is required!");
      return;
    }

    //form submit for registration
    try{
      setLoading(true);
      const result = await registerUser(data);
      console.log(result);
      toast.success("Registration successful !!");
      setData({
        name: "",
        email: "",
        password: "", 
      });
      //navigate to login page
      navigate("/login");
    }
    catch(error){
      console.log(error);
      toast.error("Registration failed !!");
      setError(error);
    }
    finally{
      setLoading(false);
    }
  };


  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">

    {/* Background Image */}
    <div className="absolute inset-0 -z-40">
      <img
      src={bg_environment}
      alt="environment background"
      className="w-full h-full object-cover opacity-15"
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 -z-10 bg-white/40"></div>
     {/* error section */}
          {error && ( <div className= "mt-2 mb-0.5 w-full max-w-md">
            <Alert variant= "destructive">
              <CheckCircle2Icon/>
              <AlertTitle>{
              error?.response
              ?error?.response?.data?.message
              : error?.message}
              </AlertTitle>
            </Alert>
          </div>)
          }
      {/* Card */}
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">
              Create Account 🌿
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Start tracking your carbon footprint today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4">

            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Full Name"
                className="pl-10"
                name= "name"
                value= {data.name}
                onChange= {handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                name= "email"
                value= {data.email}
                onChange= {handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                name= "password"
                value= {data.password}
                onChange= {handleInputChange}
              />
            </div>

            {/* Signup Button */}
            <Button disabled={loading} className="cursor-pointer w-full bg-green-600 hover:bg-green-700">
                {loading ?( 
              <>
                <Spinner />
                Please wait...
                </>
             ):(
              "Sign Up")}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Signup */}
          <OAuth2Button/>

        </CardContent>
      </Card>
    </div>
  )
}

export default Signup