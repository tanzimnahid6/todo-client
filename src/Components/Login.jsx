import { useContext } from "react"
import { AuthContext } from "./AuthProvider"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from 'react-icons/fc';
const Login = () => {
  const { googleSignIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const login = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user
        console.log(user)
        navigate("/")
      })
      .catch((error) => {
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }
  return (
    <div className="text-center h-full">
      <div className="bg-slate-200 rounded-lg p-12 max-w-xl  mx-auto mt-36 ">
        <div onClick={login} className="btn btn-outline btn-primary m-8">
          Login With google <FcGoogle size={22}></FcGoogle>
        </div>
      </div>
    </div>
  )
}

export default Login
