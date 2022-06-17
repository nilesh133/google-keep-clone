// import { useSession, signOut } from "next-auth/react";
import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import logo from "../images/logo.jpg"
import { signIn, signOut, useSession } from "next-auth/react";
import Image from 'next/image'
import { BiSearch } from "react-icons/bi"
function Header() {
    const { data: session, status } = useSession();
    return (
        <div className="flex items-center justify-between py-2 px-5 bg-white shadow-sm font-arial">
            <div className="hidden sm:block md:block xl:block mr-4">
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="border-0"
                >
                    <Icon name="menu" size="2xl" />
                </Button>
            </div>

            <div className="w-9 h-12 relative">
                <Image
                    src={logo}
                    alt="logo"
                    layout="fill"
                />
                <div className="flex items-center p-2 outline-none border-none">
                    <h1 className="text-xl text-[#5F6368] tracking-normal ml-8 font-semibold">Keep</h1>
                </div>
            </div>


            <div className="hidden sm:flex flex-grow items-center bg-gray-100 text-gray-600 px-5 rounded-lg mx-5 focus-within:drop-shadow-md focus-within:bg-white p-2 md:mx-28 sm:mx-20">
                <BiSearch className="text-gray-600 text-lg" />
                <input type="text" placeholder="Search" className="flex-grow bg-transparent outline-none px-5 font-opensans font-semibold" />
            </div>

            <div className="flex flex-center items-center">
                <div>
                    <Button
                        color="red"
                        buttonType="outline"
                        rounded={true}
                        iconOnly={true}
                        ripple="dark"
                        className="mr-2 border-0"
                        onClick={signOut}
                    >
                        <Icon name="logout" size="2xl" />
                    </Button>
                </div>
                <img src={session?.user?.image}
                    className="h-8 w-8 cursor-pointer rounded-full"
                    alt="" />
            </div>
        </div>
    )
}

export default Header
