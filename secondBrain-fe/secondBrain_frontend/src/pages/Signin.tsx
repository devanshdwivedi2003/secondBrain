import { useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Inputbox";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

export default function Signin() {
    const Usernameref=useRef<HTMLInputElement | null>(null);
    const passwordref=useRef<HTMLInputElement | null>(null);
    const navigate=useNavigate();
    async function signin(){
                const username=Usernameref.current?.value;
                const password=passwordref.current?.value;
                const response=await axios.post(`${BACKEND_URL}/api/v1/signin`, {username,password});
                const jwt=response.data.jwt;
                localStorage.setItem("token",jwt);
                navigate("/dashboard");
        }
        

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl  rounded-gray-200 min-w-48 p-8">
            <Input reference={Usernameref} placeholder="Username" />
            <Input reference={passwordref} placeholder="password" />
            <div className="flex justify-center pt-5 ">
            <Button onClick={signin} variant="primary" text="Signin" fullWidth={true} loading={false} />
            </div>
            </div>
        </div>
    )
}