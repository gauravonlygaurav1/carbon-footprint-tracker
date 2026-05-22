import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Lock, CheckCircle2Icon } from "lucide-react"
import type LoginData from "@/models/LoginData"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"
import bg_environment from "@/assets/bg_environment.jpg"
import { Alert, AlertTitle } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import useAuth from "@/Auth/store"
import OAuth2Button from "@/components/OAuth2Button"

function Login() {

  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const navigate = useNavigate();
  const login= useAuth((state) => state.login);

  const handleInputChange= (event: React.ChangeEvent<HTMLInputElement>) =>{

    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }

  const handleFormSubmit= async (event: React.FormEvent) => {
    event.preventDefault();

    //validations:
    if(data.email.trim() === ""){
      toast.error("Email is required!");
      return;
    } 
    if(data.password.trim() === ""){
      toast.error("Password is required!");
      return;
    }

    //server call for login
    // console.log(data);

    try{
      setLoading(true);
      // const userInfo = await loginUser(data);
      
      //login function: useAuth
      await login(data);

      toast.success("Login successful !!");
      // console.log(userInfo);
      navigate("/dashboard");
    }
    catch(error){
      console.log(error);
      toast.error("Login failed !!");
      setError(error);
    }
    finally{
      setLoading(false);
    }
  }
  
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
              : error?.message}</AlertTitle>
            </Alert>
          </div>)
          }
      {/* Card */}
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardContent className="p-6">

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-700">
              Welcome Back 🌿
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              Track your carbon footprint and make an impact
            </p>
          </div>


          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10"
                name="email"
                value={data.email}  
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                name="password"
                value={data.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Login Button */}
            <Button disabled={loading} className="cursor-pointer w-full bg-green-600 hover:bg-green-700">
              {loading ?( 
              <>
                <Spinner />
                Please wait...
                </>
             ):(
              "Login")}
              
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login */}
          <OAuth2Button/>

        </CardContent>
      </Card>
    </div>
  )
}

export default Login