import { useRef } from "react";
import Button from "../components/Button";
import Input from "../components/Inputbox";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const Usernameref=useRef<HTMLInputElement | null>(null);
    const passwordref=useRef<HTMLInputElement | null>(null);
    const navigate=useNavigate();
     async function signup(){
            const username=Usernameref.current?.value;
            const password=passwordref.current?.value;
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {username,password});
            navigate("/signin");
    }

    return (
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white rounded-xl  rounded-gray-200 min-w-48 p-8">
            <Input reference={Usernameref} placeholder="Username" />
            <Input reference={passwordref} placeholder="password" />
            <div className="flex justify-center pt-5 ">
            <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} loading={false} />
            </div>
            </div>
        </div>
    )
}