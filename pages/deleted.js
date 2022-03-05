import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import "@material-tailwind/react/tailwind.css";
import 'tailwindcss/tailwind.css';
import Head from "next/head"
import { signIn, signOut, useSession } from "next-auth/react";
import Content from "../components/Content";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { MdDelete } from "react-icons/md";
const Archived = () => {
    const { data: session, status } = useSession();

    const [snapshot] = useCollectionOnce(
        db.collection('deleteNotes')
            .doc(session?.user.email)
            .collection('delete')
            .orderBy('timestamp', 'desc')
    );
    const permanentDeleteNoteHandler = async (id) => {
        if (!session) {
            return;
        }
        await db.collection("deleteNotes").doc(session.user.email).collection("delete").doc(id).delete({
        })
    }
    return (
        <div>
            <Head>

                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
            </Head>

            <Header />
            <div className="flex flex-col md:flex-row mb-4">
                <Navbar />
                <div className='flex flex-wrap items-center ml-6 w-full'>
                    {snapshot?.docs.map((doc) => (
                        <div className="relative my-7 mx-2 cursor-pointer p-3 h-40 rounded-md content-shadow hover:content-hover-shadow transition duration-500 content-w content-bp-1:content-w-bp-1 content-bp-2:content-w-bp-2">
                            <h3 className="text-sm font-semibold">{doc.data().deleteHeading.slice(0, 25)}{doc.data().deleteHeading.length > 25 ? "..." : " "}</h3>
                            <p className="text-gray-700 text-lg mt-2">{doc.data().deleteDetail.slice(0, 40)}{doc.data().deleteDetail.length > 40 ? "..." : " "}</p>
                            <span className="absolute right-4 bottom-4 text-lg text-gray-700 content-shadow p-1 rounded-xl cursor-pointer" onClick={() => permanentDeleteNoteHandler(doc.id)}><MdDelete /></span>
                        </div>
                    ))}

                </div>
            </div>

        </div>
    )
}

export default Archived;