import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Logo from "../images/Google-Keep.png";
function Login() {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen py-2'>
            <Image
                src={Logo}
                height="400"
                width="700"
                objectFit="contain"
            />
            <div className='px-4 py-2 bg-blue-600 mt-6 cursor-pointer text-white font-semibold rounded-md' onClick={signIn}>LOGIN</div>

        </div>
    )
}

export default Login
